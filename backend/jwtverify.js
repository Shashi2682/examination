const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwYThhZDNkZmMyYTUxM2M3NTYzODYiLCJlbWFpbCI6InNoYXNoaWthbnRAZ21haWwuY29tIiwiaWF0IjoxNzIzOTg5MDI1LCJleHAiOjE3MjM5OTI2MjV9.-fuJigEjeQMJoBzMqTRWeBPOcJ4D8tfEedXXx2EgZNc'; // Replace with your token
const secretKey = 'nnYhq7pKJfUu8IAvpR4HmdllAxhw9BpJpB702ALhnM4='; // Replace with your secret key

try {
  const decoded = jwt.verify(token, secretKey);
  console.log('Token is valid:', decoded);
} catch (error) {
  console.error('Invalid token:', error.message);
}
