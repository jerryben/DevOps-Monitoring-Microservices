package routes

import (
	"database"
	"models"
	"context"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func SetupRoutes(app *fiber.App) {
	app.Post("/logs", CreateLog)
	app.Get("/logs", GetLogs)
	app.Get("/logs/:id", GetLogByID)
}

// Create a log entry
func CreateLog(c *fiber.Ctx) error {
	logEntry := new(models.Log)
	if err := c.BodyParser(logEntry); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	logEntry.Timestamp = time.Now()

	_, err := database.LogCollection.InsertOne(context.Background(), logEntry)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert log"})
	}

	return c.JSON(logEntry)
}

// Get all logs
func GetLogs(c *fiber.Ctx) error {
	cursor, err := database.LogCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch logs"})
	}
	defer cursor.Close(context.Background())

	var logs []models.Log
	if err := cursor.All(context.Background(), &logs); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to parse logs"})
	}

	return c.JSON(logs)
}

// Get log by ID
func GetLogByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var log models.Log

	err := database.LogCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&log)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Log not found"})
	}

	return c.JSON(log)
}
