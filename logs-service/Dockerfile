FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN ls -la . && ls -la app/ && go env GOMOD GOPATH GOROOT && go list -m -f '{{.Path}} {{.Dir}}' all
RUN go build -v -o bin/logs-service logs-service

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]