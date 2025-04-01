require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
};
