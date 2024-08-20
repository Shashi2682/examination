import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TestSelector.module.css";
import Logout from './Logout'; // Import the Logout component

const TestSelector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';

    if (!authToken || !isLoggedIn) {
      // Token or login status is invalid
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
    } else {
      // Token is valid
     
      console.log('Token:', authToken);
      console.log('Is Logged In:', isLoggedIn);
    }
  }, [navigate]);

  const handleTestSelect = (testName) => {
    localStorage.setItem('fromTestSelector', 'true');
    alert(`You selected ${testName} test.`); // Corrected string interpolation
    navigate(`/test/${testName}`); // Corrected path string
  };
  
  return (
    <div className={styles.testSelector}>
      <h1>Select a Test</h1>
      <button onClick={() => handleTestSelect("math")}>Math</button>
      <button onClick={() => handleTestSelect("science")}>Science</button>
      <button onClick={() => handleTestSelect("history")}>History</button>
      <button onClick={() => handleTestSelect("geography")}>Geography</button>
      <button onClick={() => handleTestSelect("literature")}>Literature</button>
      
      {/* Include Logout Button */}
      <Logout />
    </div>
  );
};

export default TestSelector;
