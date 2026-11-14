"use client";

import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "./login.module.css";

const Login: FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message || "Email or password is incorrect.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={style.page}>
      <section className={style.loginCard} aria-labelledby="login-title">
        <Link className={style.logo} href="/" aria-label="PaySite home">
          <img
            src="/logo-images/siteLogo/LO-go.jpg"
            alt="PaySite"
          />
        </Link>

        <div className={style.heading}>
          <span className={style.eyebrow}>WELCOME BACK</span>

          <h1 id="login-title" className={style.title}>
            Log in to your account
          </h1>

          <p className={style.description}>
            Enter your details to continue to your account.
          </p>
        </div>

        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label} htmlFor="email">
            Email address
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

          <div className={style.passwordHeading}>
            <label className={style.label} htmlFor="password">
              Password
            </label>

            <Link className={style.forgotLink} href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <div className={style.passwordField}>
            <input
              className={style.input}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className={style.showPassword}
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className={style.remember}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Remember me</span>
          </label>

          {error && (
            <p className={style.errorMessage} role="alert">
              {error}
            </p>
          )}

          <button
            className={style.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className={style.signupText}>
          Don&apos;t have an account?{" "}
          <Link className={style.signupLink} href="/accaunt/register">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;