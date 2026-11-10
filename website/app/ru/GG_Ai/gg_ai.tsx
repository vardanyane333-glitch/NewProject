
'use client';

import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { TiMediaStop } from "react-icons/ti";
import { IoCloseOutline } from "react-icons/io5";
import style from "./gg_ai.module.css";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

const GG_Ai: FC = () => {
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const recognitionRef = useRef<any>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // РАСПОЗНАВАНИЕ РЕЧИ

    const startVoice = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Ваш браузер не поддерживает распознавание речи.");
            return;
        }

        if (listening) {
            recognitionRef.current?.stop();
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "ru-RU";
        recognition.continuous = false;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event: any) => {
            let transcript = "";

            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            setText(transcript);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        try {
            recognition.start();
        } catch (error) {
            setListening(false);
            console.error(error);
        }
    };

    // ОТПРАВКА СООБЩЕНИЯ

    const sendMessage = () => {
        const message = text.trim();

        if (!message) return;

        const userMessage: Message = {
            id: Date.now(),
            text: message,
            sender: "user"
        };

        const aiMessage: Message = {
            id: Date.now() + 1,
            text: "Эта часть пока не готова.",
            sender: "ai"
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
            aiMessage
        ]);

        setChatOpen(true);
        setText("");
    };

    // АВТОМАТИЧЕСКАЯ ПРОКРУТКА

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop =
                chatBodyRef.current.scrollHeight;
        }
    }, [messages, chatOpen]);

    // ОЧИСТКА

    useEffect(() => {
        return () => {
            recognitionRef.current?.stop();
        };
    }, []);

    return (
        <div className={style.container}>

            {/* ОКНО ЧАТА */}

            {chatOpen && (
                <div className={style.chatWindow}>

                    {/* ШАПКА */}

                    <div className={style.chatHeader}>

                        <div className={style.aiProfile}>

                            <div className={style.aiIcon}>
                                AI
                            </div>

                            <div>
                                <h3>Искусственный интеллект</h3>
                                <span>В сети</span>
                            </div>

                        </div>

                        <button
                            type="button"
                            className={style.closeButton}
                            onClick={() => setChatOpen(false)}
                            aria-label="Закрыть чат"
                        >
                            <IoCloseOutline size={27} />
                        </button>

                    </div>

                    {/* СООБЩЕНИЯ */}

                    <div
                        className={style.chatBody}
                        ref={chatBodyRef}
                    >

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={
                                    message.sender === "user"
                                        ? style.userMessage
                                        : style.aiMessage
                                }
                            >

                                <span>
                                    {message.sender === "user"
                                        ? "Вы"
                                        : "AI помощник"}
                                </span>

                                <p>{message.text}</p>

                            </div>
                        ))}

                    </div>

                    {/* НИЖНЯЯ ЧАСТЬ */}

                    <div className={style.chatFooter}>
                        AI помощник находится в разработке.
                    </div>

                </div>
            )}

            {/* AI ORBIT */}

            <nav className={style.nav}>

                <div className={style.orbit}>

                    {Array.from({ length: 12 }).map((_, i) => (
                        <span
                            key={i}
                            className={style.orbitDot}
                            style={{
                                transform: `rotate(${i * 30}deg) translateY(-155px)`
                            }}
                        />
                    ))}

                    <div className={style.ring}></div>

                    <div className={style.ring2}></div>

                    <div className={style.center}>
                        <span>AI</span>
                    </div>

                </div>

            </nav>

            {/* ГЛАВНЫЙ РАЗДЕЛ */}

            <section className={style.section}>

                <h1>Чем я могу тебе помочь?</h1>

                <p>
                    Твой личный помощник на основе искусственного интеллекта.
                </p>

                {/* ПОЛЕ ВВОДА */}

                <div className={style.inputBox}>

                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Напиши свой вопрос..."
                    />

                    {/* МИКРОФОН */}

                    <button
                        type="button"
                        className={`${style.mic} ${
                            listening ? style.micActive : ""
                        }`}
                        onClick={startVoice}
                        title={
                            listening
                                ? "Остановить запись"
                                : "Голосовой ввод"
                        }
                        aria-label="Голосовой ввод"
                    >

                        {listening ? (
                            <TiMediaStop size={28} />
                        ) : (
                            <AiOutlineAudio size={26} />
                        )}

                    </button>

                    {/* ОТПРАВИТЬ */}

                    <button
                        type="button"
                        className={style.send}
                        onClick={sendMessage}
                        disabled={!text.trim()}
                        aria-label="Отправить сообщение"
                    >
                        ↑
                    </button>

                </div>

                <span className={style.footer}>
                    ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ
                </span>

            </section>

        </div>
    );
};

export default GG_Ai;
