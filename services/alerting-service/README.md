## Alerting Service

The **Alerting Service** is a microservice responsible for detecting anomalies in metrics and logs, triggering alerts, and notifying users. It integrates with **RabbitMQ**, **Redis**, and **MongoDB** for data processing and storage, and supports notifications via **Email** and **Slack**.

---

## **File Structure**

```
/alerting-service
├── app/
│   ├── routes/
│   │   ├── alerts.js          # API routes for managing alerts
│   ├── services/
│   │   ├── alertService.js    # Logic for processing alerts
│   │   ├── notificationService.js # Logic for sending notifications
│   │   ├── rabbitmqService.js # RabbitMQ integration for consuming messages
│   ├── database.js            # MongoDB and Redis connection management
│   ├── app.js                 # Express application setup
├── package.json               # Node.js dependencies
├── Dockerfile                 # Dockerfile for containerizing the service
├── .env                       # Environment variables (RabbitMQ, Redis, MongoDB URLs, SMTP, Slack)
```

---

## **How to Configure Notifications**

### **Email Notifications**

1. Set the following environment variables in the `.env` file:

   ```plaintext
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=alerts@example.com
   SMTP_PASS=yourpassword
   ```

2. The service will send email notifications to the configured recipient when a critical alert is triggered.

### **Slack Notifications**

1. Set the following environment variable in the `.env` file:

   ```plaintext
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook
   ```

2. The service will send Slack notifications to the configured channel when a critical alert is triggered.

---

## **How to Run the Service**

### **Using Docker**

1. Build the Docker image:

   ```bash
   docker build -t alerting-service .
   ```

2. Run the Docker container:
   ```bash
   docker run -d -p 5000:5000 --env-file .env alerting-service
   ```

### **Using Node.js**

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the service:
   ```bash
   npm start
   ```

---

## **Endpoints**

1. **Retrieve Active Alerts**:

   - **GET /alerts**
   - Response: List of active alerts from Redis.

2. **Retrieve Historical Alerts**:
   - **GET /alerts/history**
   - Response: List of historical alerts from MongoDB.

```

---

### **Step 4: Configuring Alerts via UI**

#### **Option 1: Configure in Alerting Service**
- Add an API endpoint in the Alerting Service to allow users to configure email/Slack settings and alert conditions.
- Store these configurations in MongoDB or Redis.

#### **Option 2: Configure in Visualization UI**
- Add a UI in the Visualization Service to allow users to configure email/Slack settings and alert conditions.
- Push these configurations to the Alerting Service via an API.

**Recommendation**:
- Use **Option 2** (Visualization UI) for better user experience. The Visualization UI already serves as the dashboard for managing alerts, so it makes sense to centralize configuration there.

---
```
