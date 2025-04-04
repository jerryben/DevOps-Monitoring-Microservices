# Build stage
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Debug: Verify files and module
RUN ls -la && ls -la app/ && cat go.mod && go version && go env GOMOD && go list -m
RUN go build -v -o bin/logs-service .

# Runtime stage
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]