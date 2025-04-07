const amqp = require('amqplib');
const { processAlert } = require('./alertService');

const rabbitMQURL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

const consumeRabbitMQ = async () => {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(rabbitMQURL);
    const channel = await connection.createChannel();

    // Assert the queue (create it if it doesn't exist)
    const queueName = 'metrics-logs-queue';
    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in RabbitMQ queue: ${queueName}...`);

    // Consume messages from the queue
    channel.consume(queueName, async msg => {
      if (msg !== null) {
        try {
          const data = JSON.parse(msg.content.toString());
          console.log('Received message from RabbitMQ:', data);

          // Process the alert
          await processAlert(data);

          // Acknowledge the message
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing RabbitMQ message:', error.message);
          // Optionally, reject the message without requeueing
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error('Failed to consume RabbitMQ messages:', error.message);
  }
};

module.exports = { consumeRabbitMQ };
