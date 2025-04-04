package main

import (
    "fmt"
    "logs-service/app/database"
)

func main() {
    fmt.Println("Testing")
    database.ConnectDB()
}
