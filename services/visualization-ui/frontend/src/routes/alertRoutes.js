const express = require('express');
const router = express.Router();

// Example route for alerts
router.get('/', (req, res) => {
  res.json({ message: 'Alert routes are working!' });
});

module.exports = router;
