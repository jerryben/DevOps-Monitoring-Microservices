package main

import (
    "fmt"
    "github.com/jerryben/DevOps-Monitoring-Microservice/logs-service/app/database"
)

func main() {
    fmt.Println("Testing")
    database.ConnectDB()
}
