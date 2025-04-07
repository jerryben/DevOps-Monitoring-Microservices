#!/bin/bash

# Build React frontend
echo "Building React frontend..."
cd ./visualization-ui/frontend || exit
npm install
npm run build

# Copy React build files to Spring Boot backend
echo "Copying React build files to Spring Boot backend..."
cp -r build/* ../backend/src/main/resources/static/

# Build all services
echo "Building Docker images for all services..."
cd ../../../ || exit
docker build -t metrics-service ./metrics-service
docker build -t logs-service ./logs-service
docker build -t alerting-service ./alerting-service
docker build -t visualization-ui ./visualization-ui/backend
