import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
  
  // Return the component if authenticated, otherwise redirect to login
  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
