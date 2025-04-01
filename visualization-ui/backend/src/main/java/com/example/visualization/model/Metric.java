package com.example.visualization.model;

public class Metric {
    private int id;
    private String name;
    private String value;

    // Constructors
    public Metric() {}

    public Metric(int id, String name, String value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
