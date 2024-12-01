import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If not authenticated or role doesn't match, redirect to login
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
