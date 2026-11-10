
"use client";
import styles from "./page.module.css";

export default function News() {
  return (
    <main className={styles.container}>
      <div className={styles.glow}></div>

      <section className={styles.card}>
        <span className={styles.badge}>
          <span className={styles.dot}></span>
          COMING SOON
        </span>

        <h1>
          Something
          <br />
          <span>New Is Coming.</span>
        </h1>

        <p className={styles.description}>
          We’re working on something special.
          <br />
          Stay tuned for the next chapter.
        </p>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <span className={styles.label}>EXPECTED RELEASE</span>
          <span className={styles.year}>2027 — 2028</span>
        </div>
      </section>

      <p className={styles.bottomText}>
        GOOD THINGS TAKE TIME
      </p>
    </main>
  );
}
