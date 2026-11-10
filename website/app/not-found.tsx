"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  const locale = pathname?.split("/")[1];
  const lang = locale === "arm" ? "arm" : locale === "ru" ? "ru" : "en";

  const content = {
    arm: {
      title: "Էջը չի գտնվել",
      description: "Կարծես այս էջը գոյություն չունի կամ տեղափոխվել է։",
      button: "Վերադառնալ գլխավոր էջ",
      label: "ՍԽԱԼ 404",
      back: "Ոչինչ, եկեք վերադառնանք։",
    },
    ru: {
      title: "Страница не найдена",
      description: "Похоже, эта страница не существует или была перемещена.",
      button: "На главную",
      label: "ОШИБКА 404",
      back: "Ничего страшного, вернёмся назад.",
    },
    en: {
      title: "Page not found",
      description: "Looks like this page doesn't exist or has been moved.",
      button: "Go to homepage",
      label: "ERROR 404",
      back: "No worries, let's get you back.",
    },
  };

  const t = content[lang];
  const home = lang === "arm" ? "/arm" : lang === "ru" ? "/ru" : "/";

  return (
    
    <main className="error-page">
      <div className="error-card">
        <div className="error-top">
          <Link href={home} className="error-logo">
            <span className="logo-dot" />
            GameWebSite
          </Link>

          <span className="error-label">{t.label}</span>
        </div>

        <div className="error-content">
          <div className="error-visual" aria-hidden="true">
            <span className="error-number">4</span>

            <div className="error-icon">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 39C37 25 63 25 78 39"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M31 50C42 40 58 40 69 50"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M41 61C46 56 54 56 59 61"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="72" r="3.5" fill="currentColor" />
                <path
                  d="M25 24L75 76"
                  stroke="#7DE51B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="error-number">4</span>
            <span className="error-orbit orbit-one" />
            <span className="error-orbit orbit-two" />
          </div>

          <span className="error-small">{t.back}</span>

          <h1>{t.title}</h1>

          <p className="error-description">{t.description}</p>

          <Link href={home} className="error-button">
            <span>{t.button}</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12H19M12 5L19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="error-bottom">
          <span>GameWebSite®</span>
          <span>LOST IN SPACE? NOT FOR LONG.</span>
        </div>
      </div>
    </main>
  );
}
