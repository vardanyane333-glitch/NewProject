import styles from "./page.module.css";
import SponsorFC from "./homes/componets/sponsor";
import CeckPoint from "./homes/componets/ceck-point";

export default function Home() {
  return (
    <div className={styles.page}>
      <br />
      <br />
      <SponsorFC />
      <CeckPoint />
    </div>
  );
}
 