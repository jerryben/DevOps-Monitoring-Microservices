const express = require('express');
const router = express.Router();
const alertService = require('../services/alertService');

router.post('/alert', async (req, res) => {
  try {
    const { message, level } = req.body;
    await alertService.sendAlert(message, level);
    res.status(200).json({ success: true, message: 'Alert sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

