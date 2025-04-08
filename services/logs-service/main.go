package main

import (
    "bytes"
    "context" // Import the context package
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "github.com/gofiber/fiber/v2/middleware/recover"
    "github.com/joho/godotenv"
    "github.com/redis/go-redis/v9"
    "github.com/streadway/amqp"
)

var (
    redisClient  *redis.Client
    rabbitMQConn *amqp.Connection
    rabbitMQChan *amqp.Channel
    lokiURL      string
    ctx          = context.Background() // Create a global context
)

// LogEntry represents a log entry
type LogEntry struct {
    Timestamp time.Time `json:"timestamp"`
    Level     string    `json:"level"`
    Message   string    `json:"message"`
}

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found, using environment variables")
    }

    // Initialize Redis
    initRedis()

    // Initialize RabbitMQ
    initRabbitMQ()

    // Get Loki URL from environment variables
    lokiURL = os.Getenv("LOKI_URL")
    if lokiURL == "" {
        log.Fatal("LOKI_URL is not set")
    }

    // Create Fiber app
    app := fiber.New()

    // Middleware
    app.Use(logger.New())   // Log requests
    app.Use(recover.New())  // Recover from panics

    // Routes
    app.Get("/health", healthCheck)
    app.Post("/logs", createLog)
    app.Get("/logs", getLogs)

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "9000"
    }
    log.Fatal(app.Listen(":" + port))
}

// Initialize Redis function
func initRedis() {
    redisAddr := os.Getenv("REDIS_ADDR")
    if redisAddr == "" {
        redisAddr = "localhost:6379"
    }

    redisClient = redis.NewClient(&redis.Options{
        Addr: redisAddr,
    })
    if _, err := redisClient.Ping(ctx).Result(); err != nil { // Use the global context
        log.Fatalf("Failed to connect to Redis: %v", err)
    }

    log.Println("Connected to Redis")
}

// RabitMQ function
func initRabbitMQ() {
    rabbitMQURL := os.Getenv("RABBITMQ_URL")
    if rabbitMQURL == "" {
        log.Fatal("RABBITMQ_URL is not set")
    }

    conn, err := amqp.Dial(rabbitMQURL)
    if err != nil {
        log.Fatalf("Failed to connect to RabbitMQ: %v", err)
    }
    rabbitMQConn = conn

    ch, err := conn.Channel()
    if err != nil {
        log.Fatalf("Failed to create RabbitMQ channel: %v", err)
    }
    rabbitMQChan = ch

    log.Println("Connected to RabbitMQ")
}

// Health Check function
func healthCheck(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{"status": "UP"})
}

// create Log
func createLog(c *fiber.Ctx) error {
    var logEntry LogEntry
    if err := c.BodyParser(&logEntry); err != nil {
        return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
    }

    logEntry.Timestamp = time.Now()

    // Send log to Loki
    if err := sendToLoki(logEntry); err != nil {
        log.Printf("Failed to send log to Loki: %v", err)
    }

    // Cache log in Redis
    if err := cacheLogInRedis(logEntry); err != nil {
        log.Printf("Failed to cache log in Redis: %v", err)
    }

    // Publish critical logs to RabbitMQ
    if logEntry.Level == "ERROR" || logEntry.Level == "WARN" {
        if err := publishToRabbitMQ(logEntry); err != nil {
            log.Printf("Failed to publish log to RabbitMQ: %v", err)
        }
    }

    return c.Status(http.StatusCreated).JSON(logEntry)
}

// Get Logs
func getLogs(c *fiber.Ctx) error {
    // Retrieve logs from Redis
    logs, err := redisClient.LRange(ctx, "logs", 0, -1).Result() // Use the global context
    if err != nil {
        return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch logs from Redis"})
    }

    var logEntries []LogEntry
    for _, logStr := range logs {
        var logEntry LogEntry
        if err := json.Unmarshal([]byte(logStr), &logEntry); err != nil {
            log.Printf("Failed to parse log from Redis: %v", err)
            continue
        }
        logEntries = append(logEntries, logEntry)
    }

    return c.JSON(logEntries)
}

func sendToLoki(logEntry LogEntry) error {
    // Prepare Loki payload
    payload := map[string]interface{}{
        "streams": []map[string]interface{}{
            {
                "stream": map[string]string{
                    "level": logEntry.Level,
                },
                "values": [][]string{
                    {
                        fmt.Sprintf("%d", time.Now().UnixNano()),
                        logEntry.Message,
                    },
                },
            },
        },
    }

    payloadBytes, err := json.Marshal(payload)
    if err != nil {
        return fmt.Errorf("failed to marshal Loki payload: %w", err)
    }

    // Send to Loki
    resp, err := http.Post(lokiURL+"/loki/api/v1/push", "application/json", bytes.NewBuffer(payloadBytes))
    if err != nil {
        return fmt.Errorf("failed to send log to Loki: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusNoContent {
        return fmt.Errorf("unexpected response from Loki: %s", resp.Status)
    }

    return nil
}

func cacheLogInRedis(logEntry LogEntry) error {
    logBytes, err := json.Marshal(logEntry)
    if err != nil {
        return fmt.Errorf("failed to marshal log entry: %w", err)
    }

    // Push log to Redis list
    if err := redisClient.LPush(ctx, "logs", logBytes).Err(); err != nil { // Use the global context
        return fmt.Errorf("failed to push log to Redis: %w", err)
    }

    // Trim Redis list to keep only the last 100 logs
    if err := redisClient.LTrim(ctx, "logs", 0, 99).Err(); err != nil { // Use the global context
        return fmt.Errorf("failed to trim Redis logs list: %w", err)
    }

    return nil
}

func publishToRabbitMQ(logEntry LogEntry) error {
    body, err := json.Marshal(logEntry)
    if err != nil {
        return fmt.Errorf("failed to marshal log entry: %w", err)
    }

    return rabbitMQChan.Publish(
        "logs-exchange",
        "logs-routing-key",
        false,
        false,
        amqp.Publishing{
            ContentType: "application/json",
            Body:        body,
        },
    )
}