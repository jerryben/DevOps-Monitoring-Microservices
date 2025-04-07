const express = require('express');
const { initRedis, initMongo } = require('./database');
const alertsRouter = require('./routes/alerts');
const { consumeRabbitMQ } = require('./services/rabbitmqService');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/alerts', alertsRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Alerting Service is running!' });
});

// Initialize Redis, MongoDB, and RabbitMQ
const startService = async () => {
  await initRedis();
  await initMongo();
  consumeRabbitMQ(); // Start consuming messages from RabbitMQ
};

startService();

module.exports = app;
