import { FC } from "react";
import Link from "next/link";
import style from "../style/orderWeb.module.css";

const OrderWeb: FC = () => {
    return (
        <main className={style.container}>

          
           <h1 className={style.mainTitle}>
    {"How to order a website?".split("").map((letter, index) => (
        <span
            key={index}
            style={{ animationDelay: `${index * 0.15}s`}}
        >
            {letter === " " ? "\u00A0" : letter}
        </span>
    ))}
</h1>

            <section className={style.card}>
                <div className={style.top}>
                    <span className={style.badge}>
                        WEB SERVICE
                    </span>

                    <h1>Order a Website</h1>

                    <p>
                        Let’s turn your idea into a modern,
                        beautiful and professional website.
                    </p>
                </div>

                <div className={style.conditions}>
                    <h2>How It Works</h2>

                    <div className={style.conditionItem}>
                        <span className={style.number}>01</span>

                        <div>
                            <h3>Contact us</h3>
                            <p>
                                Go to the{" "}
                                <Link className={style.link} href="/chat">
                                    webChat
                                </Link>{" "}
                                page and send us your idea.
                            </p>
                        </div>
                    </div>

                    <div className={style.conditionItem}>
                        <span className={style.number}>02</span>

                        <div>
                            <h3>Wait for confirmation</h3>
                            <p>
                                Contact <strong>AdminCreator</strong>{" "}
                                and wait for a response within{" "}
                                <strong>4–6 working days</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.card_two}>
                <div className={style.priceHeader}>
                    <span className={style.badge}>PRICING</span>

                    <h2>Choose Your Website</h2>

                    <p>
                        Simple pricing for every type of project.
                    </p>
                </div>

                <div className={style.priceGrid}>
                    <PriceCard
                        icon="🌱"
                        label="STARTER"
                        title="Small Website"
                        price="50"
                        description="Perfect for simple websites, landing pages and personal projects."
                        features={[
                            "Responsive design",
                            "Modern UI",
                            "Up to 3 pages",
                            "Basic animations",
                        ]}
                    />

                    <PriceCard
                        icon="💎"
                        label="PREMIUM"
                        title="Big Website"
                        price="150"
                        description="For large, complex and feature-rich projects."
                        features={[
                            "10+ pages",
                            "Premium UI",
                            "Advanced animations",
                            "Custom features",
                            "Database integration",
                        ]}
                        popular
                    />

                    <PriceCard
                        icon="🚀"
                        label="PROFESSIONAL"
                        title="Average Website"
                        price="100"
                        description="Great for businesses, portfolios and growing projects."
                        features={[
                            "Responsive design",
                            "Advanced UI",
                            "Up to 7 pages",
                            "Custom animations",
                            "Contact forms",
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
                    MOST POPULAR
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
                Order Now <span>→</span>
            </Link>
        </div>
    );
};

export default OrderWeb;