package models

import "time"

// Log represents a log entry stored in MongoDB
type Log struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Service   string    `json:"service" bson:"service"`
	Level     string    `json:"level" bson:"level"`     // e.g. info, warning, error
	Message   string    `json:"message" bson:"message"` // actual log message
	Timestamp time.Time `json:"timestamp" bson:"timestamp"`
}
