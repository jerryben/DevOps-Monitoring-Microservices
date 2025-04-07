package com.example.visualization.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    private static final String EXCHANGE_NAME = "alerts-exchange";
    private static final String QUEUE_NAME = "alerts-queue";
    private static final String ROUTING_KEY = "alerts-routing-key";

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue alertsQueue() {
        return new Queue(QUEUE_NAME);
    }

    @Bean
    public Binding binding(Queue alertsQueue, TopicExchange topicExchange) {
        return BindingBuilder.bind(alertsQueue).to(topicExchange).with(ROUTING_KEY);
    }
}
