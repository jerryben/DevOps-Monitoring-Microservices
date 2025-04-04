FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Debug step (optional, remove if you’re confident)
RUN ls -la . && ls -la app/ && go env GOMOD && go list -m all
RUN go build -v -o bin/logs-service ./main.go

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]