
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
         * REGISTER
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
                setError("Please enter your name.");
                return;
            }

            if (!email) {
                setLoading(false);
                setError("Please enter your email.");
                return;
            }

            if (password.length < 6) {
                setLoading(false);

                setError(
                    "Password must be at least 6 characters."
                );

                return;
            }

            if (password !== confirmPassword) {
                setLoading(false);

                setError(
                    "Passwords do not match."
                );

                return;
            }

            setTimeout(() => {
                setLoading(false);

                setSuccess(
                    "Your account has been created successfully."
                );
            }, 400);

            return;
        }

        /*
         * USER LOGIN
         */

        const email = String(
            form.get("email") || ""
        ).trim();

        const password = String(
            form.get("password") || ""
        );

        if (!email) {
            setLoading(false);
            setError("Please enter your email.");
            return;
        }

        if (!password) {
            setLoading(false);
            setError("Please enter your password.");
            return;
        }

        setTimeout(() => {
            setLoading(false);

            setSuccess("Login successful.");
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
                            ? "REGISTER"
                            : "WELCOME BACK"}
                    </div>

                    <h1>
                        {register
                            ? "Create your account"
                            : "Sign in to continue"}
                    </h1>

                    <p>
                        {register
                            ? "Join GameWebsite and get started."
                            : "Welcome back. Enter your details below."}
                    </p>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    {register && (
                        <div className={styles.field}>
                            <label>Name</label>

                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="Your name"
                                autoComplete="name"
                                required
                            />
                        </div>
                    )}

                    <div className={styles.field}>
                        <label>Email</label>

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
                        <label>Password</label>

                        <div className={styles.passwordBox}>
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Your password"
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

                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {register && (
                        <div className={styles.field}>
                            <label>Confirm password</label>

                            <div className={styles.passwordBox}>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Repeat password"
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
                                        ? "Hide"
                                        : "Show"}
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

                                <span>Remember me</span>
                            </label>

                            <button
                                type="button"
                                className={styles.forgot}
                                onClick={() => {
                                    setError(
                                        "Password recovery is not available yet."
                                    );

                                    setSuccess("");
                                }}
                            >
                                Forgot password?
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
                                ? "Please wait..."
                                : register
                                ? "Create account"
                                : "Sign in"}
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
                            ? "Already have an account?"
                            : "Don't have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={switchRegister}
                    >
                        {register ? "Sign in" : "Register"}
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
 * LOGO COMPONENT
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
                    alt="GameWebsite logo"
                />
            </span>

            <span className={styles.logoName}>
                GameWebsite
            </span>
        </Link>
    );
}


/*
 * MESSAGE COMPONENT
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
