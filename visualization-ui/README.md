DevOps-Monitoring-Microservices/
│── visualization-ui/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── main/java/com/example/visualization/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── VisualizationController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── VisualizationService.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── Metric.java
│   │   │   │   │   ├── LogEntry.java
│   │   │   │   ├── VisualizationApplication.java
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   ├── .dockerignore
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── MetricsChart.js
│   │   │   │   ├── LogsTable.js
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.js
│   │   │   ├── App.js
│   │   │   ├── index.js
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   ├── Jenkinsfile
│   │   ├── .dockerignore
