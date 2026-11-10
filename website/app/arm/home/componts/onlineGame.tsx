"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import style from "../style/onlineGame.module.css";

type Point = {
    x: number;
    y: number;
};

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;
const GAME_SPEED = 120;

const INITIAL_SNAKE: Point[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
];

const OPPOSITE: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
};

// Խաղի բոլոր տեքստերի թարգմանությունները
const translations = {
    Eng: {
        gameTitle: "Online Game | Snake",
        back: "Back",
        title: "Snake",
        badge: "ONLINE GAME",
        playing: "PLAYING",
        gameOver: "GAME OVER",
        ready: "READY",
        score: "SCORE",
        readyToPlay: "Ready to play?",
        play: "Play",
        youWon: "You won!",
        gameOverText: "Game Over",
        restart: "Play Again",
        controls: "Use arrow keys or WASD",
    },
    Rus: {
        gameTitle: "Онлайн-игра | Змейка",
        back: "Назад",
        title: "Змейка",
        badge: "ОНЛАЙН-ИГРА",
        playing: "ИГРА ИДЁТ",
        gameOver: "ИГРА ОКОНЧЕНА",
        ready: "ГОТОВО",
        score: "СЧЁТ",
        readyToPlay: "Готовы играть?",
        play: "Играть",
        youWon: "Вы победили!",
        gameOverText: "Игра окончена",
        restart: "Начать заново",
        controls: "Используйте стрелки или клавиши WASD",
    },
    Arm: {
        gameTitle: "Օնլայն խաղ | Օձ",
        back: "Հետ",
        title: "Օձ",
        badge: "ՕՆԼԱՅՆ ԽԱՂ",
        playing: "ԽԱՂԸ ԸՆԹԱՆՈՒՄ Է",
        gameOver: "ԽԱՂՆ ԱՎԱՐՏՎԱԾ Է",
        ready: "ՊԱՏՐԱՍՏ",
        score: "ՄԻԱՎՈՐ",
        readyToPlay: "Պատրաստ ե՞ք խաղալու:",
        play: "Խաղալ",
        youWon: "Դուք հաղթեցիք!",
        gameOverText: "Խաղն ավարտված է",
        restart: "Նորից խաղալ",
        controls: "Օգտագործեք սլաքները կամ WASD ստեղները",
    },
};

const OnlineGame: FC = () => {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>({ x: 15, y: 10 });
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // Հայերենը սահմանված է որպես լռելյայն (default) լեզու
    const [lang, setLang] = useState<"Eng" | "Rus" | "Arm">("Arm");

    const directionRef = useRef<Direction>("RIGHT");
    const nextDirectionRef = useRef<Direction>("RIGHT");
    const foodRef = useRef<Point>({ x: 15, y: 10 });
    const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
    const playingRef = useRef(false);
    const gameOverRef = useRef(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Կարդում ենք լեզուն localStorage-ից
    useEffect(() => {
        const savedLang = localStorage.getItem("selectedLanguage") as "Eng" | "Rus" | "Arm";
        if (savedLang && translations[savedLang]) {
            setLang(savedLang);
        }
    }, []);

    const t = translations[lang] || translations.Arm;

    const createFood = useCallback((currentSnake: Point[]): Point => {
        const emptyCells: Point[] = [];

        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (!currentSnake.some((part) => part.x === x && part.y === y)) {
                    emptyCells.push({ x, y });
                }
            }
        }

        if (emptyCells.length === 0) {
            return { x: -1, y: -1 };
        }

        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }, []);

    const enterFullscreen = async () => {
        try {
            const container = gameContainerRef.current;
            if (container && !document.fullscreenElement) {
                await container.requestFullscreen();
            }
        } catch (error) {
            console.error("Fullscreen error:", error);
        }
    };

    const exitFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error("Exit fullscreen error:", error);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === gameContainerRef.current
            );
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const startGame = async () => {
        const initialSnake = INITIAL_SNAKE.map((part) => ({ ...part }));
        const initialFood = createFood(initialSnake);

        snakeRef.current = initialSnake;
        foodRef.current = initialFood;
        directionRef.current = "RIGHT";
        nextDirectionRef.current = "RIGHT";
        playingRef.current = true;
        gameOverRef.current = false;

        setSnake(initialSnake);
        setFood(initialFood);
        setScore(0);
        setGameOver(false);
        setPlaying(true);

        await enterFullscreen();
    };

    const changeDirection = useCallback((newDirection: Direction) => {
        if (!playingRef.current || gameOverRef.current) return;
        const currentDirection = nextDirectionRef.current;
        if (OPPOSITE[currentDirection] === newDirection) return;
        nextDirectionRef.current = newDirection;
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const keyDirections: Record<string, Direction> = {
                arrowup: "UP",
                w: "UP",
                arrowdown: "DOWN",
                s: "DOWN",
                arrowleft: "LEFT",
                a: "LEFT",
                arrowright: "RIGHT",
                d: "RIGHT",
            };

            const newDirection = keyDirections[key];
            if (newDirection) {
                event.preventDefault();
                changeDirection(newDirection);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [changeDirection]);

    useEffect(() => {
        if (!playing) return;

        const gameLoop = window.setInterval(() => {
            const currentSnake = snakeRef.current;
            const head = currentSnake[0];
            const direction = nextDirectionRef.current;

            directionRef.current = direction;
            const newHead = { ...head };

            switch (direction) {
                case "UP":
                    newHead.y -= 1;
                    break;
                case "DOWN":
                    newHead.y += 1;
                    break;
                case "LEFT":
                    newHead.x -= 1;
                    break;
                case "RIGHT":
                    newHead.x += 1;
                    break;
            }

            const currentFood = foodRef.current;
            const eating =
                newHead.x === currentFood.x &&
                newHead.y === currentFood.y;

            if (
                newHead.x < 0 ||
                newHead.x >= BOARD_WIDTH ||
                newHead.y < 0 ||
                newHead.y >= BOARD_HEIGHT
            ) {
                playingRef.current = false;
                gameOverRef.current = true;
                setPlaying(false);
                setGameOver(true);
                return;
            }

            const bodyToCheck = eating
                ? currentSnake
                : currentSnake.slice(0, -1);

            const hitSelf = bodyToCheck.some(
                (part) => part.x === newHead.x && part.y === newHead.y
            );

            if (hitSelf) {
                playingRef.current = false;
                gameOverRef.current = true;
                setPlaying(false);
                setGameOver(true);
                return;
            }

            const newSnake = [newHead, ...currentSnake];

            if (eating) {
                const nextFood = createFood(newSnake);
                foodRef.current = nextFood;
                setFood(nextFood);
                setScore((previous) => previous + 1);

                if (nextFood.x === -1) {
                    playingRef.current = false;
                    gameOverRef.current = true;
                    setPlaying(false);
                    setGameOver(true);
                }
            } else {
                newSnake.pop();
            }

            snakeRef.current = newSnake;
            setSnake(newSnake);
        }, GAME_SPEED);

        return () => window.clearInterval(gameLoop);
    }, [playing, createFood]);

    return (
        <div ref={gameContainerRef} className={style.fullscreenContainer}>
            <div className={style.topContainer}>
                <h3>{t.gameTitle}</h3>
                <Link href="/" className={style.back}>
                    {t.back}
                </Link>
            </div>

            <div className={style.page}>
                <div className={style.top}>
                    <h1>
                        {t.title}<span>.</span>
                    </h1>

                    <span className={style.badge}>{t.badge}</span>

                    <div className={style.headerRight}>
                        {isFullscreen && (
                            <button
                                type="button"
                                className={style.fullscreenButton}
                                onClick={exitFullscreen}
                                title="Exit fullscreen"
                                aria-label="Exit fullscreen"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className={style.gameLayout}>
                    <div className={style.left}>
                        <div className={style.topBar}>
                            <div className={style.status}>
                                <span
                                    className={
                                        playing ? style.online : style.offline
                                    }
                                />
                                {playing
                                    ? t.playing
                                    : gameOver
                                    ? t.gameOver
                                    : t.ready}
                            </div>

                            <div className={style.score}>
                                <small>{t.score}</small>
                                <strong>{score}</strong>
                            </div>
                        </div>

                        <div
                            className={style.game}
                            style={{
                                gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
                                gridTemplateRows: `repeat(${BOARD_HEIGHT}, minmax(0, 1fr))`,
                            }}
                        >
                            {Array.from({
                                length: BOARD_WIDTH * BOARD_HEIGHT,
                            }).map((_, index) => {
                                const x = index % BOARD_WIDTH;
                                const y = Math.floor(index / BOARD_WIDTH);

                                const isSnake = snake.some(
                                    (part) => part.x === x && part.y === y
                                );

                                const isHead =
                                    snake[0]?.x === x && snake[0]?.y === y;

                                const isFood = food.x === x && food.y === y;

                                return (
                                    <div
                                        key={index}
                                        className={[
                                            style.cell,
                                            isSnake ? style.snake : "",
                                            isHead ? style.head : "",
                                            isFood ? style.food : "",
                                        ].filter(Boolean).join(" ")}
                                    />
                                );
                            })}

                            {!playing && !gameOver && (
                                <div className={style.gameOver}>
                                    <div className={style.playIcon}>▶</div>
                                    <h2>{t.title}</h2>
                                    <p>{t.readyToPlay}</p>

                                    <button
                                        type="button"
                                        className={style.playButton}
                                        onClick={startGame}
                                    >
                                        {t.play}
                                    </button>
                                </div>
                            )}

                            {gameOver && (
                                <div className={style.gameOver}>
                                    <div className={style.gameOverText}>
                                        {t.gameOver}
                                    </div>
                                    <h2>{score === 397 ? t.youWon : t.gameOverText}</h2>
                                    <p>
                                        {t.score}: <strong>{score}</strong>
                                    </p>

                                    <button
                                        type="button"
                                        className={style.playButton}
                                        onClick={startGame}
                                    >
                                        {t.restart}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.right}>
                        <h2>{t.title}</h2>

                        <div className={style.score}>
                            {t.score}: <strong>{score}</strong>
                        </div>

                        {!playing && !gameOver && (
                            <button
                                type="button"
                                className={style.playButton}
                                onClick={startGame}
                            >
                                {t.play}
                            </button>
                        )}

                        {playing && (
                            <div className={style.controls}>
                                <p>{t.controls}</p>

                                <div className={style.mobileControls}>
                                    <button
                                        type="button"
                                        aria-label="Up"
                                        onClick={() => changeDirection("UP")}
                                    >
                                        ↑
                                    </button>

                                    <div>
                                        <button
                                            type="button"
                                            aria-label="Left"
                                            onClick={() => changeDirection("LEFT")}
                                        >
                                            ←
                                        </button>

                                        <button
                                            type="button"
                                            aria-label="Down"
                                            onClick={() => changeDirection("DOWN")}
                                        >
                                            ↓
                                        </button>

                                        <button
                                            type="button"
                                            aria-label="Right"
                                            onClick={() => changeDirection("RIGHT")}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {gameOver && (
                            <button
                                type="button"
                                className={style.playButton}
                                onClick={startGame}
                            >
                                {t.restart}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineGame;