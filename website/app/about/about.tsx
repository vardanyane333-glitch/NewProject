'use client'

import { FC } from "react";
import style from "./about.module.css";

const About: FC = () => {
    return (
        <section className={style.about}>
            <div className={style.container}>
                <div className={style.content}>
                    <span className={style.label}>ABOUT US</span>

                    <h1>
                        Your Gaming World,
                        <span> All in One Place</span>
                    </h1>

                    <p className={style.description}>
                        Our website is created for gamers. Here you can
                        discover and download your favorite games, play
                        online, and explore new gaming experiences.
                    </p>

                    <p className={style.description}>
                        We also provide modern website development services.
                        Have an idea? We can turn it into a fast, beautiful,
                        and fully responsive website.
                    </p>

                    <div className={style.cards}>
                        <div className={style.card}>
                            <div className={style.icon}>🎮</div>

                            <h3>Games</h3>

                            <p>
                                Download games from different genres and
                                enjoy an amazing gaming experience.
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>🌐</div>

                            <h3>Online Games</h3>

                            <p>
                                Play online and connect with other players
                                anytime, anywhere.
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>💻</div>

                            <h3>Website Development</h3>

                            <p>
                                Order a modern, responsive, and beautiful
                                website built around your idea.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
