import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Checkbox } from "../../ui/Checkbox";
import { Snackbar } from "../../ui/Snackbar";
import { useAuth } from "../../store/auth/AuthContext";
import styles from "./Styles.module.scss";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  const closeError = () => {
    setError("");
  };

  return (
    <main className={styles.authPage}>
      <form className={styles.authCard} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1>Вход</h1>
          <p>Вернись в свой розовый потребительский рай</p>
        </div>

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
          placeholder="Введите пароль"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
        />

        <Checkbox
          label="Запомнить меня"
          checked={remember}
          onChange={setRemember}
        />

        <div className={styles.buttonWrap}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Входим..." : "Войти"}
          </Button>
        </div>

        <p className={styles.footer}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>

      {error && (
        <Snackbar
          items={[
            {
              id: 1,
              title: "Ошибка",
              message: error,
            },
          ]}
          onClose={closeError}
        />
      )}
    </main>
  );
};
