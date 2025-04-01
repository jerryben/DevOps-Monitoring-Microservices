const redis = require('redis');
const { redis: redisConfig } = require('../config');

const client = redis.createClient({
  socket: {
    host: redisConfig.host,
    port: redisConfig.port
  }
});

client.connect();

client.on('error', (err) => console.error('Redis Client Error', err));

const sendAlert = async (message, level) => {
  try {
    await client.publish('alerts', JSON.stringify({ message, level }));
    console.log(`Published alert: ${message} (Level: ${level})`);
  } catch (error) {
    console.error('Error publishing alert:', error);
  }
};

module.exports = { sendAlert };
