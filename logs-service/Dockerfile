# Use a minimal Go image
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY . .

# Download dependencies
RUN go mod tidy && go mod download

# Build the Go binary
RUN go build -o logs-service ./cmd

# Use a smaller final image
FROM alpine:latest
WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/logs-service .

# Expose the port and run the app
EXPOSE 9000
CMD ["./logs-service"]


