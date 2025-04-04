## Logs Service Structure

logs-service/
│── app/
│   ├── database         
│   │   ├── database.go        # MongoDB connection* setup
│   ├── models
│   │   ├── models.go          # Log model definition
│   ├── routes
│       ├── routes.go          # API endpoints
│
│── Dockerfile             # Containerization
├── main.go                # Entry point for Fiber app
│── go.mod                 # Go module dependencies
│── go.sum                 # Go dependency checksums
