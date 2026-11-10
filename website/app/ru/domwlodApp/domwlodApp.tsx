
"use client";

import { FC, useMemo, useState } from "react";
import style from "./domwlodApp.module.css";

type AppItem = {
  name: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  url: string;
  featured?: boolean;
};

const apps: AppItem[] = [
  {
    name: "Minecraft",
    category: "Приключения",
    description: "Создай собственный мир. Твори без ограничений.",
    image: "https://images.openai.com/static-rsc-4/Y2raNPtNn6xemFEwlGoVT8LDals-x4tymhiz7oP1vPzuD61BTiM0wdCphE5XhT6_3HRkbb2MLMC1G6tsRfiRkgGs8IvGcwmgvuCnPGI-hGPouw_q5jTytkOEKhKSyGlWiZJVyllz1IhUrJ4fhXLplKL4CBqAqZExV6QpS3u9Z9SQ0wSG571Ix-QoG8tyK8ey?purpose=fullsize",
    logo: "https://thumbs.dreamstime.com/b/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.jpg",
    url: "https://www.minecraft.net/download",
    featured: true,
  },
  {
    name: "Roblox",
    category: "Мультиплеер",
    description: "Открой миллионы удивительных игровых миров.",
    image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=900",
    logo: "https://cdn.simpleicons.org/roblox/000000",
    url: "https://www.roblox.com/download",
  },
  {
    name: "Fortnite",
    category: "Экшен",
    description: "Сражайся, строй и создавай собственные приключения.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900",
    logo: "https://cdn.simpleicons.org/fortnite/000000",
    url: "https://www.fortnite.com/download",
  },
  {
    name: "PUBG Mobile",
    category: "Экшен",
    description: "Борись за выживание и стань настоящим чемпионом.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900",
    logo: "https://cdn.simpleicons.org/pubg/000000",
    url: "https://www.pubgmobile.com/",
  },
  {
    name: "GTA V",
    category: "Открытый мир",
    description: "Исследуй огромный мир, полный возможностей.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    logo: "https://cdn.simpleicons.org/rockstargames/000000",
    url: "https://www.rockstargames.com/gta-v",
  },
  {
    name: "Among Us",
    category: "Мультиплеер",
    description: "Найди предателя и спаси свою команду.",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900",
    logo: "https://img.utdstc.com/icon/015/d1c/015d1cecf14c3ef529e92d788304fe58aa571c4e3ebaf4d78d5eea44f693c844:200",
    url: "https://www.innersloth.com/games/among-us/",
  },
  {
    name: "Free Fire",
    category: "Экшен",
    description: "Погрузись в захватывающие битвы на выживание.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900",
    logo: "data:image/jpeg;base64,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",
    url: "https://ff.garena.com/",
  },
  {
    name: "Clash of Clans",
    category: "Стратегия",
    description: "Построй свою деревню и возглавь собственный клан.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900",
    logo: "https://cdn.simpleicons.org/supercell/000000",
    url: "https://supercell.com/en/games/clashofclans/",
  },
];

const categories = [
  "Все приложения",
  "Экшен",
  "Приключения",
  "Мультиплеер",
  "Стратегия",
  "Открытый мир",
];

const DomwlodApp: FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все приложения");

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        `${app.name} ${app.category} ${app.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

      const matchesCategory =
        activeCategory === "Все приложения" ||
        app.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <main className={style.page}>

      {/* HERO */}

      <section className={style.hero} id="home">
        <div className={style.heroContent}>
          <div className={style.heroBadge}>
            <span className={style.badgeDot}></span>
            ТВОЙ ЦИФРОВОЙ МИР
          </div>

          <h1 className={style.heroTitle}>
            Всё, что ты любишь.
            <span>В одном месте.</span>
          </h1>

          <p className={style.heroDescription}>
            Открывай удивительные приложения и игры.
            Находи любимые, пробуй что-то новое
            и начинай пользоваться всего за несколько секунд.
          </p>

          <div className={style.heroActions}>
            <a href="#explore" className={style.primaryButton}>
              Открыть коллекцию
              <span>↗</span>
            </a>

            <a href="#about" className={style.secondaryButton}>
              Узнать больше
            </a>
          </div>

          <div className={style.heroStats}>
            <div>
              <strong>08+</strong>
              <span>Популярных приложений</span>
            </div>

            <div className={style.statDivider}></div>

            <div>
              <strong>06</strong>
              <span>Категорий</span>
            </div>

            <div className={style.statDivider}></div>

            <div>
              <strong>100%</strong>
              <span>Простой доступ</span>
            </div>
          </div>
        </div>

        <div className={style.heroVisual}>
          <div className={style.visualCard}>
            <div className={style.visualTop}>
              <span>РЕКОМЕНДУЕМАЯ КОЛЛЕКЦИЯ</span>
              <span className={style.visualDot}>●</span>
            </div>

            <div className={style.visualImage}>
              <img
                src={apps[0].image}
                alt="Игра Minecraft"
              />

              <div className={style.visualOverlay}>
                <span>ВЫБОР РЕДАКЦИИ</span>
                <h3>Minecraft</h3>
                <p>Открой безграничные возможности.</p>
              </div>
            </div>

            <div className={style.visualBottom}>
              <div className={style.visualMiniLogo}>
                <img src={apps[0].logo} alt="Логотип Minecraft" />
              </div>

              <div>
                <strong>Minecraft</strong>
                <span>Приключенческая игра</span>
              </div>

              <span className={style.visualArrow}>↗</span>
            </div>
          </div>

          <div className={style.floatingElement}>
            <span>✦</span>
          </div>
        </div>
      </section>

      {/* EXPLORE */}

      <section className={style.explore} id="explore">
        <div className={style.sectionHeader}>
          <div>
            <span className={style.sectionEyebrow}>
              ОТКРОЙ ЧТО-ТО НОВОЕ
            </span>

            <h2 className={style.sectionTitle}>
              Исследуй коллекцию<span>.</span>
            </h2>

            <p className={style.sectionDescription}>
              Найди идеальное приложение для новых впечатлений.
            </p>
          </div>

          <div className={style.totalCount}>
            <span>{filteredApps.length.toString().padStart(2, "0")}</span>
            <small>ДОСТУПНЫХ ПРИЛОЖЕНИЙ</small>
          </div>
        </div>

        {/* SEARCH */}

        <div className={style.searchArea}>
          <div className={style.searchBox}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={style.searchIcon}
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>

            <input
              type="search"
              placeholder="Поиск приложений, игр или категорий..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Поиск приложений и игр"
            />

            {query && (
              <button
                className={style.clearSearch}
                onClick={() => setQuery("")}
                type="button"
                aria-label="Очистить поиск"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTERS */}

        <div className={style.categories}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`${style.categoryButton} ${
                activeCategory === category
                  ? style.activeCategory
                  : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* APP GRID */}

        {filteredApps.length > 0 ? (
          <div className={style.appGrid}>
            {filteredApps.map((app, index) => (
              <article
                className={style.appCard}
                key={app.name}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.imageLink}
                  aria-label={`Открыть официальный сайт ${app.name}`}
                >
                  <div className={style.appImage}>
                    <img
                      src={app.image}
                      alt={app.name}
                      loading="lazy"
                    />

                    <span className={style.appCategory}>
                      {app.category}
                    </span>

                    <span className={style.imageArrow}>↗</span>
                  </div>
                </a>

                <div className={style.appContent}>
                  <div className={style.appTop}>
                    <div className={style.appLogo}>
                      <img
                        src={app.logo}
                        alt={`Логотип ${app.name}`}
                        loading="lazy"
                      />
                    </div>

                    <div className={style.appTitle}>
                      <h3>{app.name}</h3>
                      <span>Официальный сайт</span>
                    </div>

                    {app.featured && (
                      <span className={style.featuredBadge}>
                        ТОП
                      </span>
                    )}
                  </div>

                  <p className={style.appDescription}>
                    {app.description}
                  </p>

                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.downloadButton}
                  >
                    <span>Скачать</span>
                    <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={style.emptyState}>
            <span>⌕</span>
            <h3>Ничего не найдено</h3>
            <p>
              Попробуй другой запрос или выбери другую категорию.
            </p>

            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("Все приложения");
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </section>

      {/* ABOUT */}

      <section className={style.about} id="about">
        <div className={style.aboutIcon}>✦</div>

        <div className={style.aboutContent}>
          <span>ОБ APP HUB</span>

          <h2>
            Твои любимые цифровые возможности,
            <br />
            всё в одном месте.
          </h2>

          <p>
            APP HUB делает поиск любимых приложений и игр
            простым, удобным и приятным.
          </p>
        </div>

        <a href="#home" className={style.backTop}>
          Наверх ↑
        </a>
      </section>

      {/* FOOTER */}

      <footer className={style.footer}>
        <a href="#home" className={style.footerBrand}>
          APP<span>HUB</span>
        </a>

        <p>Открывай больше. Испытывай больше.</p>

        <span>
          © {new Date().getFullYear()} APP HUB. Все права защищены.
        </span>
      </footer>

    </main>
  );
};

export default DomwlodApp;
