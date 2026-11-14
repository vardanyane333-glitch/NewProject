"use client";

import { FC, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import style from "./menu.module.css";

type LanguageCode = "eng" | "ru" | "arm";

type Language = {
  code: LanguageCode;
  name: string;
  prefix: string;
  flag: string;
};

type Translations = {
  nav: {
    login: string;
    signup: string;
    ariaMenu: string;
    ariaCloseMenu: string;
    ariaLanguage: string;
  };
  page: {
    home: string;
  };
};

const languages: Language[] = [
  {
    code: "eng",
    name: "English",
    prefix: "",
    flag:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
  },
  {
    code: "ru",
    name: "Русский",
    prefix: "/ru",
    flag: "https://flagcdn.com/w80/ru.png",
  },
  {
    code: "arm",
    name: "Հայերեն",
    prefix: "/arm",
    flag: "https://flagcdn.com/w80/am.png",
  },
];

const translations: Record<LanguageCode, Translations> = {
  eng: {
    nav: {
      login: "Log in",
      signup: "Sign up",
      ariaMenu: "Open menu",
      ariaCloseMenu: "Close menu",
      ariaLanguage: "Select language",
    },
    page: {
      home: "Home",
    },
  },
  ru: {
    nav: {
      login: "Войти",
      signup: "Регистрация",
      ariaMenu: "Открыть меню",
      ariaCloseMenu: "Закрыть меню",
      ariaLanguage: "Выбрать язык",
    },
    page: {
      home: "Главная",
    },
  },
  arm: {
    nav: {
      login: "Մուտք",
      signup: "Գրանցվել",
      ariaMenu: "Բացել ընտրացանկը",
      ariaCloseMenu: "Փակել ընտրացանկը",
      ariaLanguage: "Ընտրել լեզուն",
    },
    page: {
      home: "Գլխավոր",
    },
  },
};

const getLanguageIndex = (pathname: string): number => {
  if (/^\/ru(\/|$)/.test(pathname)) return 1;
  if (/^\/arm(\/|$)/.test(pathname)) return 2;
  return 0;
};

const removeLanguagePrefix = (pathname: string): string => {
  const path = pathname.replace(/^\/(ru|arm)(?=\/|$)/, "");
  return path || "/";
};

const getLocalizedPath = (prefix: string, path: string): string => {
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
};

const MenuNavigtonits: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>("eng");

  useEffect(() => {
    const langIndex = getLanguageIndex(window.location.pathname);
    setSelectedLanguage(languages[langIndex].code);
  }, []);

  const currentLang = languages.find(
    (language) => language.code === selectedLanguage
  )!;

  const currentText = translations[selectedLanguage];

  const changeLanguage = (langCode: LanguageCode) => {
    const targetLanguage = languages.find(
      (language) => language.code === langCode
    )!;

    const currentPath = removeLanguagePrefix(window.location.pathname);
    const destination = getLocalizedPath(targetLanguage.prefix, currentPath);

    setSelectedLanguage(langCode);
    setLanguageOpen(false);
    setMenuOpen(false);

    window.location.assign(
      `${destination}${window.location.search}${window.location.hash}`
    );
  };

  const localizedHref = (path: string) =>
    getLocalizedPath(currentLang.prefix, path);

  return (
    <header className={style.container}>
      <a
        className={style.logo}
        href={localizedHref("/")}
        aria-label={currentText.page.home}
      >
        <img src="/logo-images/siteLogo/LO-go.jpg" alt="PaySite" />
      </a>

      <button
        className={style.menuButton}
        type="button"
        aria-label={
          menuOpen
            ? currentText.nav.ariaCloseMenu
            : currentText.nav.ariaMenu
        }
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((previous) => !previous)}
      >
        <IoMenu
          aria-hidden="true"
          className={`${style.menuIcon} ${
            menuOpen ? style.menuIconHidden : style.menuIconVisible
          }`}
        />

        <IoClose
          aria-hidden="true"
          className={`${style.menuIcon} ${
            menuOpen ? style.menuIconVisible : style.menuIconHidden
          }`}
        />
      </button>

      <nav
        className={`${style.actions} ${menuOpen ? style.actionsOpen : ""}`}
        aria-label="Main navigation"
      >
        <div className={style.languageWrap}>
          <button
            className={style.languageButton}
            type="button"
            aria-label={currentText.nav.ariaLanguage}
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((previous) => !previous)}
          >
            <img src={currentLang.flag} alt="" className={style.flag} />
            <FaAngleDown
              aria-hidden="true"
              className={`${style.arrow} ${
                languageOpen ? style.arrowOpen : ""
              }`}
            />
          </button>

          {languageOpen && (
            <div className={style.languageDropdown}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className={`${style.languageOption} ${
                    selectedLanguage === language.code
                      ? style.languageOptionActive
                      : ""
                  }`}
                  aria-current={
                    selectedLanguage === language.code ? "true" : undefined
                  }
                  onClick={() => changeLanguage(language.code)}
                >
                  <img src={language.flag} alt="" className={style.flag} />
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <a className={style.login} href={localizedHref("/accaunt/login")}>
          {currentText.nav.login}
        </a>

        <a className={style.signup} href={localizedHref("/accaunt/register")}>
          {currentText.nav.signup}
        </a>
      </nav>
    </header>
  );
};

export default MenuNavigtonits;