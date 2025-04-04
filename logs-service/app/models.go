package models

import "time"

// Log structure
type Log struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Service   string    `json:"service" bson:"service"`
	Level     string    `json:"level" bson:"level"`
	Message   string    `json:"message" bson:"message"`
	Timestamp time.Time `json:"timestamp" bson:"timestamp"`
}
