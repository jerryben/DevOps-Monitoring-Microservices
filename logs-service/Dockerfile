FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY app ./app
WORKDIR /app/app
RUN go build -o ../bin/logs-service .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/bin/logs-service .  # ← Updated path
EXPOSE 9000
CMD ["./logs-service"]