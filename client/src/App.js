import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Test from './components/Test';
import FinishTest from './components/FinishTest';
import Score from './components/Score';
import TestSelector from './components/TestSelector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        
        <Route 
          path="/select" 
          element={<TestSelector />} 
        />

        <Route 
          path="/score" 
          element={<Score />} 
        />

        <Route 
          path="/test/:subject" 
          element={<Test />} 
        />

        <Route 
          path="/finish" 
          element={<FinishTest />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
