
"use client";

import styles from "./page.module.css";

export default function News() {
  return (
    <main className={styles.container}>
      <div className={styles.glow}></div>

      <section className={styles.card}>
        <span className={styles.badge}>
          <span className={styles.dot}></span>
          ՇՈՒՏՈՎ
        </span>

        <h1>
          Նորը
          <br />
          <span>շուտով կգա։</span>
        </h1>

        <p className={styles.description}>
          Մենք աշխատում ենք մի յուրահատուկ բանի վրա։
          <br />
          Հետևե՛ք մեզ՝ նորություններին ծանոթանալու համար։
        </p>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <span className={styles.label}>
            ՍՊԱՍՎՈՂ ԹՈՂԱՐԿՈՒՄ
          </span>

          <span className={styles.year}>
            2027 — 2028
          </span>
        </div>
      </section>

      <p className={styles.bottomText}>
        ԼԱՎ ԲԱՆԵՐԸ ԺԱՄԱՆԱԿ ԵՆ ՊԱՀԱՆՋՈՒՄ
      </p>
    </main>
  );
}
