package com.example.visualization.controller;

import com.example.visualization.service.VisualizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visualization")
public class VisualizationController {

    private final VisualizationService visualizationService;

    public VisualizationController(VisualizationService visualizationService) {
        this.visualizationService = visualizationService;
    }

    @GetMapping("/metrics")
    public List<Map<String, Object>> getMetrics() {
        return visualizationService.fetchMetrics();
    }

    @GetMapping("/logs")
    public List<Map<String, Object>> getLogs() {
        return visualizationService.fetchLogs();
    }
}
