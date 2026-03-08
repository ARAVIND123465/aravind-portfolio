// 'use client';
// import { useState } from 'react';
// import { Send, Bot } from 'lucide-react';

// const AIAssistant = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: 'Hello! How can I help you today?', sender: 'ai' },
//   ]);
//   const [inputText, setInputText] = useState('');

//   const handleSendMessage = async () => {
//     if (inputText.trim() === "") return;

//   const userMessage = inputText;

//   setMessages([...messages, { text: userMessage, sender: "user" }]);
//   setInputText("");

//   const res = await fetch("/api/assistant", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: userMessage,
//     }),
//   });

//   const data = await res.json();

//   setMessages((prev) => [
//     ...prev,
//     { text: data.answer, sender: "ai" },
//   ]);
// };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Bot size={28} />
//       </button>
//       {isOpen && (
//         <div className="absolute bottom-20 right-0 w-80 bg-gray-900 text-white rounded-lg shadow-2xl flex flex-col h-96">
//           <div className="bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
//             <h2 className="text-lg font-bold">AI Assistant</h2>
//             <button
//               className="text-gray-400 hover:text-white"
//               onClick={() => setIsOpen(false)}
//             >
//               &times;
//             </button>
//           </div>
//           <div className="flex-1 p-4 overflow-y-auto">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start gap-3 my-4 ${
//                   message.sender === 'ai' ? 'justify-start' : 'justify-end'
//                 }`}
//               >
//                 {message.sender === 'ai' && (
//                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                     <Bot size={24} />
//                   </div>
//                 )}
//                 <div
//                   className={`p-3 rounded-lg max-w-xs ${
//                     message.sender === 'ai'
//                       ? 'bg-gray-700 text-left'
//                       : 'bg-blue-600 text-right'
//                   }`}
//                 >
//                   <p>{message.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-4 bg-gray-800 rounded-b-lg flex items-center">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               className="flex-1 bg-gray-700 text-white border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               className="ml-3 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               onClick={handleSendMessage}
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIAssistant;


"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Bot, Send, X, Minimize2, Sparkles } from "lucide-react";

// ── Types ────────────────────────────────────────────────────

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── Suggested prompts ────────────────────────────────────────

const SUGGESTED = [
  "What are your skills?",
  "Tell me about yourself",
  "What projects have you built?",
  "Where have you interned?",
];

// ── Component ────────────────────────────────────────────────

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm Aravindhan's AI assistant. Ask me anything about his skills, projects, or experience 👋",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();
      const aiText = data.answer ?? data.error ?? "Something went wrong. Please try again.";

      const aiMsg: Message = {
        id: Date.now() + 1,
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Update conversation history for multi-turn context
      setHistory((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: aiText },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Network error. Please check your connection and try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700&display=swap');

        .chat-root * { box-sizing: border-box; }
        .chat-root { font-family: 'DM Sans', sans-serif; }

        .chat-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .chat-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.6);
        }
        .chat-fab-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid #0f0f14;
          animation: pulse-badge 2s infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
        }

        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9998;
          width: 370px;
          border-radius: 20px;
          background: #0f0f14;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chat-appear 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: bottom right;
        }
        @keyframes chat-appear {
          from { opacity: 0; transform: scale(0.85) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .chat-window.minimized {
          height: auto;
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.15) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }
        .chat-header-info { flex: 1; min-width: 0; }
        .chat-header-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.01em;
        }
        .chat-header-status {
          font-size: 11px;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 1px;
        }
        .chat-header-status::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
        }
        .chat-header-actions { display: flex; gap: 6px; }
        .chat-icon-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.07);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          transition: background 0.15s, color 0.15s;
        }
        .chat-icon-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 340px;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.3) transparent;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(99,102,241,0.3);
          border-radius: 2px;
        }

        .msg-row { display: flex; gap: 8px; animation: msg-in 0.2s ease; }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-row.user { flex-direction: row-reverse; }

        .msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 9px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .msg-bubble-wrap { display: flex; flex-direction: column; max-width: 78%; }
        .msg-row.user .msg-bubble-wrap { align-items: flex-end; }

        .msg-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.55;
          word-break: break-word;
        }
        .msg-bubble.ai {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.07);
          color: #e2e2e8;
          border-bottom-left-radius: 4px;
        }
        .msg-bubble.user {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .msg-time {
          font-size: 10px;
          color: #555;
          margin-top: 4px;
          padding: 0 2px;
        }

        /* Typing indicator */
        .typing-bubble {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: typing 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }

        /* Suggested prompts */
        .suggestions {
          padding: 0 16px 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .suggestion-chip {
          font-size: 11.5px;
          padding: 5px 11px;
          border-radius: 20px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .suggestion-chip:hover {
          background: rgba(99,102,241,0.25);
          color: #c7d2fe;
        }

        /* Input area */
        .chat-input-area {
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px 14px;
          color: #e2e2e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .chat-input::placeholder { color: #555; }
        .chat-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(255,255,255,0.08);
        }
        .chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s;
          box-shadow: 0 4px 12px rgba(99,102,241,0.35);
        }
        .chat-send-btn:hover:not(:disabled) { opacity: 0.9; transform: scale(1.05); }
        .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        /* Powered by */
        .chat-footer {
          text-align: center;
          padding: 6px;
          font-size: 10px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        @media (max-width: 420px) {
          .chat-window { width: calc(100vw - 24px); right: 12px; bottom: 90px; }
          .chat-fab { bottom: 20px; right: 16px; }
        }
      `}</style>

      <div className="chat-root">
        {/* ── FAB Button ── */}
        {!isOpen && (
          <button className="chat-fab" onClick={() => setIsOpen(true)} aria-label="Open AI Assistant">
            <Bot size={24} color="#fff" />
            <span className="chat-fab-badge" />
          </button>
        )}

        {/* ── Chat Window ── */}
        {isOpen && (
          <div className={`chat-window ${isMinimized ? "minimized" : ""}`}>
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-avatar">
                <Sparkles size={18} color="#fff" />
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">Portfolio Assistant</div>
                <div className="chat-header-status">Online · Ask me anything</div>
              </div>
              <div className="chat-header-actions">
                <button
                  className="chat-icon-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label="Minimize"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  className="chat-icon-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="chat-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`msg-row ${msg.sender}`}>
                      {msg.sender === "ai" && (
                        <div className="msg-avatar">
                          <Bot size={15} color="#fff" />
                        </div>
                      )}
                      <div className="msg-bubble-wrap">
                        <div className={`msg-bubble ${msg.sender}`}>{msg.text}</div>
                        <div className="msg-time">{formatTime(msg.timestamp)}</div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="msg-row ai">
                      <div className="msg-avatar">
                        <Bot size={15} color="#fff" />
                      </div>
                      <div className="typing-bubble">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions (show only on first message) */}
                {messages.length === 1 && (
                  <div className="suggestions">
                    {SUGGESTED.map((s) => (
                      <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="chat-input-area">
                  <input
                    ref={inputRef}
                    className="chat-input"
                    type="text"
                    placeholder="Ask about skills, projects…"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    maxLength={400}
                  />
                  <button
                    className="chat-send-btn"
                    onClick={() => sendMessage(inputText)}
                    disabled={isLoading || !inputText.trim()}
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>

                {/* Footer */}
                <div className="chat-footer">
                  <Sparkles size={9} color="#444" />
                  Powered by Claude AI
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
