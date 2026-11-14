"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import style from "./register.module.css";

const Register: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          result?.message || "Не удалось создать аккаунт."
        );
        return;
      }

      setSuccess("Аккаунт создан. Теперь вы можете войти.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Не удалось подключиться. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={style.page}>
      <section
        className={style.registerCard}
        aria-labelledby="register-title"
      >
        <Link
          className={style.logo}
          href="/"
          aria-label="Главная страница PaySite"
        >
          <img
            src="/logo-images/siteLogo/LO-go.jpg"
            alt="PaySite"
          />
        </Link>

        <header className={style.heading}>
          <span className={style.eyebrow}>СОЗДАЙТЕ АККАУНТ</span>

          <h1 id="register-title" className={style.title}>
            Регистрация
          </h1>

          <p className={style.description}>
            Создайте аккаунт, чтобы начать.
          </p>
        </header>

        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label} htmlFor="name">
            Имя
          </label>

          <input
            className={style.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label className={style.label} htmlFor="email">
            Электронная почта
          </label>

          <input
            className={style.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className={style.label} htmlFor="password">
            Пароль
          </label>

          <div className={style.passwordField}>
            <input
              className={style.input}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Не менее 8 символов"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className={style.showPassword}
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={
                showPassword ? "Скрыть пароль" : "Показать пароль"
              }
              aria-pressed={showPassword}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>

          <label className={style.label} htmlFor="confirmPassword">
            Подтвердите пароль
          </label>

          <input
            className={style.input}
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Введите пароль ещё раз"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          {error && (
            <p className={style.errorMessage} role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className={style.successMessage} role="status">
              {success}
            </p>
          )}

          <button
            className={style.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
          </button>
        </form>

        <p className={style.loginText}>
          Уже есть аккаунт?{" "}
          <Link className={style.loginLink} href="/accaunt/login">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;