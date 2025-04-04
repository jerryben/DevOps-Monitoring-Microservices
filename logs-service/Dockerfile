FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Extended debug
RUN ls -la . && ls -la app/ && go env GOMOD GOPATH GOROOT && go list -m -f '{{.Path}} {{.Dir}}' all
# Build with module path
RUN go build -v -o bin/logs-service logs-service/main

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/bin/logs-service .
EXPOSE 5001
CMD ["./logs-service"]