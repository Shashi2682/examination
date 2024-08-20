// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return token && isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
