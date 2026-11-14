"use client";

import { FC, useState } from "react";
import style from "../style/ceck-point.module.css";

type CeckPointProps = {
  isAuthenticated: boolean;
  onBuy: (checkpoint: number) => void | Promise<void>;
};

type CheckpointItem = {
  id: number;
  checkpoint: number;
  resistance: number;
};

const checkpointImage = "/Cp_dM/Cp/Cp_CheckPoint.jpg";
const resistanceImage = "/Cp_dM/dm/Dimoad_dm.jpg";

const checkpoints: CheckpointItem[] = Array.from(
  { length: 10 },
  (_, index) => {
    const checkpoint = (index + 1) * 10;

    return {
      id: checkpoint,
      checkpoint,
      resistance: checkpoint * 4.5,
    };
  }
);

const CeckPoint: FC<CeckPointProps> = ({
  isAuthenticated,
  onBuy,
}) => {
  const [buyingId, setBuyingId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);

  const handleBuy = async (checkpoint: number) => {
    if (!isAuthenticated || buyingId !== null) {
      return;
    }

    setBuyingId(checkpoint);
    setErrorId(null);

    try {
      await onBuy(checkpoint);
    } catch {
      setErrorId(checkpoint);
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <section
      className={style.section}
      aria-labelledby="checkpoint-title"
    >
      <header className={style.header}>
        <span className={style.eyebrow}>GUIDE</span>

        <h2
          id="checkpoint-title"
          className={style.title}
        >
          Checkpoint Guide
        </h2>

        <p className={style.description}>
          Find the resistance value for each checkpoint.
        </p>
      </header>

      <div className={style.grid}>
        {checkpoints.map((item) => {
          const tooltipId = `buy-tooltip-${item.id}`;
          const errorMessageId = `buy-error-${item.id}`;
          const isBuying = buyingId === item.checkpoint;
          const hasError = errorId === item.checkpoint;

          return (
            <article
              className={style.card}
              key={item.id}
            >
              <div className={style.cardHeader}>
                <span className={style.cardLabel}>
                  CHECKPOINT
                </span>

                <span className={style.cardNumber}>
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>

              <div className={style.values}>
                <figure className={style.value}>
                  <div className={style.imageFrame}>
                    <img
                      className={style.checkpointImage}
                      src={checkpointImage}
                      alt="Checkpoint"
                      loading="lazy"
                    />
                  </div>

                  <figcaption className={style.valueCaption}>
                    <span className={style.valueLabel}>
                      Checkpoint
                    </span>

                    <strong className={style.valueNumber}>
                      {item.checkpoint}
                    </strong>
                  </figcaption>
                </figure>

                <span
                  className={style.arrow}
                  aria-hidden="true"
                >
                  →
                </span>

                <figure className={style.value}>
                  <div className={style.imageFrame}>
                    <img
                      className={style.resistanceImage}
                      src={resistanceImage}
                      alt="Resistance"
                      loading="lazy"
                    />
                  </div>

                  <figcaption className={style.valueCaption}>
                    <span className={style.valueLabel}>
                      Resistance
                    </span>

                    <strong className={style.valueNumber}>
                      {item.resistance}
                    </strong>
                  </figcaption>
                </figure>
              </div>

              <div className={style.buyButtonWrap}>
                {!isAuthenticated && (
                  <span
                    id={tooltipId}
                    className={style.buyTooltip}
                    role="tooltip"
                  >
                    Log in to buy
                  </span>
                )}

                <button
                  className={style.buyButton}
                  type="button"
                  onClick={() => void handleBuy(item.checkpoint)}
                  aria-describedby={
                    !isAuthenticated ? tooltipId : undefined
                  }
                  aria-label={
                    isAuthenticated
                      ? `Buy checkpoint ${item.checkpoint}`
                      : `Log in to buy checkpoint ${item.checkpoint}`
                  }
                  aria-busy={isBuying}
                  disabled={isBuying || !isAuthenticated}
                >
                  {isBuying ? "Buying..." : "Buy"}
                </button>
              </div>

              {hasError && (
                <p
                  id={errorMessageId}
                  className={style.errorMessage}
                  role="alert"
                >
                  Purchase could not be started. Please try again.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CeckPoint;