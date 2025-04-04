# Use the official Golang image as a build environment
FROM golang:1.22 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -v -o bin/logs-service main.go

# Start a new stage from scratch
FROM alpine:3.19

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/bin/logs-service /usr/local/bin/logs-service

# Command to run the executable
CMD ["logs-service"]