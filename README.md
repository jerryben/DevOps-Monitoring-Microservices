# DevOps Monitoring Microservices with CI/CD

## **Project Overview**

This project is a **multi-language microservices system** designed to showcase expertise in **cloud-native development, CI/CD automation, and DevOps best practices**. It integrates different programming languages, databases, and caching mechanisms to simulate real-world DevOps monitoring applications.

The project follows a **monorepo** structure with **GitHub as the main repository**, utilizing **GitHub Actions, GitLab CI/CD, and Jenkins** to demonstrate **multi-repository orchestration and deployment**.

---

## **Project Objectives**

- Develop a **monorepo-based microservices system** with multiple languages.
- Implement **CI/CD pipelines** tailored for each microservice.
- Showcase real-world **monitoring, logging, and alerting mechanisms**.
- Deploy services using **Docker** and orchestrate them efficiently.
- Ensure **scalability, security, and reliability** across all services.

---

## **Architecture Overview**

The system consists of the following microservices:

| **Service**          | **Language**   | **Framework** | **Database** |
| -------------------- | -------------- | ------------- | ------------ |
| **Metrics Service**  | Python         | FastAPI       | PostgreSQL   |
| **Logs Service**     | Golang         | Fiber         | MongoDB      |
| **Alerting Service** | Node.js        | Express.js    | Redis        |
| **Visualization UI** | Java           | Spring Boot   | -            |
| **API Gateway**      | Nginx          | -             | -            |
| **Message Broker**   | RabbitMQ/Kafka | -             | -            |

Each microservice is **independent** but communicates with others via **REST APIs, WebSockets, and Message Queues**.

---

## **Tech Stack**

- **Programming Languages**: Python, Java, Node.js, Golang
- **Frameworks**: FastAPI, Spring Boot, Express.js, Fiber
- **Databases**: PostgreSQL, MongoDB, Redis
- **API Gateway**: Nginx
- **Messaging**: RabbitMQ/Kafka
- **CI/CD Tools**: GitHub Actions, GitLab CI/CD, Jenkins
- **Containerization**: Docker
- **Orchestration**: Kubernetes with ArgoCD

---

## **Monorepo Structure**

```
devops-monitoring/
├── services/
│   ├── metrics-service/ (FastAPI)
│   ├── logs-service/ (Fiber)
│   ├── alerting-service/ (Express.js)
│   ├── visualization-ui/ (Spring Boot)
│
├── api-gateway/
│   ├── nginx/
│
├── message-broker/
│   ├── rabbitmq/
│   ├── kafka/
│
├── .github/workflows/ 
│    ├── main.yml (Main pipeline for monorepo)
│
├── .gitlab-ci.yml (Used only for alerting-service)
├── jenkins/
├── docker-compose.yml
└── README.md
```

Each microservice contains its own **Dockerfile** and individual pipeline script, allowing **independent CI/CD execution**.

---

## **Service Overview**

| **Service**          | **Language**   | **CI Platform**   |
|----------------------|---------------|------------------|
| Metrics Service      | Python        | GitHub Actions  |
| Logs Service        | Golang        | GitHub Actions  |
| Alerting Service    | Node.js       | GitLab CI/CD    |
| Visualization UI    | Java          | Jenkins         |

---

## **CI/CD Strategy**

This project uses **GitHub as the main repository**, with **GitHub Actions, GitLab CI/CD, and Jenkins** for automated deployment:

- **GitHub Actions** → Primary CI/CD platform handling **metrics-service, logs-service, and Kubernetes manifests**.
- **GitLab CI/CD** → Only used for **alerting-service** (Node.js).
- **Jenkins** → Used for **visualization-ui** (Spring Boot).
- **ArgoCD** → Deploys updated Kubernetes manifests from **GitHub**.

Example `.gitlab-ci.yml` for **alerting-service**:

```yaml
workflow:
  rules:
    - changes:
        - services/alerting-service/**
      when: always
```

This ensures that only **modified services** trigger their respective CI/CD pipelines.

---

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone <repository-url>
cd devops-monitoring
```

### **2. Set Up Environment Variables**

```sh
cp .env.example .env
# Modify environment variables accordingly
```

### **3. Build & Start Services**

Using **Docker Compose**:

```sh
docker-compose up --build
```

Using **manual Docker commands**:

```sh
docker build -t metrics-service ./services/metrics-service
...
docker run -p 8000:8000 metrics-service
```

---

## **Contributions & Roadmap**

- ✅ **Phase 1**: Core microservices implementation (Metrics, Logs, Alerting, Visualization UI)
- ✅ **Phase 2**: CI/CD pipeline integration with GitHub, GitLab, and Jenkins
- 🔄 **Phase 3**: Implement Kubernetes-based deployment with ArgoCD
- 🚀 **Phase 4**: Improve monitoring & logging (Prometheus + ELK Stack)

Contributions are welcome! Please open a **pull request** or create an **issue** for discussions.

---

## **License**

This project is **open-source** under the MIT License. Feel free to fork, modify, and use it as needed.

---

## **Contact & Portfolio**

This project is maintained by **JerryBen**. Connect with me:

- **LinkedIn**: [linkedin.com/in/jerrybenoc](https://linkedin.com/in/jerrybenoc)
- **GitHub**: [github.com/jerrybenoc](https://github.com/jerrybenoc)

🚀 **Let's build something great together!**

