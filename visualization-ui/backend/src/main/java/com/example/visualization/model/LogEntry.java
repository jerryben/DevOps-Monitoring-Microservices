package com.example.visualization.model;

public class LogEntry {
    private int id;
    private String level;
    private String message;
    private String timestamp;

    // Constructors
    public LogEntry() {}

    public LogEntry(int id, String level, String message, String timestamp) {
        this.id = id;
        this.level = level;
        this.message = message;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
