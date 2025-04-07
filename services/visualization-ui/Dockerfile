# Build React frontend
FROM node:16 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build Java backend
FROM openjdk:17-jdk-slim AS backend-build
WORKDIR /app
COPY backend/pom.xml ./
COPY backend/src ./src
RUN ./mvnw package -DskipTests

# Combine frontend and backend
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
COPY --from=frontend-build /app/build ./static
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
