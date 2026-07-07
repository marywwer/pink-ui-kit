import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth/AuthContext';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};