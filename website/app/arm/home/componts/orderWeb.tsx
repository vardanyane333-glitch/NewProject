
import { FC } from "react";
import Link from "next/link";
import style from "../style/orderWeb.module.css";

const OrderWeb: FC = () => {
    return (
        <main className={style.container}>

            <h1 className={style.mainTitle}>
                {"Ինչպե՞ս պատվիրել կայք։".split("").map((letter, index) => (
                    <span
                        key={index}
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </h1>

            <section className={style.card}>
                <div className={style.top}>
                    <span className={style.badge}>
                        ՎԵԲ ԾԱՌԱՅՈՒԹՅՈՒՆ
                    </span>

                    <h1>Պատվիրիր կայք</h1>

                    <p>
                        Եկեք միասին ձեր գաղափարը վերածենք
                        ժամանակակից, գեղեցիկ և պրոֆեսիոնալ կայքի։
                    </p>
                </div>

                <div className={style.conditions}>
                    <h2>Ինչպե՞ս է աշխատում</h2>

                    <div className={style.conditionItem}>
                        <span className={style.number}>01</span>

                        <div>
                            <h3>Կապ հաստատիր մեզ հետ</h3>
                            <p>
                                Անցիր{" "}
                                <Link className={style.link} href="/chat">
                                    webChat
                                </Link>{" "}
                                էջ և ուղարկիր մեզ քո գաղափարը։
                            </p>
                        </div>
                    </div>

                    <div className={style.conditionItem}>
                        <span className={style.number}>02</span>

                        <div>
                            <h3>Սպասիր հաստատման</h3>
                            <p>
                                Կապ հաստատիր{" "}
                                <strong>AdminCreator</strong>-ի հետ
                                և սպասիր պատասխանի՝{" "}
                                <strong>4–6 աշխատանքային օրվա</strong> ընթացքում։
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.card_two}>
                <div className={style.priceHeader}>
                    <span className={style.badge}>
                        ԳՆԱՑՈՒՑԱԿ
                    </span>

                    <h2>Ընտրիր քո կայքի տարբերակը</h2>

                    <p>
                        Մատչելի գներ՝ յուրաքանչյուր տեսակի նախագծի համար։
                    </p>
                </div>

                <div className={style.priceGrid}>
                    <PriceCard
                        icon="🌱"
                        label="ՍԿՍՆԱԿ"
                        title="Փոքր կայք"
                        price="50"
                        description="Հիանալի տարբերակ պարզ կայքերի, գովազդային էջերի և անձնական նախագծերի համար։"
                        features={[
                            "Հարմարեցում բոլոր սարքերին",
                            "Ժամանակակից դիզայն",
                            "Մինչև 3 էջ",
                            "Հիմնական անիմացիաներ",
                        ]}
                    />

                    <PriceCard
                        icon="💎"
                        label="ՊՐԵՄԻՈՒՄ"
                        title="Մեծ կայք"
                        price="150"
                        description="Մեծ, բարդ և բազմաթիվ հնարավորություններով նախագծերի համար։"
                        features={[
                            "10 և ավելի էջ",
                            "Պրեմիում դիզայն",
                            "Բարդ անիմացիաներ",
                            "Անհատական ֆունկցիաներ",
                            "Տվյալների բազայի միացում",
                        ]}
                        popular
                    />

                    <PriceCard
                        icon="🚀"
                        label="ՊՐՈՖԵՍԻՈՆԱԼ"
                        title="Միջին կայք"
                        price="100"
                        description="Հիանալի է բիզնեսների, պորտֆոլիոների և զարգացող նախագծերի համար։"
                        features={[
                            "Հարմարեցում բոլոր սարքերին",
                            "Ընդլայնված դիզայն",
                            "Մինչև 7 էջ",
                            "Անհատական անիմացիաներ",
                            "Հետադարձ կապի ձևեր",
                        ]}
                    />
                </div>
            </section>
        </main>
    );
};

type PriceCardProps = {
    icon: string;
    label: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
};

const PriceCard: FC<PriceCardProps> = ({
    icon,
    label,
    title,
    price,
    description,
    features,
    popular,
}) => {
    return (
        <div className={`${style.priceCard} ${popular ? style.popular : ""}`}>
            {popular && (
                <span className={style.popularBadge}>
                    ԱՄԵՆԱՊԱՀԱՆՋՎԱԾԸ
                </span>
            )}

            <div className={style.priceIcon}>{icon}</div>

            <span className={style.planLabel}>{label}</span>

            <h3>{title}</h3>

            <div className={style.price}>
                <span>$</span>{price}
            </div>

            <p className={style.priceText}>{description}</p>

            <div className={style.features}>
                {features.map((feature) => (
                    <span key={feature}>✓ {feature}</span>
                ))}
            </div>

            <Link href="/chat" className={style.orderButton}>
                Պատվիրել <span>→</span>
            </Link>
        </div>
    );
};

export default OrderWeb;
