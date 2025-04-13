# Build React frontend
FROM node:16 AS build

WORKDIR /app

COPY frontend/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm audit fix --force

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Use a lightweight Nginx image for serving the built app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the frontend port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

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
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
