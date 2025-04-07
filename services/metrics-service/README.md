```markdown
# Metrics Service

The **Metrics Service** is a microservice responsible for collecting, storing, and publishing system metrics such as CPU usage, memory usage, disk usage, and network activity. It integrates with **PostgreSQL** for historical storage and **RabbitMQ** for real-time updates.

---

## **File Structure**
```

/metrics-service
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
├── .env # Environment variables (PostgreSQL and RabbitMQ URLs)

````

---

## **What the Service Does**

1. **Metrics Collection**:
   - Periodically collects system metrics (CPU, memory, disk, and network usage) using the `psutil` library.

2. **Metrics Storage**:
   - Stores collected metrics in a **PostgreSQL** database for historical tracking and querying.

3. **Real-Time Metrics Publishing**:
   - Publishes metrics to **RabbitMQ** using the `metrics-exchange` for real-time updates.

4. **API Endpoints**:
   - `GET /health`: Health check endpoint to verify the service is running.
   - `GET /metrics`: Retrieves the last 100 metrics from PostgreSQL.
   - `POST /metrics`: Allows manual creation of metrics (for testing purposes).

---

## **Integrations**

1. **PostgreSQL**:
   - Stores metrics in a table named `metrics`.
   - Connection URL is configured via the `POSTGRES_URL` environment variable.

2. **RabbitMQ**:
   - Publishes metrics to the `metrics-exchange` for other services to consume.
   - Connection URL is configured via the `RABBITMQ_URL` environment variable.

---

## **Connected Database and Cache**

1. **Database**:
   - **PostgreSQL** is used for storing historical metrics.
   - Metrics are stored in the following schema:
     ```sql
     CREATE TABLE metrics (
         id SERIAL PRIMARY KEY,
         timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         cpu_usage FLOAT,
         memory_usage FLOAT,
         disk_usage FLOAT,
         network_sent FLOAT,
         network_received FLOAT
     );
     ```

2. **Cache**:
   - No caching is implemented in this service (caching is handled by other services like Logs Service).

---

## **How It Functions**

1. **Startup**:
   - Initializes connections to PostgreSQL and RabbitMQ.
   - Creates the `metrics` table in PostgreSQL if it does not exist.

2. **Periodic Metrics Collection**:
   - Collects system metrics every 10 seconds using `psutil`.
   - Stores the metrics in PostgreSQL.
   - Publishes the metrics to RabbitMQ.

3. **API Endpoints**:
   - Exposes REST API endpoints for retrieving and creating metrics.

4. **Shutdown**:
   - Closes connections to PostgreSQL and RabbitMQ.

---

## **How to Run the Service**

### **Using Docker**
1. Build the Docker image:
   ```bash
   docker build -t metrics-service .
````

2. Run the Docker container:
   ```bash
   docker run -d -p 8000:8000 --env-file .env metrics-service
   ```

### **Using Python**

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the service:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

---

## **Environment Variables**

The following environment variables must be set:

1. **PostgreSQL**:

   - `POSTGRES_URL`: Connection URL for PostgreSQL (e.g., `postgresql://user:password@localhost:5432/metricsdb`).

2. **RabbitMQ**:
   - `RABBITMQ_URL`: Connection URL for RabbitMQ (e.g., `amqp://guest:guest@localhost:5672/`).

---

## **Endpoints**

1. **Health Check**:

   - **GET /health**
   - Response: `{"status": "UP"}`

2. **Retrieve Metrics**:

   - **GET /metrics**
   - Response: List of the last 100 metrics.

3. **Create Metric**:
   - **POST /metrics**
   - Request Body:
     ```json
     {
       "cpu_usage": 45.5,
       "memory_usage": 70.2,
       "disk_usage": 80.1,
       "network_sent": 10.5,
       "network_received": 15.3
     }
     ```
   - Response: The created metric.

---

## **Dependencies**

The service uses the following Python libraries (defined in `requirements.txt`):

- `fastapi`: Web framework for building APIs.
- `uvicorn`: ASGI server for running the FastAPI app.
- `psutil`: Library for collecting system metrics.
- `asyncpg`: PostgreSQL driver for asynchronous operations.
- `pika`: RabbitMQ client library.
- `sqlalchemy`: ORM for database interactions.
- `pydantic`: Data validation and settings management.
- `fastapi-utils`: Utility functions for FastAPI.

---

## **Next Steps**

- Test the service by running it locally or in Docker.
- Verify integrations with PostgreSQL and RabbitMQ.
- Use the `GET /metrics` endpoint to retrieve metrics and ensure they are being stored and published correctly.

```


```
