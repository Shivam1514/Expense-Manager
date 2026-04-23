import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your financial advisor. How can I help you with your investments or finances today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/chat/message", {
        prompt: userMessage,
      });
      setMessages((prev) => [
        ...prev,
        { text: response.data.message, isBot: true },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to connect to the financial advisor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[400px] bg-base-100 shadow-2xl rounded-2xl flex flex-col mb-4 border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-content p-4 flex justify-between items-center">
            <div className="font-semibold flex items-center gap-2">
              <MessageCircle size={20} />
              Financial Advisor
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-content hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot
                      ? "bg-base-200 text-base-content rounded-tl-none"
                      : "bg-primary text-primary-content rounded-tr-none"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-base-200 text-base-content rounded-tl-none flex items-center gap-2">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-base-300 bg-base-100 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about finances..."
              className="input input-bordered input-sm flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm btn-square"
              disabled={isLoading || !input.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary btn-circle shadow-lg shadow-primary/30 h-14 w-14"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
