
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

    // ՁԱՅՆԱՅԻՆ ՃԱՆԱՉՈՒՄ

    const startVoice = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Ձեր դիտարկիչը չի աջակցում ձայնային ճանաչում։");
            return;
        }

        if (listening) {
            recognitionRef.current?.stop();
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "hy-AM";
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

    // ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆ ՈՒՂԱՐԿԵԼ

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
            text: "Այս մասը դեռ պատրաստ չէ։",
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

    // ԱՎՏՈՄԱՏ ՈԼՈՐՈՒՄ ԴԵՊԻ ՎԵՐՋԻՆ ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆ

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop =
                chatBodyRef.current.scrollHeight;
        }
    }, [messages, chatOpen]);

    // ՄԱՔՐՈՒՄ

    useEffect(() => {
        return () => {
            recognitionRef.current?.stop();
        };
    }, []);

    return (
        <div className={style.container}>

            {/* ԶՐՈՒՅՑԻ ՊԱՏՈՒՀԱՆ */}

            {chatOpen && (
                <div className={style.chatWindow}>

                    {/* ՎԵՐՆԱՄԱՍ */}

                    <div className={style.chatHeader}>

                        <div className={style.aiProfile}>

                            <div className={style.aiIcon}>
                                AI
                            </div>

                            <div>
                                <h3>Արհեստական բանականություն</h3>
                                <span>Առցանց</span>
                            </div>

                        </div>

                        <button
                            type="button"
                            className={style.closeButton}
                            onClick={() => setChatOpen(false)}
                            aria-label="Փակել զրույցը"
                        >
                            <IoCloseOutline size={27} />
                        </button>

                    </div>

                    {/* ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆՆԵՐ */}

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
                                        ? "Դուք"
                                        : "AI օգնական"}
                                </span>

                                <p>{message.text}</p>

                            </div>
                        ))}

                    </div>

                    {/* ՆԵՐՔԻՆ ՄԱՍ */}

                    <div className={style.chatFooter}>
                        AI օգնականը դեռ մշակման փուլում է։
                    </div>

                </div>
            )}

            {/* AI ԳՈՒՆԴ */}

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

            {/* ԳԼԽԱՎՈՐ ՀԱՏՎԱԾ */}

            <section className={style.section}>

                <h1>Ինչո՞վ կարող եմ օգնել քեզ։</h1>

                <p>
                    Քո անձնական արհեստական բանականության օգնականը պատրաստ է։
                </p>

                {/* ՄՈՒՏՔԱԳՐՄԱՆ ԴԱՇՏ */}

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
                        placeholder="Գրիր քո հարցը..."
                    />

                    {/* ՁԱՅՆԱՅԻՆ ԿՈՃԱԿ */}

                    <button
                        type="button"
                        className={`${style.mic} ${
                            listening ? style.micActive : ""
                        }`}
                        onClick={startVoice}
                        title={
                            listening
                                ? "Դադարեցնել ձայնագրությունը"
                                : "Խոսել ձայնով"
                        }
                        aria-label="Ձայնային մուտքագրում"
                    >

                        {listening ? (
                            <TiMediaStop size={28} />
                        ) : (
                            <AiOutlineAudio size={26} />
                        )}

                    </button>

                    {/* ՈՒՂԱՐԿԵԼ */}

                    <button
                        type="button"
                        className={style.send}
                        onClick={sendMessage}
                        disabled={!text.trim()}
                        aria-label="Ուղարկել հաղորդագրությունը"
                    >
                        ↑
                    </button>

                </div>

                <span className={style.footer}>
                    ԱՐՀԵՍՏԱԿԱՆ ԲԱՆԱԿԱՆՈՒԹՅՈՒՆ
                </span>

            </section>

        </div>
    );
};

export default GG_Ai;
