const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const alertRoutes = require('./src/routes/alertRoutes'); // Adjusted path to match the correct location
const { port } = require('./src/config'); // Adjusted path to match the correct location

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api/alerts', alertRoutes);

// Proxy API requests to the Java backend during development
app.use('/api', (req, res) => {
  const proxy = require('http-proxy-middleware');
  proxy({ target: 'http://localhost:8080', changeOrigin: true })(req, res);
});

// Root health check
app.get('/health', (req, res) => {
  res.send('Alerting Service is Running...');
});

// Catch-all handler for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
