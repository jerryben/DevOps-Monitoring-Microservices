package com.example.visualization.model;

import java.time.LocalDateTime;

public class Metric {
    private int id;
    private String name;
    private String value;
    private LocalDateTime timestamp; // Optional field for time tracking

    // Constructors
    public Metric() {}

    public Metric(int id, String name, String value, LocalDateTime timestamp) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
