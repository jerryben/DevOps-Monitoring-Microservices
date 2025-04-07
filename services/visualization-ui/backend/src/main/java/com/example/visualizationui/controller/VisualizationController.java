package com.example.visualizationui.controller;

import com.example.visualization.service.VisualizationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visualization")
public class VisualizationController {

    private final VisualizationService visualizationService;

    public VisualizationController(VisualizationService visualizationService) {
        this.visualizationService = visualizationService;
    }

    // Endpoint to fetch metrics
    @GetMapping("/metrics")
    public List<Map<String, Object>> getMetrics() {
        return visualizationService.fetchMetrics();
    }

    // Endpoint to fetch logs
    @GetMapping("/logs")
    public List<Map<String, Object>> getLogs() {
        return visualizationService.fetchLogs();
    }
}
