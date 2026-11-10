
'use client';

import { FC } from "react";
import Link from "next/link";
import style from "./end.module.css";
import { FaChevronCircleUp } from "react-icons/fa";

const End: FC = () => {
    const handleBackTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className={style.container}>
            <div className={style.top}>
                <Link href="/" className={style.logo}>
                    <span>GameWebsite</span>
                    <img
                        src="/logo/Logo.png"
                        alt="Логотип GameWebsite"
                    />
                </Link>

                <button
                    type="button"
                    className={style.backTop}
                    onClick={handleBackTop}
                    aria-label="Вернуться наверх"
                >
                    <span>Наверх</span>
                    <FaChevronCircleUp />
                </button>
            </div>

            <div className={style.line} />

            <div className={style.bottom}>
                <span>
                    © 2026 GameWebsite. Все права защищены.
                </span>

                <nav
                    className={style.links}
                    aria-label="Навигация в подвале сайта"
                >
                    <Link href="/">Главная</Link>
                    <Link href="/onlinegames">Онлайн-игры</Link>
                    <Link href="/domwlodGame">Скачать игры</Link>
                    <Link href="/about">С GameWebsite</Link>
                </nav>
            </div>
        </footer>
    );
};

export default End;
