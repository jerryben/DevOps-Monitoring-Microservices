# Build stage
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Debug: List files and Go environment
RUN ls -la && ls -la app/ && go env
RUN go build -v -mod=mod -o bin/logs-service .

# Runtime stage
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
COPY .env .  # Remove if not needed
EXPOSE 5001
CMD ["./logs-service"]