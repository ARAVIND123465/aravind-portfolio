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
  const [showPop, setShowPop] = useState(false);
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

  // Show pop-up greeting after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPop(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

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
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .chat-root * { box-sizing: border-box; }
        .chat-root { font-family: 'IBM Plex Mono', monospace; }

        .chat-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 62px;
          height: 62px;
          border-radius: 12px; /* Robotic squared look */
          background: #0a0a0c;
          border: 1px solid #00f2ff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
          transition: all 0.3s ease;
        }
        .chat-fab:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(0, 242, 255, 0.6);
          background: #111;
        }
        .chat-fab-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00f2ff;
          box-shadow: 0 0 10px #00f2ff;
          animation: blink 1.5s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .chat-pop {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9999;
          background: #050505;
          border: 1px solid #00f2ff;
          padding: 12px 18px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.2);
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          cursor: pointer;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .chat-pop::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: 24px;
          width: 10px;
          height: 10px;
          background: #050505;
          border-right: 1px solid #00f2ff;
          border-bottom: 1px solid #00f2ff;
          transform: rotate(45deg);
        }
        .chat-pop-text {
          font-size: 11px;
          color: #00f2ff;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        .chat-pop-close {
          color: #00f2ff;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        .chat-pop-close:hover { opacity: 1; }

        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9998;
          width: 400px;
          border-radius: 4px;
          background: #050505;
          border: 1px solid rgba(0, 242, 255, 0.4);
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 242, 255, 0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: terminal-boot 0.4s ease-out;
        }
        @keyframes terminal-boot {
          from { opacity: 0; transform: scaleY(0.01); }
          to   { opacity: 1; transform: scaleY(1); }
        }

        /* Scanline Overlay */
        .scanline {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 4px, 3px 100%;
          pointer-events: none;
          z-index: 10;
          opacity: 0.3;
        }

        /* Header */
        .chat-header {
          background: rgba(0, 242, 255, 0.1);
          border-bottom: 1px solid rgba(0, 242, 255, 0.3);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .chat-header::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #00f2ff;
          box-shadow: 0 0 10px #00f2ff;
        }
        .chat-header-avatar {
          width: 32px;
          height: 32px;
          border: 1px solid #00f2ff;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-header-info { flex: 1; min-width: 0; }
        .chat-header-name {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          color: #00f2ff;
          letter-spacing: 2px;
        }
        .chat-header-status {
          font-size: 10px;
          color: #00f2ff;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 300px;
          max-height: 400px;
          scrollbar-width: thin;
          scrollbar-color: #00f2ff transparent;
        }
        .msg-row { animation: line-appear 0.2s ease; }
        @keyframes line-appear {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .msg-content {
          font-size: 13px;
          line-height: 1.6;
          word-break: break-word;
          position: relative;
        }
        .msg-prefix {
          font-weight: bold;
          margin-right: 8px;
        }
        .ai .msg-prefix { color: #00f2ff; }
        .ai .msg-text { color: #00f2ff; text-shadow: 0 0 5px rgba(0, 242, 255, 0.4); }

        .user .msg-prefix { color: #fbbf24; }
        .user .msg-text { color: #fbbf24; text-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }

        .msg-time {
          font-size: 9px;
          opacity: 0.4;
          margin-left: 8px;
          color: #fff;
        }

        /* Blinking Cursor */
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: #00f2ff;
          margin-left: 4px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        /* Typing indicator as terminal lines */
        .typing-line {
          color: #00f2ff;
          font-size: 13px;
          opacity: 0.6;
        }

        /* Suggested prompts as commands */
        .suggestions {
          padding: 10px 20px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          border-top: 1px solid rgba(0, 242, 255, 0.1);
        }
        .suggestion-cmd {
          font-size: 11px;
          color: #00f2ff;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s;
          text-align: left;
        }
        .suggestion-cmd:hover {
          opacity: 1;
          padding-left: 5px;
        }
        .suggestion-cmd::before {
          content: '> ';
        }

        /* Input area */
        .chat-input-area {
          padding: 16px;
          background: #000;
          border-top: 1px solid rgba(0, 242, 255, 0.3);
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .terminal-prompt {
          color: #00f2ff;
          font-size: 14px;
          font-weight: bold;
        }
        .chat-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #00f2ff;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          caret-color: #00f2ff;
        }
        .chat-send-btn {
          color: #00f2ff;
          border: 1px solid #00f2ff;
          background: transparent;
          padding: 4px 10px;
          font-size: 11px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .chat-send-btn:hover:not(:disabled) {
          background: #00f2ff;
          color: #000;
          box-shadow: 0 0 10px #00f2ff;
        }

        .chat-footer {
          background: #000;
          color: #333;
          font-size: 8px;
          padding: 4px 16px;
          text-align: right;
          letter-spacing: 1px;
        }

        @media (max-width: 420px) {
          .chat-window { width: calc(100vw - 24px); right: 12px; bottom: 90px; }
          .chat-fab { bottom: 20px; right: 16px; }
        }
      `}</style>

      <div className="chat-root">
        {/* ── Pop Greeting ── */}
        {showPop && !isOpen && (
          <div className="chat-pop" onClick={() => setIsOpen(true)}>
            <div className="chat-pop-text">
              <span style={{ color: '#555', marginRight: '6px' }}>[SYSTEM] {'>'}</span>
              AI_ASSISTANT_ONLINE: ASK_ANYTHING
            </div>
            <button 
              className="chat-pop-close" 
              onClick={(e) => {
                e.stopPropagation();
                setShowPop(false);
              }}
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* ── FAB Button ── */}
        {!isOpen && (
          <button 
            className="chat-fab" 
            onClick={() => {
              setIsOpen(true);
              setShowPop(false);
            }} 
            aria-label="Open AI Assistant"
          >
            <Bot size={24} color="#00f2ff" />
            <span className="chat-fab-badge" />
          </button>
        )}

        {/* ── Chat Window ── */}
        {isOpen && (
          <div className={`chat-window ${isMinimized ? "minimized" : ""}`}>
            <div className="scanline" />
            
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-avatar">
                <Bot size={18} color="#00f2ff" />
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">Aravind_OS :: Assistant</div>
                <div className="chat-header-status">SYSTEM_ONLINE :: READY_TO_QUERY</div>
              </div>
              <div className="chat-header-actions">
                <button
                  className="chat-icon-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label="Minimize"
                  style={{ color: '#00f2ff' }}
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  className="chat-icon-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  style={{ color: '#00f2ff' }}
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
                      <div className="msg-content">
                        <span className="msg-prefix">
                          {msg.sender === "ai" ? "[SYSTEM] >" : "[USER] >"}
                        </span>
                        <span className="msg-text">{msg.text}</span>
                        <span className="msg-time">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="msg-row ai">
                      <div className="msg-content">
                        <span className="msg-prefix">[SYSTEM] {'>'}</span>
                        <span className="typing-line">PROCCESSING_DATA...</span>
                        <span className="cursor" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {messages.length === 1 && (
                  <div className="suggestions">
                    <div style={{ fontSize: '9px', color: '#555', marginBottom: '5px' }}>AVAILABLE_COMMANDS:</div>
                    {SUGGESTED.map((s) => (
                      <button key={s} className="suggestion-cmd" onClick={() => sendMessage(s)}>
                        {s.toUpperCase().replace(/\s+/g, '_')}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="chat-input-area">
                  <span className="terminal-prompt">{'>'}</span>
                  <input
                    ref={inputRef}
                    className="chat-input"
                    type="text"
                    placeholder="ENTER_QUERY..."
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
                  >
                    SEND
                  </button>
                </div>

                {/* Footer */}
                <div className="chat-footer">
                  SECURE_CONNECTION_ESTABLISHED // PORT_6366
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
