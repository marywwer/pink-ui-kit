import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ProtectedRoute } from './router/ProtectedRoute';
import { PublicRoute } from './router/PublicRoute';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<div>Личный кабинет</div>} />
          <Route path="/cart" element={<div>Корзина</div>} />
          <Route path="/favorites" element={<div>Избранное</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};