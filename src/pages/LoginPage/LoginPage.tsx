import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Checkbox } from "../../ui/Checkbox/Checkbox";
import { Snackbar } from "../../ui/Snackbar/Snackbar";
import { useAuth } from "../../store/auth/AuthContext";
import "./LoginPage.scss";

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
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-card__header">
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Входим..." : "Войти"}
        </Button>

        <p className="auth-card__footer">
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
