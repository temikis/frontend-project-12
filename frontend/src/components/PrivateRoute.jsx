import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/authSlice.js';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
