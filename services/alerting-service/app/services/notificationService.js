const nodemailer = require('nodemailer');
const axios = require('axios');
const { slackWebhookURL } = require('../config');

const sendEmailNotification = async (subject, body, recipient) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipient,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
};

const sendSlackNotification = async message => {
  if (!slackWebhookURL) {
    console.error('Slack webhook URL is not configured');
    return;
  }

  try {
    await axios.post(slackWebhookURL, {
      text: message,
    });
    console.log('Slack notification sent');
  } catch (error) {
    console.error('Failed to send Slack notification:', error.message);
  }
};

module.exports = { sendEmailNotification };
module.exports = { sendSlackNotification };
