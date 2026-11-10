'use client'
import { FC, useState } from "react";
import style from "./domwlodGame.module.css";
import Link from "next/link";
import { FiDownload, FiCheck } from "react-icons/fi";

const DaomwlodGames: FC = () => {
  const [search, setSearch] = useState("");
  const [downloadingIds, setDownloadingIds] = useState<{ [key: string]: boolean }>({});
  const [completedIds, setCompletedIds] = useState<{ [key: string]: boolean }>({});

  const games = [
    {
      name: "Minecraft",
      logo: "https://thumbs.dreamstime.com/b/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.jpg",
    },
    {
      name: "Roblox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Roblox_Logo_2025.png",
    },
    {
      name: "Brawl Stars",
      logo: "../GamesLogos/StartsBrawleLogo.png",
    },
    {
      name: "FC Mobile",
      logo: "../GamesLogos/fcmoileLogo.jpg",
    },
    {
      name: "Need for Speed",
      logo: "../GamesLogos/Need_for_Speed_Logo.jpg",
    },
    {
      name: "Grand Theft Auto V",
      logo: "../GamesLogos/GTA_Logo.png",
    },
    {
      name: "Fortnite",
      logo: "../GamesLogos/Fortnite_Logo.png",
    },
    {
      name: "Euro Truck Simulator 2",
      logo: "../GamesLogos/Euro_Truck_Simulator2_Logo.jpg",
    },
    {
      name: "Counter-Strike 2",
      logo: "../GamesLogos/Counter_Strike2_Logo.png",
    },
    {
      name: "Call of Duty",
      logo: "../GamesLogos/Call_of_Duty.png",
    },
  ];

  const handleDownload = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    if (downloadingIds[name] || completedIds[name]) return;

    // Սկսվում է բեռնումը (1.0 վայրկյան)
    setDownloadingIds(prev => ({ ...prev, [name]: true }));

    setTimeout(() => {
      setDownloadingIds(prev => ({ ...prev, [name]: false }));
      setCompletedIds(prev => ({ ...prev, [name]: true }));

      // 3 վայրկյան հետո կոճակը վերադառնում է սկզբնական տեսքին
      setTimeout(() => {
        setCompletedIds(prev => ({ ...prev, [name]: false }));
      }, 3000);

    }, 1000);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className={style.continer}>
      <div className={style.header}>
        <h1 className={style.title}>Ներբեռնել խաղեր</h1>

        <div className={style.searchBox}>
          <svg
            className={style.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            className={style.searchInput}
            placeholder="Որոնել խաղեր..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Որոնել խաղեր"
          />

          {search && (
            <button
              type="button"
              className={style.clearButton}
              onClick={() => setSearch("")}
              aria-label="Մաքրել որոնումը"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <div className={style.grid}>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            const isDownloading = downloadingIds[game.name];
            const isCompleted = completedIds[game.name];

            return (
              <div className={style.game} key={game.name}>
                <div className={style.imageContainer}>
                  <img
                    src={game.logo}
                    alt={game.name}
                    className={style.image}
                  />
                </div>

                <h3>{game.name}</h3>

                <Link 
                  href="" 
                  onClick={(e) => handleDownload(e, game.name)}
                  className={`${style.downloadButton} ${isDownloading ? style.loading : ""} ${isCompleted ? style.completed : ""}`}
                >
                  <span className={style.btnContent}>
                    {isCompleted ? (
                      <>
                        <FiCheck className={style.btnIcon} />
                        <span>Ներբեռնված է</span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <span className={style.spinner} />
                        <span>Բեռնվում է...</span>
                      </>
                    ) : (
                      <>
                        <FiDownload className={style.btnIcon} />
                        <span>Ներբեռնել խաղը</span>
                      </>
                    )}
                  </span>
                </Link>
              </div>
            );
          })
        ) : (
          <p className={style.noResults}>
            Խաղեր չեն գտնվել "{search}" հարցումով
          </p>
        )}
      </div>
    </div>
  );
};

export default DaomwlodGames;