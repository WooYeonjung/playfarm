// export default PrivateRoute;
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../service/context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Link to="/login" />;
};

export default PrivateRoute;
