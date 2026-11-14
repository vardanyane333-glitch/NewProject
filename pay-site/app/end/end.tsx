"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { FaChevronCircleUp } from "react-icons/fa";
import style from "./end.module.css";

type Language = "en" | "ru" | "arm";

const End: FC = () => {
  const pathname = usePathname();

  const language: Language = pathname.startsWith("/ru")
    ? "ru"
    : pathname.startsWith("/arm")
      ? "arm"
      : "en";

  const text = {
    en: {
      home: "PaySite home",
      backToTop: "Back to top",
      copyright: "All rights reserved.",
    },
    ru: {
      home: "Главная PaySite",
      backToTop: "Наверх",
      copyright: "Все права защищены.",
    },
    arm: {
      home: "PaySite-ի գլխավոր էջ",
      backToTop: "Վերև",
      copyright: "Բոլոր իրավունքները պաշտպանված են։",
    },
  }[language];

  const homeHref =
    language === "ru" ? "/ru" : language === "arm" ? "/arm" : "/";

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.top}>
          <a
            className={style.logo}
            href={homeHref}
            aria-label={text.home}
          >
            <img
              src="/logo-images/siteLogo/LO-go.jpg"
              alt="PaySite"
            />
          </a>

          <button
            className={style.backToTop}
            type="button"
            onClick={handleBackToTop}
            aria-label={text.backToTop}
          >
            <span>{text.backToTop}</span>
            <FaChevronCircleUp aria-hidden="true" />
          </button>
        </div>

        <div className={style.bottom}>
          <span className={style.copyright}>
            © 2026 GameWebsite. {text.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default End;