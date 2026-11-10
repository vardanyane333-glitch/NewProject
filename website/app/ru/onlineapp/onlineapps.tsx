
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./onlineapps.module.css";

type App = {
  name: string;
  url: string;
  logo: string;
  description: string;
};

const apps: App[] = [
  {
    name: "Google",
    url: "https://www.google.com",
    logo: "https://cdn.simpleicons.org/google/4285F4",
    description: "Поиск в интернете",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
    logo: "https://cdn.simpleicons.org/youtube/FF0000",
    description: "Смотреть видео",
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org",
    logo: "https://cdn.simpleicons.org/wikipedia/000000",
    description: "Изучать новые знания",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    logo: "https://cdn.simpleicons.org/github/181717",
    description: "Изучать программирование",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com",
    logo: "https://cdn.simpleicons.org/reddit/FF4500",
    description: "Общаться в сообществах",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    logo: "https://cdn.simpleicons.org/instagram/E4405F",
    description: "Делиться фотографиями",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    logo: "https://cdn.simpleicons.org/facebook/0866FF",
    description: "Общаться с людьми",
  },
  {
    name: "X",
    url: "https://x.com",
    logo: "https://cdn.simpleicons.org/x/000000",
    description: "Следить за новостями",
  },
];

export default function OnlineApps() {
  const [query, setQuery] = useState("");

  const searchText = query.trim().toLowerCase();

  const filteredApps = apps.filter((app) => {
    return (
      app.name.toLowerCase().includes(searchText) ||
      app.description.toLowerCase().includes(searchText)
    );
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = query.trim();
    if (!text) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className={styles.page}>
      <section
        className={styles.container}
        aria-labelledby="apps-title"
      >
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            Твои любимые сайты в одном месте
          </span>

          <h1 className={styles.title} id="apps-title">
            Мои приложения
          </h1>

          <p className={styles.subtitle}>
            Найди нужное приложение или выполни поиск в интернете.
          </p>
        </header>

        <div className={styles.searchArea}>
          <form
            className={styles.searchForm}
            onSubmit={handleSearch}
          >
            <label
              className={styles.visuallyHidden}
              htmlFor="app-search"
            >
              Поиск приложений или в интернете
            </label>

            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>

            <input
              id="app-search"
              className={styles.searchInput}
              type="search"
              placeholder="Найти приложение или сайт..."
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
            />

            {query && (
              <button
                className={styles.clearButton}
                type="button"
                aria-label="Очистить поиск"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}

            <button
              className={styles.searchButton}
              type="submit"
            >
              Искать
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <p className={styles.searchHint}>
            <span>При вводе текста список приложений фильтруется</span>
            <span className={styles.keyHint}>
              Нажми Enter для поиска в интернете
            </span>
          </p>
        </div>

        {filteredApps.length > 0 ? (
          <div className={styles.appGrid}>
            {filteredApps.map((app) => (
              <a
                className={styles.appCard}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                key={app.name}
              >
                <span className={styles.logoBox}>
                  <img
                    className={styles.appLogo}
                    src={app.logo}
                    alt=""
                  />
                </span>

                <span className={styles.appName}>
                  {app.name}
                </span>

                <span className={styles.appDescription}>
                  {app.description}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>
            Приложения не найдены. Попробуй другой запрос.
          </p>
        )}

        <footer className={styles.footer}>
          <span
            className={styles.statusDot}
            aria-hidden="true"
          />
          <span>
            Нажми на приложение, чтобы открыть его официальный сайт
          </span>
        </footer>
      </section>
    </main>
  );
}
