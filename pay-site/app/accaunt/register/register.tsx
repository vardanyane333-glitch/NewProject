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
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
        setError(result?.message || "Could not create your account.");
        return;
      }

      setSuccess("Your account has been created. You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={style.page}>
      <section className={style.registerCard} aria-labelledby="register-title">
        <Link className={style.logo} href="/" aria-label="PaySite home">
          <img src="/logo-images/siteLogo/LO-go.jpg" alt="PaySite" />
        </Link>

        <header className={style.heading}>
          <span className={style.eyebrow}>CREATE ACCOUNT</span>

          <h1 id="register-title" className={style.title}>
            Sign up
          </h1>

          <p className={style.description}>
            Create an account to get started.
          </p>
        </header>

        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label} htmlFor="name">
            Name
          </label>

          <input
            className={style.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

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

          <label className={style.label} htmlFor="password">
            Password
          </label>

          <div className={style.passwordField}>
            <input
              className={style.input}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
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

          <label className={style.label} htmlFor="confirmPassword">
            Confirm password
          </label>

          <input
            className={style.input}
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter your password again"
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
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className={style.loginText}>
          Already have an account?{" "}
          <Link className={style.loginLink} href="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;