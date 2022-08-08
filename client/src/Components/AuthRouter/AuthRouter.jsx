import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function AuthRouter({ children }) {
  const { user } = useSelector((state) => state);
  const location = useLocation();
  if (!user.name) {
    return children;
  } if (user.role === 'admin') {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return <Navigate to="/queue" state={{ from: location }} replace />;

  /* if (!user.name) {
    return children;
  }
  return <Navigate to="/queue" state={{ from: location }} replace />; */
}

export default AuthRouter;
