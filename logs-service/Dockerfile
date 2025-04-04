FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Copy entire project
COPY . .

# Build from the root of the module
RUN go build -v -o bin/logs-service ./app/main.go

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]