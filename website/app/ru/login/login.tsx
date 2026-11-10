
"use client";

import {
    FC,
    FormEvent,
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import styles from "./login.module.css";

const Login: FC = () => {
    const [register, setRegister] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    const clearMessages = () => {
        setError("");
        setSuccess("");
    };

    const switchRegister = () => {
        setRegister((value) => !value);

        setLoading(false);
        clearMessages();

        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        clearMessages();
        setLoading(true);

        const form = new FormData(event.currentTarget);

        /*
         * РЕГИСТРАЦИЯ
         */

        if (register) {
            const name = String(
                form.get("name") || ""
            ).trim();

            const email = String(
                form.get("email") || ""
            ).trim();

            const password = String(
                form.get("password") || ""
            );

            const confirmPassword = String(
                form.get("confirmPassword") || ""
            );

            if (!name) {
                setLoading(false);
                setError("Пожалуйста, введите ваше имя.");
                return;
            }

            if (!email) {
                setLoading(false);
                setError("Пожалуйста, введите вашу электронную почту.");
                return;
            }

            if (password.length < 6) {
                setLoading(false);

                setError(
                    "Пароль должен содержать не менее 6 символов."
                );

                return;
            }

            if (password !== confirmPassword) {
                setLoading(false);

                setError(
                    "Пароли не совпадают."
                );

                return;
            }

            setTimeout(() => {
                setLoading(false);

                setSuccess(
                    "Ваш аккаунт успешно создан."
                );
            }, 400);

            return;
        }

        /*
         * ВХОД
         */

        const email = String(
            form.get("email") || ""
        ).trim();

        const password = String(
            form.get("password") || ""
        );

        if (!email) {
            setLoading(false);
            setError("Пожалуйста, введите вашу электронную почту.");
            return;
        }

        if (!password) {
            setLoading(false);
            setError("Пожалуйста, введите ваш пароль.");
            return;
        }

        setTimeout(() => {
            setLoading(false);

            setSuccess("Вы успешно вошли в аккаунт.");
        }, 400);
    };

    return (
        <main
            className={`${styles.page} ${
                mounted ? styles.mounted : ""
            }`}
        >
            <div className={styles.background}>
                <span />
                <span />
                <span />
            </div>

            <section
                className={`${styles.card} ${
                    register ? styles.registerCard : ""
                }`}
            >
                <Logo />

                <div className={styles.header}>
                    <div className={styles.badge}>
                        <span>●</span>

                        {register
                            ? "РЕГИСТРАЦИЯ"
                            : "С ВОЗВРАЩЕНИЕМ"}
                    </div>

                    <h1>
                        {register
                            ? "Создайте свой аккаунт"
                            : "Войдите в свой аккаунт"}
                    </h1>

                    <p>
                        {register
                            ? "Присоединяйтесь к GameWebsite и начните играть."
                            : "С возвращением! Введите свои данные ниже."}
                    </p>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    {register && (
                        <div className={styles.field}>
                            <label>Имя</label>

                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                autoComplete="name"
                                required
                            />
                        </div>
                    )}

                    <div className={styles.field}>
                        <label>Электронная почта</label>

                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="you@gmail.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Пароль</label>

                        <div className={styles.passwordBox}>
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Ваш пароль"
                                autoComplete={
                                    register
                                        ? "new-password"
                                        : "current-password"
                                }
                                required
                            />

                            <button
                                type="button"
                                className={styles.showButton}
                                onClick={() =>
                                    setShowPassword(
                                        (value) => !value
                                    )
                                }
                            >
                                <span className={styles.eyeIcon}>
                                    {showPassword ? "◉" : "◌"}
                                </span>

                                {showPassword ? "Скрыть" : "Показать"}
                            </button>
                        </div>
                    </div>

                    {register && (
                        <div className={styles.field}>
                            <label>Подтвердите пароль</label>

                            <div className={styles.passwordBox}>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Повторите пароль"
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className={styles.showButton}
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (value) => !value
                                        )
                                    }
                                >
                                    <span className={styles.eyeIcon}>
                                        {showConfirmPassword
                                            ? "◉"
                                            : "◌"}
                                    </span>

                                    {showConfirmPassword
                                        ? "Скрыть"
                                        : "Показать"}
                                </button>
                            </div>
                        </div>
                    )}

                    {!register && (
                        <div className={styles.options}>
                            <label className={styles.remember}>
                                <input
                                    type="checkbox"
                                    name="remember"
                                />

                                <span>Запомнить меня</span>
                            </label>

                            <button
                                type="button"
                                className={styles.forgot}
                                onClick={() => {
                                    setError(
                                        "Восстановление пароля пока недоступно."
                                    );

                                    setSuccess("");
                                }}
                            >
                                Забыли пароль?
                            </button>
                        </div>
                    )}

                    {error && (
                        <Message
                            type="error"
                            text={error}
                        />
                    )}

                    {success && (
                        <Message
                            type="success"
                            text={success}
                        />
                    )}

                    <button
                        type="submit"
                        className={styles.primaryButton}
                        disabled={loading}
                    >
                        <span>
                            {loading
                                ? "Пожалуйста, подождите..."
                                : register
                                ? "Создать аккаунт"
                                : "Войти"}
                        </span>

                        {!loading && (
                            <span className={styles.buttonArrow}>
                                →
                            </span>
                        )}
                    </button>
                </form>

                <div className={styles.switch}>
                    <span>
                        {register
                            ? "Уже есть аккаунт?"
                            : "Ещё нет аккаунта?"}
                    </span>

                    <button
                        type="button"
                        onClick={switchRegister}
                    >
                        {register ? "Войти" : "Зарегистрироваться"}
                    </button>
                </div>

                <p className={styles.footerText}>
                    © 2026 GameWebsite
                </p>
            </section>
        </main>
    );
};


/*
 * КОМПОНЕНТ ЛОГОТИПА
 */

function Logo() {
    return (
        <Link
            href="/"
            className={styles.logo}
        >
            <span className={styles.logoMark}>
                <img
                    src="/logo/Logo.png"
                    alt="Логотип GameWebsite"
                />
            </span>

            <span className={styles.logoName}>
                GameWebsite
            </span>
        </Link>
    );
}


/*
 * КОМПОНЕНТ СООБЩЕНИЙ
 */

type MessageProps = {
    type: "error" | "success";
    text: string;
};

function Message({
    type,
    text,
}: MessageProps) {
    return (
        <div
            className={
                type === "error"
                    ? styles.error
                    : styles.success
            }
        >
            <span className={styles.messageIcon}>
                {type === "error" ? "!" : "✓"}
            </span>

            <span>{text}</span>
        </div>
    );
}

export default Login;
