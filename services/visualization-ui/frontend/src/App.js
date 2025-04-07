const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alertRoutes');
const { port } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/alerts', alertRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('Alerting Service is Running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
