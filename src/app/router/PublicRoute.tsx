import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth/AuthContext';

export const PublicRoute = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};