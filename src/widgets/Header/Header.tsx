import { Link, NavLink } from "react-router-dom";
import { Avatar } from "../../ui/Avatar/Avatar";
import { Button } from "../../ui/Button/Button";
import { Tooltip } from "../../ui/Tooltip/Tooltip";
import { useAuth } from "../../store/auth/AuthContext";
import { useCartStore } from "../../store/cart/useCartStore";
import styles from "./Styles.module.scss";

export const Header = () => {
  const { isAuth, user, logout } = useAuth();
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const userName = user?.name || "Пользователь";
  const userEmail = user?.email || "";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          Fleur
        </Link>

        <nav className={styles.navigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Главная
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Букеты
          </NavLink>

          {isAuth && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Избранное
            </NavLink>
          )}

          {isAuth && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Корзина
              {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
              )}
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Администрирование
            </NavLink>
          )}
        </nav>

        <div className={styles.account}>
          {isAuth ? (
            <>
              <Tooltip content={userEmail} position="bottom">
                <div className={styles.user}>
                  <Avatar name={userName} size="sm" />
                  <span>{userName}</span>
                </div>
              </Tooltip>

              <Button variant="secondary" type="button" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link className={styles.loginLink} to="/login">
                Войти
              </Link>

              <Link className={styles.registerLink} to="/register">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
