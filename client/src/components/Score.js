import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Score.module.css";

const Score = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || {};

  const token = localStorage.getItem('authToken');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Get the user's email from localStorage
  const user = localStorage.getItem('userEmail'); // This should be set during login

  const sendScoreEmail = async () => {
    if (!user) {
      console.error('User email is not available.');
      return; // Prevent sending email if user email is not found
    }

    const templateParams = {
      user_email: user, // Use the logged-in user's email
      score: score,
      total: total,
    };

    try {
      const response = await fetch('https://examination-1.onrender.com/send-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.text();
      console.log('Email sent successfully!', data);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  useEffect(() => {
    if (!token || !isLoggedIn) {
      navigate('/login');
    } else if (score === undefined) {
      navigate('/select');
    } else {
      sendScoreEmail(); // Send email when the component loads
    }
  }, [navigate, token, isLoggedIn, score]);

  return (
    <div className={styles.scoreContainer}>
      <h1>Test Score</h1>
      <p>Your Score: {score} / {total}</p>
      <button onClick={() => navigate('/select')}>Go to Test Selector</button>
    </div>
  );
};

export default Score;
