package com.example.visualization.controller;

import com.example.visualization.service.AlertPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertPublisher alertPublisher;

    // In-memory storage for historical alerts (replace with a database in
    // production)
    private final List<String> historicalAlerts = new ArrayList<>();

    public AlertController(AlertPublisher alertPublisher) {
        this.alertPublisher = alertPublisher;
    }

    // Endpoint to publish a new alert
    @PostMapping
    public void publishAlert(@RequestBody String alertMessage) {
        alertPublisher.publishAlert(alertMessage);
        historicalAlerts.add(alertMessage); // Save to in-memory storage
    }

    // Endpoint to retrieve historical alerts
    @GetMapping
    public List<String> getHistoricalAlerts() {
        return historicalAlerts;
    }
}
