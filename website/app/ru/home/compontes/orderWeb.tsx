
import { FC } from "react";
import Link from "next/link";
import style from "../style/orderWeb.module.css";

const OrderWeb: FC = () => {
    const title = "Как заказать сайт?";

    return (
        <main className={style.container}>

            {/* MAIN ANIMATED TITLE */}

            <h1 className={style.mainTitle}>
                {title.split("").map((letter, index) => (
                    <span
                        key={index}
                        style={{
                            animationDelay: `${index * 0.08}s`,
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </h1>

            {/* ORDER INFORMATION */}

            <section className={style.card}>
                <div className={style.top}>
                    <span className={style.badge}>
                        ВЕБ-УСЛУГИ
                    </span>

                    <h1>Заказать сайт</h1>

                    <p>
                        Давайте превратим вашу идею в современный,
                        красивый и профессиональный сайт.
                    </p>
                </div>

                <div className={style.conditions}>
                    <h2>Как это работает?</h2>

                    <div className={style.conditionItem}>
                        <span className={style.number}>
                            01
                        </span>

                        <div>
                            <h3>Свяжитесь с нами</h3>

                            <p>
                                Перейдите на страницу{" "}
                                <Link
                                    className={style.link}
                                    href="/chat"
                                >
                                    webChat
                                </Link>{" "}
                                и отправьте нам свою идею.
                            </p>
                        </div>
                    </div>

                    <div className={style.conditionItem}>
                        <span className={style.number}>
                            02
                        </span>

                        <div>
                            <h3>Дождитесь подтверждения</h3>

                            <p>
                                Свяжитесь с{" "}
                                <strong>AdminCreator</strong>{" "}
                                и ожидайте ответа в течение{" "}
                                <strong>4–6 рабочих дней</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}

            <section className={style.card_two}>
                <div className={style.priceHeader}>
                    <span className={style.badge}>
                        ЦЕНЫ
                    </span>

                    <h2>Выберите свой сайт</h2>

                    <p>
                        Простые цены для проектов любого типа.
                    </p>
                </div>

                <div className={style.priceGrid}>

                    <PriceCard
                        icon="🌱"
                        label="СТАРТ"
                        title="Небольшой сайт"
                        price="50"
                        description="Идеально подходит для простых сайтов, лендингов и личных проектов."
                        features={[
                            "Адаптивный дизайн",
                            "Современный интерфейс",
                            "До 3 страниц",
                            "Базовые анимации",
                        ]}
                    />

                    <PriceCard
                        icon="💎"
                        label="ПРЕМИУМ"
                        title="Большой сайт"
                        price="150"
                        description="Для больших, сложных и функциональных проектов."
                        features={[
                            "10+ страниц",
                            "Премиум-дизайн",
                            "Продвинутые анимации",
                            "Индивидуальные функции",
                            "Интеграция базы данных",
                        ]}
                        popular
                    />

                    <PriceCard
                        icon="🚀"
                        label="ПРОФЕССИОНАЛЬНЫЙ"
                        title="Средний сайт"
                        price="100"
                        description="Отлично подходит для бизнеса, портфолио и развивающихся проектов."
                        features={[
                            "Адаптивный дизайн",
                            "Продвинутый интерфейс",
                            "До 7 страниц",
                            "Индивидуальные анимации",
                            "Контактные формы",
                        ]}
                    />

                </div>
            </section>
        </main>
    );
};

/* PRICE CARD COMPONENT */

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
        <div
            className={`${style.priceCard} ${
                popular ? style.popular : ""
            }`}
        >
            {popular && (
                <span className={style.popularBadge}>
                    ПОПУЛЯРНЫЙ
                </span>
            )}

            <div className={style.priceIcon}>
                {icon}
            </div>

            <span className={style.planLabel}>
                {label}
            </span>

            <h3>{title}</h3>

            <div className={style.price}>
                <span>$</span>
                {price}
            </div>

            <p className={style.priceText}>
                {description}
            </p>

            <div className={style.features}>
                {features.map((feature) => (
                    <span key={feature}>
                        ✓ {feature}
                    </span>
                ))}
            </div>

            <Link
                href="/chat"
                className={style.orderButton}
            >
                Заказать
                <span>→</span>
            </Link>
        </div>
    );
};

export default OrderWeb;
