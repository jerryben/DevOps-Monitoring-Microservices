```markdown
# Logs Service

The **Logs Service** is a microservice responsible for collecting, processing, and storing logs from various sources. It integrates with **Loki** for log storage, **Redis** for caching frequently accessed logs, and **RabbitMQ** for publishing critical logs.

---

## **File Structure**
```

/logs-service
├── app/
│ ├── **init**.py
│ ├── main.py # Entry point for the FastAPI application
│ ├── models.py # SQLAlchemy models for the database
│ ├── schemas.py # Pydantic schemas for request/response validation
│ ├── crud.py # CRUD operations for the database
│ ├── routes.py # API routes for the service
│ ├── database.py # Database connection and session management
├── requirements.txt # Python dependencies
├── Dockerfile # Dockerfile for containerizing the service
├── .env # Environment variables (Loki, Redis, RabbitMQ URLs)

````

---

## **What the Service Does**

1. **Log Collection**:
   - Accepts logs via REST API.

2. **Log Storage**:
   - Stores logs in **Loki** for indexing and querying.

3. **Log Caching**:
   - Caches frequently accessed logs in **Redis**.

4. **Critical Log Publishing**:
   - Publishes critical logs (e.g., errors or warnings) to **RabbitMQ** for alerting.

5. **API Endpoints**:
   - `GET /logs`: Retrieves logs from Redis.
   - `POST /logs`: Accepts new logs.

---

## **Integrations**

1. **Loki**:
   - Stores logs for indexing and querying.

2. **Redis**:
   - Caches frequently accessed logs for quick retrieval.

3. **RabbitMQ**:
   - Publishes critical logs for alerting.

---

## **How to Run the Service**

### **Using Docker**
1. Build the Docker image:
   ```bash
   docker build -t logs-service .
````

2. Run the Docker container:
   ```bash
   docker run -d -p 9000:9000 --env-file .env logs-service
   ```

### **Using Python**

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the service:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 9000
   ```

---

## **Environment Variables**

- `LOKI_URL`: Loki connection URL.
- `REDIS_URL`: Redis connection URL.
- `RABBITMQ_URL`: RabbitMQ connection URL.

---

## **Endpoints**

1. **Retrieve Logs**:

   - **GET /logs**
   - Response: List of logs from Redis.

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

```

```
