
"use client";

import styles from "./page.module.css";

export default function News() {
  return (
    <main className={styles.container}>
      <div className={styles.glow}></div>

      <section className={styles.card}>
        <span className={styles.badge}>
          <span className={styles.dot}></span>
          СКОРО
        </span>

        <h1>
          Нечто новое
          <br />
          <span>уже на подходе.</span>
        </h1>

        <p className={styles.description}>
          Мы работаем над чем-то особенным.
          <br />
          Следите за обновлениями!
        </p>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <span className={styles.label}>
            ОЖИДАЕМЫЙ ЗАПУСК
          </span>

          <span className={styles.year}>
            2027 — 2028
          </span>
        </div>
      </section>

      <p className={styles.bottomText}>
        ХОРОШЕЕ ТРЕБУЕТ ВРЕМЕНИ
      </p>
    </main>
  );
}
