import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Snackbar } from '../../ui/Snackbar';
import { useAuth } from '../../store/auth/AuthContext';
import styles from './Styles.module.scss';

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
    <main className={styles.authPage}>
      <form className={styles.authCard} onSubmit={handleSubmit}>
        <div className={styles.avatar}>
          <Avatar name={name || 'Fleur'} size="lg" />
        </div>

        <div className={styles.header}>
          <h1>Регистрация</h1>
          <p>Создаём аккаунт для будущей корзины, лайков и прочего удовольствия</p>
        </div>

        <Input
          label="Имя"
          type="text"
          placeholder="Например, Мария"
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

        <div className={styles.buttonWrap}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Создаём...' : 'Зарегистрироваться'}
          </Button>
        </div>

        <p className={styles.footer}>
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