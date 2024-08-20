const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate a JWT token
const generateToken = (userId) => {
  // Ensure the JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Sign the token with the user ID and secret, set expiration to 1 hour
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  // Ensure the JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    // Verify the token and return the decoded payload
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Return null if token is invalid or expired
    return null;
  }
};

module.exports = { generateToken, verifyToken };
