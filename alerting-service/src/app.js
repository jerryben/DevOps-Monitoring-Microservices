const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alertRoutes');
const { port } = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', alertRoutes);

app.get('/', (req, res) => {
  res.send('Alerting Service is Running...');
});

module.exports = app;
