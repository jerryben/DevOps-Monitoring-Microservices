package com.example.visualization.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AlertPublisher {

    private final RabbitTemplate rabbitTemplate;

    // Inject RabbitMQ exchange and routing key from application.properties
    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routingkey}")
    private String routingKey;

    public AlertPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishAlert(String alertMessage) {
        // Publish the alert message to the specified exchange and routing key
        rabbitTemplate.convertAndSend(exchange, routingKey, alertMessage);
    }
}
