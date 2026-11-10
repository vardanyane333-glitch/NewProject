import { FC, useState } from "react";
import style from "../style/gamesDomw.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiCheck } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";

interface GameItem {
  id: string;
  title: string;
  imgSrc: string;
}

const games: GameItem[] = [
  {
    id: "1",
    title: "Minecraft",
    imgSrc: "https://thumbs.dreamstime.com/b/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.jpg",
  },
  {
    id: "2",
    title: "Roblox",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Roblox_Logo_2025.png",
  },
  {
    id: "3",
    title: "Brawl Stars",
    imgSrc: "/GamesLogos/StartsBrawleLogo.png", 
  },
  {
    id: "4",
    title: "FC Mobile",
    imgSrc: "/GamesLogos/fcmoileLogo.jpg", 
  },
];

const DomGame: FC = () => {
  const [downloadingIds, setDownloadingIds] = useState<{ [key: string]: boolean }>({});
  const [completedIds, setCompletedIds] = useState<{ [key: string]: boolean }>({});

  const handleDownload = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (downloadingIds[id] || completedIds[id]) return;

    // 1. Սկսվում է բեռնումը (1.0 վայրկյան տևողությամբ)
    setDownloadingIds(prev => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setDownloadingIds(prev => ({ ...prev, [id]: false }));
      setCompletedIds(prev => ({ ...prev, [id]: true }));

      // 2. Մի քանի վայրկյան հետո (օրինակ՝ 3 վայրկյան անց) կոճակը հետ է վերադառնում սկզբնական տեսքին
      setTimeout(() => {
        setCompletedIds(prev => ({ ...prev, [id]: false }));
      }, 3000); // Այստեղ կարող եք փոխել վայրկյանը (3000ms = 3 վայրկյան)

    }, 1000); // Ներբեռնման անիմացիայի տևողությունը (1.0 վրկ)
  };

  return (
    <div className={style.container}>
      <div className={style.top}>
        <h3>Download Games</h3>
        <Link href="/domwlodGame" className={style.topMoreLink}>
          <span>Explore All</span> 
          <div className={style.arrowWrapper}>
            <HiArrowRight className={style.arrowIcon} />
          </div>
        </Link>
      </div>
      
      <div className={style.newDownloads}>
        {games.map((game) => {
          const isDownloading = downloadingIds[game.id];
          const isCompleted = completedIds[game.id];

          return (
            <div key={game.id} className={style.gameCard}>
              <div className={style.imgWrapper}>
                <Image
                  src={game.imgSrc}
                  alt={game.title}
                  width={110}
                  height={110}
                  className={style.img}
                  unoptimized
                />
              </div>
              <h2 className={style.gameTitle}>{game.title}</h2>
              
              <button 
                onClick={(e) => handleDownload(e, game.id)} 
                className={`${style.downloadBtn} ${isDownloading ? style.loading : ""} ${isCompleted ? style.completed : ""}`}
              >
                <span className={style.btnContent}>
                  {isCompleted ? (
                    <>
                      <FiCheck className={style.btnIcon} />
                      <span>Downloaded</span>
                    </>
                  ) : isDownloading ? (
                    <>
                      <span className={style.spinner} />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <FiDownload className={style.btnIcon} />
                      <span>Download Game</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DomGame;