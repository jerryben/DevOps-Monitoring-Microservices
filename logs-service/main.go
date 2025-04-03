package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"DevOps-Monitoring-Microservices/logs-service/app/database"
    "DevOps-Monitoring-Microservices/logs-service/app/routes"

)

func main() {
	// Load environment variables
	godotenv.Load()

	// Initialize database
	database.ConnectDB()

	// Create Fiber instance
	app := fiber.New()

	// Setup routes
	routes.SetupRoutes(app)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "5001"
	}

	log.Fatal(app.Listen(":" + port))
}
