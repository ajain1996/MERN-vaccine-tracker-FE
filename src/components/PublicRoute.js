import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = !localStorage.getItem('token');

  const userString = localStorage.getItem('user');

  const getUserFromLocalStorage = () => {
    try {
      const user = JSON.parse(userString);
      return(user);
    } catch (err) {
      console.error("Failed to parse user data", err);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(getUserFromLocalStorage().role)) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;
