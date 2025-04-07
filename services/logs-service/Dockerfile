# Use the official Go image for building the application
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the application source code
COPY . .

# Build the application
RUN go build -o logs-service main.go

# Use a minimal image for running the application
FROM alpine:3.18

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/logs-service .

# Expose the application port
EXPOSE 9000

# Run the application
CMD ["./logs-service"]