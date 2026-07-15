import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuth } from '../../store/auth/AuthContext';

export const AdminRoute = () => {
  const { isAuth, user } = useAuth();

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role !== 'admin') {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};