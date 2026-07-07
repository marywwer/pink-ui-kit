import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar/Avatar';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import { Snackbar } from '../../ui/Snackbar/Snackbar';
import { useAuth } from '../../store/auth/AuthContext';
import './RegisterPage.scss';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setError('');
      setIsLoading(true);

      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const closeError = () => {
    setError('');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-card__avatar">
          <Avatar name={name || 'Pink Market'} size="lg" />
        </div>

        <div className="auth-card__header">
          <h1>Регистрация</h1>
          <p>Создаём аккаунт для будущей корзины, лайков и прочего разврата</p>
        </div>

        <Input
          label="Имя"
          type="text"
          placeholder="Например, Дарья"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />

        <Input
          label="Пароль"
          type="password"
          placeholder="Минимум 4 символа"
          value={password}
          onChange={setPassword}
          minLength={4}
          required
          autoComplete="new-password"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Создаём...' : 'Зарегистрироваться'}
        </Button>

        <p className="auth-card__footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>

      {error && (
        <Snackbar
          items={[
            {
              id: 1,
              title: 'Ошибка',
              message: error,
            },
          ]}
          onClose={closeError}
        />
      )}
    </main>
  );
};