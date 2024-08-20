const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
// Import routes
const userRoutes = require('./routes/user');

// Initialize Express app
const app = express();
const emailRoutes = require('./utils/email'); // Adjust the path as needed
app.use('/api', emailRoutes);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes); // Ensure '/api' is the correct base route
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shashikantnalawade2255@gmail.com', // Your email address
        pass: 'klof gupt gfmt ijbm', // Your app password
    },
});

// Route to send score email
app.post('/send-score', (req, res) => {
    const { user_email, score, total } = req.body;

    const mailOptions = {
        from: 'shashikantnalawade2255@gmail.com',
        to: user_email,
        subject: 'Your Test Score',
        text: `Your Score: ${score} / ${total}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
