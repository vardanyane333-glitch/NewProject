"use client";

import { FC, useEffect, useState } from "react";
import style from "../style/sponsor.module.css";

const sponsorText = "Մեզ հովանավորում է ";

const SponsorFC: FC = () => {
  const [visibleText, setVisibleText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(sponsorText.slice(0, index));

      if (index >= sponsorText.length) {
        window.clearInterval(timer);
        setIsFinished(true);
      }
    }, 75);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={style.continer}>
      <div className={style.cenetrB}>
        <p
          className={style.sponsorText}
          aria-label="Մեզ հովանավորում է GameWebsite-ը"
        >
          <span aria-hidden="true">{visibleText}</span>

          {isFinished && (
            <a
              className={style.sponsorLink}
              href="http://localhost:3000/"
              target="_blank"
              rel="noreferrer"
            >
              GameWebsite
            </a>
          )}

          <span className={style.cursor} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
};

export default SponsorFC;