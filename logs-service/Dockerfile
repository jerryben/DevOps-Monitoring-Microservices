FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Debug: Verify environment and files
RUN ls -la && go env GO111MODULE GOMOD && go list -m
RUN GO111MODULE=on go build -v -o bin/logs-service logs-service

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]