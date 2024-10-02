// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../service/context/AuthProvider'

// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../service/context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Link to="/login" />;
};

export default PrivateRoute;
