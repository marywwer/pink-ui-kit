import { Link } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar/Avatar';
import { Button } from '../../ui/Button/Button';
import { Tooltip } from '../../ui/Tooltip/Tooltip';
import { useAuth } from '../../store/auth/AuthContext';
import './HomePage.scss';

export const HomePage = () => {
  const { isAuth, user, logout } = useAuth();

  return (
    <main className="home-page">
      <section className="home-page__hero">
        <p className="home-page__eyebrow">Pink Market</p>

        <h1>Интернет-магазин красивых штук</h1>

        <p className="home-page__text">
          Пока не придумала ничего интересного, поэтому просто приветствую.
        </p>

        {isAuth && user && (
          <div className="home-page__user">
            <Avatar name={user.name || 'User'} size="md" status="online" />

            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>
        )}

        <div className="home-page__actions">
          {isAuth ? (
            <>
              <Link to="/profile">Личный кабинет</Link>
              <Link to="/cart">Корзина</Link>

              <Tooltip content="Выйти из аккаунта">
                <Button variant="secondary" onClick={logout}>
                  Выйти
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};