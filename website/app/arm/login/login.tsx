
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
         * ԳՐԱՆՑՈՒՄ
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
                setError("Խնդրում ենք մուտքագրել ձեր անունը։");
                return;
            }

            if (!email) {
                setLoading(false);
                setError("Խնդրում ենք մուտքագրել ձեր էլ․ փոստը։");
                return;
            }

            if (password.length < 6) {
                setLoading(false);

                setError(
                    "Գաղտնաբառը պետք է պարունակի առնվազն 6 նիշ։"
                );

                return;
            }

            if (password !== confirmPassword) {
                setLoading(false);

                setError(
                    "Գաղտնաբառերը չեն համընկնում։"
                );

                return;
            }

            setTimeout(() => {
                setLoading(false);

                setSuccess(
                    "Ձեր հաշիվը հաջողությամբ ստեղծվել է։"
                );
            }, 400);

            return;
        }

        /*
         * ՄՈՒՏՔ
         */

        const email = String(
            form.get("email") || ""
        ).trim();

        const password = String(
            form.get("password") || ""
        );

        if (!email) {
            setLoading(false);
            setError("Խնդրում ենք մուտքագրել ձեր էլ․ փոստը։");
            return;
        }

        if (!password) {
            setLoading(false);
            setError("Խնդրում ենք մուտքագրել ձեր գաղտնաբառը։");
            return;
        }

        setTimeout(() => {
            setLoading(false);

            setSuccess("Դուք հաջողությամբ մուտք եք գործել։");
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
                            ? "ԳՐԱՆՑՈՒՄ"
                            : "ԲԱՐԻ ԳԱԼՈՒՍՏ"}
                    </div>

                    <h1>
                        {register
                            ? "Ստեղծեք ձեր հաշիվը"
                            : "Մուտք գործեք ձեր հաշիվ"}
                    </h1>

                    <p>
                        {register
                            ? "Միացեք GameWebsite-ին և սկսեք։"
                            : "Բարի վերադարձ։ Մուտքագրեք ձեր տվյալները։"}
                    </p>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    {register && (
                        <div className={styles.field}>
                            <label>Անուն</label>

                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="Ձեր անունը"
                                autoComplete="name"
                                required
                            />
                        </div>
                    )}

                    <div className={styles.field}>
                        <label>Էլ․ փոստ</label>

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
                        <label>Գաղտնաբառ</label>

                        <div className={styles.passwordBox}>
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Ձեր գաղտնաբառը"
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

                                {showPassword ? "Թաքցնել" : "Ցուցադրել"}
                            </button>
                        </div>
                    </div>

                    {register && (
                        <div className={styles.field}>
                            <label>Կրկնեք գաղտնաբառը</label>

                            <div className={styles.passwordBox}>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Կրկնեք գաղտնաբառը"
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
                                        ? "Թաքցնել"
                                        : "Ցուցադրել"}
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

                                <span>Հիշել ինձ</span>
                            </label>

                            <button
                                type="button"
                                className={styles.forgot}
                                onClick={() => {
                                    setError(
                                        "Գաղտնաբառի վերականգնումը դեռ հասանելի չէ։"
                                    );

                                    setSuccess("");
                                }}
                            >
                                Մոռացե՞լ եք գաղտնաբառը։
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
                                ? "Խնդրում ենք սպասել..."
                                : register
                                ? "Ստեղծել հաշիվ"
                                : "Մուտք գործել"}
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
                            ? "Արդեն ունե՞ք հաշիվ։"
                            : "Դեռ չունե՞ք հաշիվ։"}
                    </span>

                    <button
                        type="button"
                        onClick={switchRegister}
                    >
                        {register ? "Մուտք գործել" : "Գրանցվել"}
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
 * ԼՈԳՈՅԻ ԲԱՂԱԴՐԻՉ
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
                    alt="GameWebsite լոգո"
                />
            </span>

            <span className={styles.logoName}>
                GameWebsite
            </span>
        </Link>
    );
}


/*
 * ՀԱՂՈՐԴԱԳՐՈՒԹՅԱՆ ԲԱՂԱԴՐԻՉ
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
