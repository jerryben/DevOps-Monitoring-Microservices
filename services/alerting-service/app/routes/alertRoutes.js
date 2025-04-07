const express = require('express');
const router = express.Router();

// Simulated in-memory alert storage
let alerts = [];

// 📌 GET all alerts
router.get('/', (req, res) => {
  res.status(200).json(alerts);
});

// 📌 GET a single alert by ID
router.get('/:id', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }
  res.json(alert);
});

// 📌 POST Create an alert
router.post('/', (req, res) => {
  const { type, level, message } = req.body;

  if (!type || !level || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newAlert = {
    id: (alerts.length + 1).toString(), 
    type,
    level,
    message,
    timestamp: new Date(),
  };

  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

// 📌 PUT Update an alert
router.put('/:id', (req, res) => {
  const { type, level, message } = req.body;
  const alertIndex = alerts.findIndex(a => a.id === req.params.id);

  if (alertIndex === -1) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  alerts[alertIndex] = { ...alerts[alertIndex], type, level, message };
  res.json(alerts[alertIndex]);
});

// 📌 DELETE an alert
router.delete('/:id', (req, res) => {
  const alertIndex = alerts.findIndex(a => a.id === req.params.id);
  if (alertIndex === -1) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  alerts.splice(alertIndex, 1);
  res.status(204).send();
});

module.exports = router;
