"use client";
import { FC, useState, useRef, useEffect } from "react";
import style from "./chat.module.css";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

const ChatMengger: FC = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Սկզբնական հաղորդագրություն
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Բարև ձեզ, ինչպե՞ս կարող եմ օգնել ձեզ այսօր:",
      sender: "other",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message.trim(),
        sender: "me",
      },
    ]);

    setMessage("");
  };

  return (
    <div className={style.mengger_continer}>
      {/* Կողային վահանակ (Sidebar) */}
      <aside className={style.sidebar}>
        <div className={style.avatar_wrapper}>
          <div className={style.avatar_letter}>A</div>
          <span className={style.online_dot}></span>
        </div>
      </aside>

      {/* Հիմնական չաթի տարածք */}
      <main className={style.chat_main}>
        <header className={style.chat_header}>
          <div className={style.header_info}>
            <div className={style.header_title}>AdminCrator</div>
            <div className={style.header_subtitle}>Առցանց է</div>
          </div>
          <div className={style.header_status_dot}></div>
        </header>

        <section className={style.messages}>
          {messages.map((item) => (
            <div
              key={item.id}
              className={`${style.message_row} ${
                item.sender === "me" ? style.my_message : style.their_message
              }`}
            >
              <div className={style.message_bubble}>
                <p className={style.message_text}>{item.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <form
          className={style.message_form}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className={style.input_wrapper}>
            <input
              type="text"
              placeholder="Գրեք հաղորդագրություն..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={style.send_button}
            aria-label="Ուղարկել"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatMengger;