"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const translations = {
  en: {
    code: "404",
    title: "Page not found",
    description: "Sorry, we couldn't find the page you're looking for.",
    button: "Back to home",
  },
  ru: {
    code: "404",
    title: "Страница не найдена",
    description: "К сожалению, мы не нашли страницу, которую вы ищете.",
    button: "На главную",
  },
  arm: {
    code: "404",
    title: "Էջը չի գտնվել",
    description: "Ներողություն, ձեր փնտրած էջը չգտնվեց։",
    button: "Գլխավոր էջ",
  },
};

export default function NotFound() {
  const pathname = usePathname();

  const language =
    pathname === "/ru" || pathname.startsWith("/ru/")
      ? "ru"
      : pathname === "/arm" || pathname.startsWith("/arm/")
        ? "arm"
        : "en";

  const text = translations[language];
  const homeHref = language === "ru" ? "/ru" : language === "arm" ? "/arm" : "/";

  return (
    <main
      style={{
        boxSizing: "border-box",
        display: "grid",
        minHeight: "100vh",
        padding: "24px",
        placeItems: "center",
        background: "#1a1440",
        color: "#f2efff",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
      }}
    >
      <section
        aria-labelledby="not-found-title"
        style={{
          width: "min(100%, 560px)",
          padding: "clamp(28px, 7vw, 56px)",
          border: "1px solid rgba(170, 152, 255, 0.2)",
          borderRadius: "24px",
          background: "linear-gradient(145deg, #29234f, #211b45)",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p
          aria-hidden="true"
          style={{
            margin: "0 0 12px",
            color: "#aa98ff",
            fontSize: "clamp(4rem, 18vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {text.code}
        </p>

        <h1
          id="not-found-title"
          style={{
            margin: "0",
            fontSize: "clamp(1.7rem, 6vw, 2.4rem)",
            lineHeight: 1.2,
          }}
        >
          {text.title}
        </h1>

        <p
          style={{
            margin: "16px 0 28px",
            color: "#bdb4e6",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          {text.description}
        </p>

        <Link
          href={homeHref}
          style={{
            display: "inline-flex",
            minHeight: "46px",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 20px",
            borderRadius: "12px",
            background: "#8d78ff",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {text.button}
        </Link>
      </section>
    </main>
  );
}