package com.example.visualization.model;

import java.time.LocalDateTime;

public class LogEntry {
    private int id;
    private LocalDateTime timestamp;
    private String level; // Log level (e.g., INFO, ERROR, WARN)
    private String message;

    // Constructors
    public LogEntry() {}

    public LogEntry(int id, LocalDateTime timestamp, String level, String message) {
        this.id = id;
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
