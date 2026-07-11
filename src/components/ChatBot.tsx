import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, ShieldCheck, AlertCircle, Sparkles, ChevronRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  { text: "Are your treatments pet-safe?", label: "Pet Safety" },
  { text: "Do you cover all London boroughs?", label: "Coverage Area" },
  { text: "How much is residential rat control?", label: "Rat Pricing" },
  { text: "Do you exterminate honey bees?", label: "Bee Policy" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("glpc_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved chat history:", e);
      }
    } else {
      // Set default initial greeting message
      const initialGreeting: Message = {
        role: "assistant",
        content: "Welcome to Greater London Pest Control! 🛡️ I am your Bio-Shield AI Assistant. I can answer your questions about pest prevention, residential or commercial contracts, London coverage, or help you book a free site survey. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // Save chat history to localStorage when changed
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("glpc_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to the bottom of the chat window
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Build request messages chain (keeping only content & role for backend)
      const messageHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistory }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch response from AI model.");
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("ChatBot API error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Would you like to clear your conversation history?")) {
      const initialGreeting: Message = {
        role: "assistant",
        content: "Hello! I am your GLPC Bio-Shield Assistant. How can I help you with your pest control query today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialGreeting]);
      localStorage.removeItem("glpc_chat_history");
      setError(null);
    }
  };

  return (
    <div id="glpc-ai-chatbot" className="fixed bottom-24 right-6 z-50 flex flex-col items-end pointer-events-none md:bottom-6">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] bg-white rounded-3xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-wide flex items-center gap-1">
                    GLPC Bio-Shield AI
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium">BPCA-Accredited Biologist</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="text-xs text-gray-400 hover:text-white font-medium bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  title="Clear chat history"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close chat window"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-2.5 max-w-[85%] items-start">
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`px-4 py-3 rounded-2xl text-xs leading-relaxed font-normal shadow-xs ${
                          msg.role === "user"
                            ? "bg-slate-900 text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className={`text-[9px] text-gray-400 px-1 font-medium ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Server loading state */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[85%] items-start">
                    <div className="h-7 w-7 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-1 bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs">
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Errored response */}
              {error && (
                <div className="flex justify-center p-2">
                  <div className="flex items-center gap-2 text-xs text-rose-800 bg-rose-50 border border-rose-100 px-3.5 py-2.5 rounded-xl max-w-full">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Queries */}
            <div className="px-4 py-2 bg-white border-t border-gray-50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none select-none">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  disabled={isLoading}
                  className="bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 text-[10px] font-bold border border-gray-200/60 hover:border-emerald-200/60 px-3 py-1.5 rounded-xl cursor-pointer transition-all disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Form Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pest treatments, prices..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-100 text-xs px-4 py-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-60 text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 text-white disabled:text-gray-400 p-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto h-14 w-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 relative cursor-pointer group"
        aria-label="Open AI helper chat"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping group-hover:animate-none" />
        {isOpen ? (
          <X className="h-6 w-6 transition-transform rotate-0" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
