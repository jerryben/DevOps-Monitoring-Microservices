```markdown
# Visualization UI

The **Visualization UI** is a microservice that provides a dashboard for visualizing metrics, logs, and alerts. It integrates with **RabbitMQ** for real-time updates, **PostgreSQL** for historical metrics, **Loki** for logs, and **MongoDB** for alerts.

---

## **File Structure**
```

/visualization-ui
├── backend/
│ ├── src/
│ │ ├── main/java/com/example/visualization/
│ │ │ ├── controller/
│ │ │ │ ├── VisualizationController.java
│ │ │ ├── service/
│ │ │ │ ├── VisualizationService.java
│ │ │ ├── model/
│ │ │ │ ├── Metric.java
│ │ │ │ ├── LogEntry.java
│ │ │ ├── VisualizationApplication.java
│ ├── resources/
│ │ ├── application.properties
│ ├── Dockerfile
│ ├── pom.xml
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── MetricsChart.js
│ │ │ ├── LogsTable.js
│ │ ├── pages/
│ │ │ ├── Dashboard.js
│ │ ├── App.js
│ │ ├── index.js
│ ├── package.json
│ ├── Dockerfile

````

---

## **What the Service Does**

1. **Dashboard**:
   - Displays metrics, logs, and alerts in real-time.

2. **Historical Data**:
   - Queries PostgreSQL for historical metrics.
   - Queries Loki for logs.
   - Queries MongoDB for historical alerts.

3. **Real-Time Updates**:
   - Subscribes to RabbitMQ for live metrics and alerts.

---

## **How to Run the Service**
For the frontend
- npm install
For the backend
- mvn -N io.takari:maven:wrapper
- chmod +x ./mvnw

---

## **How to Run the Service**

### **Using Docker**
1. Build the Docker image:
   ```bash
   docker build -t visualization-ui .
````

2. Run the Docker container:
   ```bash
   docker run -d -p 8080:8080 --env-file .env visualization-ui
   ```

---

## **Environment Variables**

- `POSTGRES_URL`: PostgreSQL connection URL.
- `LOKI_URL`: Loki connection URL.
- `MONGODB_URL`: MongoDB connection URL.
- `RABBITMQ_URL`: RabbitMQ connection URL.
