package main

import (
    "fmt"
    "github.com/jerryben/DevOps-Monitoring-Microservices/services/logs-service/app/database"
)

func main() {
    fmt.Println("Testing")
    database.ConnectDB()
}
