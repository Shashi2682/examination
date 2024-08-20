const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/api/send-score', async (req, res) => {
  const { email, score, total } = req.body;

  try {
    // Setup for nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your Test Score',
      text: `Congratulations! You scored ${score} out of ${total}.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

module.exports = router;
