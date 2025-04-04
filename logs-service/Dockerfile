# Build stage
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -v -o bin/logs-service ./main.go

# Runtime stage
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
COPY .env .  # If you need environment variables
EXPOSE 5001
CMD ["./logs-service"]