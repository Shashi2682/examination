import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Test.module.css";
import mathQuestions from "./math.json";
import scienceQuestions from "./science.json";
import historyQuestions from "./history.json";
import geographyQuestions from "./geography.json";
import literatureQuestions from "./literature.json";

// Mapping subjects to their question files
const questionsMap = {
  math: mathQuestions,
  science: scienceQuestions,
  history: historyQuestions,
  geography: geographyQuestions,
  literature: literatureQuestions,
};

const Test = () => {
  const { subject } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 45); // 45 minutes
  const [testSubmitted, setTestSubmitted] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  // Handle authentication
  useEffect(() => {
    if (!token || !isLoggedIn) {
      navigate('/login');
    } else {
      console.log('Token:', token);
      console.log('isLoggedIn:', isLoggedIn);
    }
  }, [navigate, token, isLoggedIn]);

  // Ensure the subject is valid
  useEffect(() => {
    if (!questionsMap[subject]) {
      navigate('/');
    }
  }, [subject, navigate]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !testSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testSubmitted]);

  const handleOptionClick = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));

    if (option === questionsMap[subject]?.[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsMap[subject]?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    // Ensure the test is only submitted once
    if (!testSubmitted) {
      setTestSubmitted(true); // Set the test as submitted
      // Pass the score and total questions to the Score component
      navigate('/score', { state: { score, total: questionsMap[subject]?.length } });
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedQuestions = Object.keys(selectedAnswers).length;
  const pendingQuestions = questionsMap[subject]?.length - completedQuestions;

  if (testSubmitted) {
    return (
      <div className={styles.testCompleted}>
        <p>You have already submitted the test.</p>
      </div>
    );
  }

  if (!questionsMap[subject]) {
    return (
      <div className={styles.error}>
        <p>Test subject not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className={styles.testContainer}>
      <div className={styles.header}>
        <h2>{subject ? `${subject.charAt(0).toUpperCase() + subject.slice(1)} Test` : "Test"}</h2>
        <div className={styles.timer}>
          <p>Time Left</p>
          <p>{formatTime(timeLeft)}</p>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.questionSection}>
          <h3>Question {currentQuestionIndex + 1}</h3>
          <p>{questionsMap[subject]?.[currentQuestionIndex]?.question}</p>
          <div className={styles.options}>
            {questionsMap[subject]?.[currentQuestionIndex]?.options.map((option, index) => (
              <div key={index} className={styles.option}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={() => handleOptionClick(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <button onClick={handlePreviousQuestion} className={styles.previous}>
              Previous
            </button>
            <button onClick={handleNextQuestion} className={styles.next}>
              Next
            </button>
          </div>
          <button className={styles.submitTest} onClick={handleSubmitTest}>
            Submit Test
          </button>
          <p>Completed: {completedQuestions} / {questionsMap[subject]?.length}</p>
          <p>Pending: {pendingQuestions} / {questionsMap[subject]?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Test;
