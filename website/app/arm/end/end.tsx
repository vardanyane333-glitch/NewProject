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
                    <img src="/logo/Logo.png" alt="GameWebsite լոգո" />
                </Link>

                <button
                    type="button"
                    className={style.backTop}
                    onClick={handleBackTop}
                    aria-label="Վերև վերադառնալ"
                >
                    <span>Վերև</span>
                    <FaChevronCircleUp />
                </button>
            </div>

            <div className={style.line} />

            <div className={style.bottom}>
                <span>
                    © 2026 GameWebsite. Բոլոր իրավունքները պաշտպանված են։
                </span>

                <nav className={style.links} aria-label="Ֆուտերի նավիգացիա">
                    <Link href="/">Գլխավոր</Link>
                    <Link href="/onlinegames">Առցանց խաղեր</Link>
                    <Link href="/domwlodGame">Ներբեռնել խաղեր</Link>
                    <Link href="/about">Մեր մասին</Link>
                </nav>
            </div>
        </footer>
    );
};

export default End;