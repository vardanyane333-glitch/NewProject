'use client'

import { FC, useState } from "react";
import styles from "./conshtion.module.css";
import { IoMdClose } from "react-icons/io";


const Constion: FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    function onClose() {
        setIsOpen(!isOpen)
    }

  return (
    <div className={`${styles.overlay} ${isOpen&&styles.close}`}>
      <div className={styles.container} role="dialog" aria-modal="true">
        <div className={styles.top}>
          <h3 className={styles.title}>GameWebsite</h3>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <div className={styles.center}>
          <h2 className={styles.heading}>
            <span className={styles.primaryText}>Please Login Or Register</span>
            <span className={styles.secondaryText}>and continue</span>
          </h2>
        </div>

        <div className={styles.bottom}>
          {/* OK կոճակը նույնպես կանչում է onClose, որպեսզի փակվի */}
          <button className={styles.actionBtn} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Constion;