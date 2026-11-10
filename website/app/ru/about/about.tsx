
'use client'

import { FC } from "react";
import style from "./about.module.css";

const About: FC = () => {
    return (
        <section className={style.about}>
            <div className={style.container}>
                <div className={style.content}>
                    <span className={style.label}>
                        О НАС
                    </span>

                    <h1>
                        Твой игровой мир —
                        <span> всё в одном месте</span>
                    </h1>

                    <p className={style.description}>
                        Наш сайт создан для геймеров.
                        Здесь ты можешь находить и скачивать
                        любимые игры, играть онлайн и открывать
                        для себя новые игровые возможности.
                    </p>

                    <p className={style.description}>
                        Мы также предлагаем услуги по разработке
                        современных сайтов. Есть идея? Мы превратим
                        её в быстрый, красивый и полностью
                        адаптивный сайт.
                    </p>

                    <div className={style.cards}>
                        <div className={style.card}>
                            <div className={style.icon}>
                                🎮
                            </div>

                            <h3>Игры</h3>

                            <p>
                                Скачивай игры разных жанров
                                и наслаждайся невероятным
                                игровым опытом.
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>
                                🌐
                            </div>

                            <h3>Онлайн-игры</h3>

                            <p>
                                Играй онлайн и общайся
                                с другими игроками в любое
                                время и в любом месте.
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>
                                💻
                            </div>

                            <h3>Разработка сайтов</h3>

                            <p>
                                Закажи современный, красивый
                                и адаптивный сайт, созданный
                                на основе твоей идеи.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
