package routes

import (
    "context"
    "log"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/jerryben/DevOps-Monitoring-Microservices/services/logs-service/app/database"
    "github.com/jerryben/DevOps-Monitoring-Microservices/services/logs-service/app/models"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

// SetupRoutes registers all routes
func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")
    api.Post("/logs", CreateLog)
    api.Get("/logs", GetLogs)
    api.Get("/logs/:id", GetLogByID)

    // Optional: /healthz endpoint for Kubernetes liveness probe
    app.Get("/healthz", func(c *fiber.Ctx) error {
        return c.SendStatus(fiber.StatusOK)
    })
}

// CreateLog handles POST /api/logs
func CreateLog(c *fiber.Ctx) error {
    logEntry := new(models.Log)

    if err := c.BodyParser(logEntry); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request payload"})
    }

    logEntry.Timestamp = time.Now()

    result, err := database.LogCollection.InsertOne(context.Background(), logEntry)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to insert log"})
    }

    return c.Status(201).JSON(result)
}

// GetLogs handles GET /api/logs
func GetLogs(c *fiber.Ctx) error {
    cursor, err := database.LogCollection.Find(context.Background(), bson.M{})
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch logs"})
    }
    defer cursor.Close(context.Background())

    var logs []models.Log
    for cursor.Next(context.Background()) {
        var logEntry models.Log
        if err := cursor.Decode(&logEntry); err != nil {
            log.Println("Error decoding log:", err)
            continue
        }
        logs = append(logs, logEntry)
    }

    return c.JSON(logs)
}

// GetLogByID handles GET /api/logs/:id
func GetLogByID(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
    }

    var log models.Log
    err = database.LogCollection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&log)
    if err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Log not found"})
    }

    return c.JSON(log)
}
