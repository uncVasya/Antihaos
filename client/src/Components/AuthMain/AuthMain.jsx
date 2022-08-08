import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function AuthMain({ children }) {
  const { user } = useSelector((state) => state);
  const location = useLocation();
  if (!user.name) {
    return children;
  }
  return !children;
}

export default AuthMain;
