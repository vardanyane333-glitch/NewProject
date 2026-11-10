"use client";

import styles from "./page.module.css";
import End from "./end/end";
import DomGAme from "./home/componts/gamesDomw";
import OrderWeb from "./home/componts/orderWeb";

export default function Home() {;

  return (
    <div className={styles.page}>
      <br />
      <br />
      <br />
      <DomGAme />
      <OrderWeb />
      <End />
    </div>
  );
}
