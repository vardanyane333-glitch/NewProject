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

const INITIAL_FOOD: Point = { x: 15, y: 10 };

const OPPOSITE: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
};

const OnlineGame: FC = () => {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>(INITIAL_FOOD);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const directionRef = useRef<Direction>("RIGHT");
    const nextDirectionRef = useRef<Direction>("RIGHT");
    const foodRef = useRef<Point>(INITIAL_FOOD);
    const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
    const playingRef = useRef(false);
    const gameOverRef = useRef(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    const createFood = useCallback((currentSnake: Point[]): Point => {
        const emptyCells: Point[] = [];

        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (
                    !currentSnake.some(
                        (part) => part.x === x && part.y === y
                    )
                ) {
                    emptyCells.push({ x, y });
                }
            }
        }

        if (emptyCells.length === 0) {
            return { x: -1, y: -1 };
        }

        return emptyCells[
            Math.floor(Math.random() * emptyCells.length)
        ];
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
                document.fullscreenElement ===
                    gameContainerRef.current
            );
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const startGame = async () => {
        const initialSnake = INITIAL_SNAKE.map((part) => ({
            ...part,
        }));

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

    const changeDirection = useCallback(
        (newDirection: Direction) => {
            if (!playingRef.current || gameOverRef.current) {
                return;
            }

            const currentDirection = nextDirectionRef.current;

            if (OPPOSITE[currentDirection] === newDirection) {
                return;
            }

            nextDirectionRef.current = newDirection;
        },
        []
    );

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
                (part) =>
                    part.x === newHead.x &&
                    part.y === newHead.y
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
        <div
            ref={gameContainerRef}
            className={style.fullscreenContainer}
        >
            <div className={style.topContainer}>
                <h3>Online Game | Snake</h3>

                <Link href="/" className={style.back}>
                    Back
                </Link>
            </div>

            <div className={style.page}>
                <div className={style.top}>
                    <h1>
                        Snake<span>.</span>
                    </h1>

                    <span className={style.badge}>
                        ONLINE GAME
                    </span>

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
                                        playing
                                            ? style.online
                                            : style.offline
                                    }
                                />

                                {playing
                                    ? "PLAYING"
                                    : gameOver
                                      ? "GAME OVER"
                                      : "READY"}
                            </div>

                            <div className={style.score}>
                                <small>SCORE</small>
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
                                const y = Math.floor(
                                    index / BOARD_WIDTH
                                );

                                const isSnake = snake.some(
                                    (part) =>
                                        part.x === x &&
                                        part.y === y
                                );

                                const isHead =
                                    snake[0]?.x === x &&
                                    snake[0]?.y === y;

                                const isFood =
                                    food.x === x &&
                                    food.y === y;

                                return (
                                    <div
                                        key={index}
                                        className={[
                                            style.cell,
                                            isSnake ? style.snake : "",
                                            isHead ? style.head : "",
                                            isFood ? style.food : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    />
                                );
                            })}

                            {!playing && !gameOver && (
                                <div className={style.gameOver}>
                                    <div className={style.playIcon}>
                                        ▶
                                    </div>

                                    <h2>Snake</h2>
                                    <p>Ready to play?</p>

                                    <button
                                        type="button"
                                        className={style.playButton}
                                        onClick={startGame}
                                    >
                                        Play
                                    </button>
                                </div>
                            )}

                            {gameOver && (
                                <div className={style.gameOver}>
                                    <div className={style.gameOverText}>
                                        GAME OVER
                                    </div>

                                    <h2>
                                        {score === 397
                                            ? "You won!"
                                            : "Game Over"}
                                    </h2>

                                    <p>
                                        SCORE: <strong>{score}</strong>
                                    </p>

                                    <button
                                        type="button"
                                        className={style.playButton}
                                        onClick={startGame}
                                    >
                                        Play Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.right}>
                        <h2>Snake</h2>

                        <div className={style.score}>
                            SCORE: <strong>{score}</strong>
                        </div>

                        {!playing && !gameOver && (
                            <button
                                type="button"
                                className={style.playButton}
                                onClick={startGame}
                            >
                                Play
                            </button>
                        )}

                        {playing && (
                            <div className={style.controls}>
                                <p>
                                    Use arrow keys or WASD
                                </p>

                                <div className={style.mobileControls}>
                                    <button
                                        type="button"
                                        aria-label="Up"
                                        onClick={() =>
                                            changeDirection("UP")
                                        }
                                    >
                                        ↑
                                    </button>

                                    <div>
                                        <button
                                            type="button"
                                            aria-label="Left"
                                            onClick={() =>
                                                changeDirection("LEFT")
                                            }
                                        >
                                            ←
                                        </button>

                                        <button
                                            type="button"
                                            aria-label="Down"
                                            onClick={() =>
                                                changeDirection("DOWN")
                                            }
                                        >
                                            ↓
                                        </button>

                                        <button
                                            type="button"
                                            aria-label="Right"
                                            onClick={() =>
                                                changeDirection("RIGHT")
                                            }
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
                                Play Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineGame;