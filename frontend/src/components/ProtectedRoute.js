// import React, { useContext } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);
const token = localStorage.getItem('jwtToken');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
