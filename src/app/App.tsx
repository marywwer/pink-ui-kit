import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/HomePage/HomePage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";

import { ProtectedRoute } from "./router/ProtectedRoute";
import { PublicRoute } from "./router/PublicRoute";
import { AdminRoute } from "./router/AdminRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/products/:productId" element={<ProductPage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
