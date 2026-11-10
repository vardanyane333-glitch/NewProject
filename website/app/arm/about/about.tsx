'use client'

import { FC } from "react";
import style from "./about.module.css";

const About: FC = () => {
    return (
        <section className={style.about}>
            <div className={style.container}>
                <div className={style.content}>
                    <span className={style.label}>ՄԵՐ ՄԱՍԻՆ</span>

                    <h1>
                        Ձեր խաղային աշխարհը,
                        <span> բոլորը մեկ տեղում</span>
                    </h1>

                    <p className={style.description}>
                        Մեր կայքը ստեղծված է գեյմերների համար։ Այստեղ կարող եք
                        բացահայտել և ներբեռնել ձեր սիրելի խաղերը, խաղալ
                        օնլայն և ուսումնասիրել նոր խաղային փորձառություններ:
                    </p>

                    <p className={style.description}>
                        Մենք նաև տրամադրում ենք ժամանակակից կայքերի մշակման ծառայություններ:
                        Ունե՞ք գաղափար: Մենք կարող ենք այն վերածել արագ, գեղեցիկ
                        և լիովին ադապտիվ (responsive) կայքի:
                    </p>

                    <div className={style.cards}>
                        <div className={style.card}>
                            <div className={style.icon}>🎮</div>

                            <h3>Խաղեր</h3>

                            <p>
                                Ներբեռնեք տարբեր ժանրերի խաղեր և
                                վայելեք հիանալի խաղային փորձառություն:
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>🌐</div>

                            <h3>Օնլայն խաղեր</h3>

                            <p>
                                Խաղացեք օնլայն և կապ հաստատեք այլ խաղացողների հետ
                                ցանկացած ժամանակ, ցանկացած վայրում:
                            </p>
                        </div>

                        <div className={style.card}>
                            <div className={style.icon}>💻</div>

                            <h3>Կայքերի պատրաստում</h3>

                            <p>
                                Պատվիրեք ժամանակակից, ադապտիվ և գեղեցիկ
                                կայք՝ ստեղծված ձեր գաղափարի շուրջ:
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;