# Logs Service

The **Logs Service** is a microservice responsible for collecting, processing, and storing logs from various sources. It integrates with **Loki** for log storage, **Redis** for caching critical logs, and **RabbitMQ** for publishing critical logs for alerting.

---

## **File Structure**

```
/logs-service
├── main.go                # Entry point for the service
├── go.mod                 # Go module dependencies
├── Dockerfile             # Dockerfile for containerizing the service
├── .env                   # Environment variables (Loki, Redis, RabbitMQ URLs)
```

---

## **What the Service Does**

1. **Log Collection**:

   - Accepts logs via REST API (`POST /logs`).

2. **Log Storage**:

   - Sends logs to **Loki** for indexing and querying.

3. **Log Caching**:

   - Caches critical logs in **Redis** for quick access.

4. **Critical Log Publishing**:

   - Publishes critical logs (e.g., `ERROR` or `WARN`) to **RabbitMQ** for alerting.

5. **API Endpoints**:
   - `GET /health`: Health check endpoint.
   - `POST /logs`: Accepts new logs.
   - `GET /logs`: Retrieves cached logs from Redis.

---

## **Integrations**

1. **Loki**:

   - Stores logs for indexing and querying.
   - Connection URL is configured via the `LOKI_URL` environment variable.

2. **Redis**:

   - Caches critical logs for quick retrieval.
   - Connection URL is configured via the `REDIS_ADDR` environment variable.

3. **RabbitMQ**:
   - Publishes critical logs for alerting.
   - Connection URL is configured via the `RABBITMQ_URL` environment variable.

---

## **How It Functions**

1. **Startup**:

   - Initializes connections to Redis and RabbitMQ.
   - Reads the Loki URL from the environment variables.

2. **Log Processing**:

   - Accepts logs via the `POST /logs` endpoint.
   - Sends logs to Loki for storage.
   - Caches logs in Redis for quick access.
   - Publishes critical logs to RabbitMQ for alerting.

3. **API Endpoints**:

   - Exposes REST API endpoints for health checks, log creation, and log retrieval.

4. **Shutdown**:
   - Closes connections to Redis and RabbitMQ.

---

## **How to Run the Service**

### **Using Go Locally**

1. Install dependencies:

   ```bash
   go mod tidy
   ```

2. Run the service:
   ```bash
   go run main.go
   ```

### **Using Docker**

1. Build the Docker image:

   ```bash
   docker build -t logs-service .
   ```

2. Run the Docker container:
   ```bash
   docker run -d -p 9000:9000 --env-file .env logs-service
   ```

---

## **Environment Variables**

The following environment variables must be set:

1. **Redis**:

   - `REDIS_ADDR`: Redis connection URL (e.g., `localhost:6379`).

2. **Loki**:

   - `LOKI_URL`: Loki connection URL (e.g., `http://localhost:3100/loki/api/v1/push`).

3. **RabbitMQ**:

   - `RABBITMQ_URL`: RabbitMQ connection URL (e.g., `amqp://guest:guest@localhost:5672/`).

4. **Port**:
   - `PORT`: Port for the service to run on (default: `9000`).

---

## **Endpoints**

1. **Health Check**:

   - **GET /health**
   - Response: `{"status": "UP"}`

2. **Create Log**:

   - **POST /logs**
   - Request Body:
     ```json
     {
       "level": "ERROR",
       "message": "An error occurred"
     }
     ```
   - Response: The created log.

3. **Retrieve Logs**:
   - **GET /logs**
   - Response: List of logs cached in Redis.

---

## **Dependencies**

The service uses the following Go libraries:

- `github.com/gofiber/fiber/v2`: Web framework for building APIs.
- `github.com/joho/godotenv`: For loading environment variables from .env.
- `github.com/redis/go-redis/v9`: Redis client for caching logs.
- `github.com/streadway/amqp`: RabbitMQ client for publishing critical logs.

---
