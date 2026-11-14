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
                    <img src="/logo/Logo.png" alt="GameWebsite logo" />
                </Link>

                <button
                    type="button"
                    className={style.backTop}
                    onClick={handleBackTop}
                    aria-label="Back to top"
                >
                    <span>Back to top</span>
                    <FaChevronCircleUp />
                </button>
            </div>

            <div className={style.line} />

            <div className={style.bottom}>
                <span>
                    © 2026 GameWebsite. All rights reserved.
                </span>

                <nav className={style.links} aria-label="Footer navigation">
                    <Link href="/">Home</Link>
                    <Link href="/onlinegames">Games Online</Link>
                    <Link href="/domwlodGame">Download Games</Link>
                    <Link href="/about">About</Link>
                    <Link className={style.pay_site} style={{background: "#1a1440", padding: "5px 15px", borderRadius: 5,}} target="_blank" href="http://localhost:3001/"><span style={{color: "white"}}>Pay</span><span style={{color: "#9b8fd4"}}>Site</span></Link>
                </nav>
            </div>
        </footer>
    );
};

export default End;
