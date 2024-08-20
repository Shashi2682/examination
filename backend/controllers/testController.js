import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from localStorage

  useEffect(() => {
    axios.get('http://localhost:5000/api/test/questions', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setQuestions(response.data);
    })
    .catch((error) => {
      console.error('Error fetching questions:', error);
    });
  }, [token]);
  

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/submit', { answers }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      window.location.href = '/finish';
    })
    .catch((error) => {
      console.error('Error submitting test:', error);
    });
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        document.getElementById('camera-feed').srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera and microphone:', error);
        alert('Please allow camera and microphone access.');
      });
  }, []);

  return (
    <div>
      <h2>Test</h2>
      <video id="camera-feed" autoPlay></video>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={option}
                  onChange={(e) => handleChange(e, q._id)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Test;
