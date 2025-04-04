# syntax=docker/dockerfile:1

# Use the Go image for building the application
FROM golang:1.22 as builder

WORKDIR /app

# Copy go.mod and go.sum files if they exist
COPY * ./

# Download dependencies (this will also create go.sum if it does not exist)
RUN go mod tidy

# Copy the remaining source code
COPY . .

# Build the application
RUN go build -o logs-service main.go

# Use a minimal image for running the application
FROM alpine:3.19
COPY --from=builder /app/logs-service /app/logs-service
CMD ["/app/logs-service"]