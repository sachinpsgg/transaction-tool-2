import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (localStorage.getItem('username')) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
