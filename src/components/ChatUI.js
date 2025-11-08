// src/components/ChatUI.jsx
import React, { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ChatUI() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAttach = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFilePreview({ url: URL.createObjectURL(f), name: f.name, file: f });
  };

  const handleSend = () => {
    if (!input.trim() && !filePreview) return;

    const userMessage = { id: Date.now(), sender: "user", text: input || "", image: filePreview?.url || null };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); 
    setFilePreview(null);
    if (fileRef.current) fileRef.current.value = "";

    setTimeout(() => {
      let botText = t("chat.defaultResponse");

      if (userMessage.image) {
        const outcomes = [
          t("chat.plantHealthy"),
          t("chat.nitrogenDeficiency"),
          t("chat.pestDetected"),
        ];
        botText = outcomes[Math.floor(Math.random() * outcomes.length)];
      } else if (userMessage.text) {
        botText = t("chat.userEcho") + userMessage.text;
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: botText }]);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.25 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden"
      >
        {/* ✅ Updated chat header */}
        <div className="bg-green-600 text-white text-center py-4 font-semibold">
          {t("chat.title")}
        </div>

        <div className="h-[58vh] overflow-y-auto p-4 bg-green-50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
              <div className={`p-3 rounded-xl max-w-[75%] ${m.sender === "user" ? "bg-green-100" : "bg-gray-100"}`}>
                {m.image && <img src={m.image} alt="upload" className="w-40 h-40 object-cover rounded-md mb-2" />}
                <div>{m.text}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="p-4 border-t border-green-200 flex items-center gap-3 bg-green-50">
          <label className="p-2 bg-white rounded-lg cursor-pointer hover:shadow">
            <ImageIcon size={18} className="text-green-600" />
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAttach} />
          </label>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("chat.placeholder")}
            className="flex-1 border border-green-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button onClick={handleSend} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
            <Send size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
