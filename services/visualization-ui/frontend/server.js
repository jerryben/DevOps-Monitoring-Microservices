const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests to the Java backend during development
app.use('/api', (req, res) => {
  const proxy = require('http-proxy-middleware');
  proxy({ target: 'http://localhost:8080', changeOrigin: true })(req, res);
});

// Catch-all handler for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
