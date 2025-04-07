package com.example.visualizationui.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // Handle incoming WebSocket messages and broadcast to subscribers
    @MessageMapping("/alerts")
    @SendTo("/topic/alerts")
    public String broadcastAlert(String alertMessage) {
        return alertMessage;
    }
}
