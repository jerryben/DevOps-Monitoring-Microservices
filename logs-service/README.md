## Logs Service Structure(G0)

logs-service/
│── app/
│   ├── database.go        # MongoDB connection* setup
│   ├── models.go          # Log model definition
│   ├── routes.go          # API endpoints
│── Dockerfile             # Containerization
├── main.go                # Entry point for Fiber app
│── go.mod                 # Go module dependencies
│── go.sum                 # Go dependency checksums
