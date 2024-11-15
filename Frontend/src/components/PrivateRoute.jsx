import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  // Return the children component if authenticated, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
