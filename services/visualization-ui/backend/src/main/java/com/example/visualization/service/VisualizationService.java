package com.example.visualization.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class VisualizationService {

    @Value("${metrics.service.url}")
    private String metricsServiceUrl;

    @Value("${logs.service.url}")
    private String logsServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Map<String, Object>> fetchMetrics() {
        return restTemplate.getForObject(metricsServiceUrl, List.class);
    }

    public List<Map<String, Object>> fetchLogs() {
        return restTemplate.getForObject(logsServiceUrl, List.class);
    }
}
