import React, { useState, useEffect } from "react";
import ChatUI from "../components/ChatUI";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Home = ({ userEmail, onLogout }) => {
  const { t } = useTranslation();
  const [showChatButton, setShowChatButton] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatKey, setChatKey] = useState(0);

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://127.0.0.1:8000/api/chats/${userEmail}`)
        .then((res) => setChatHistory(res.data.chats || []))
        .catch((err) => console.error(err));
    }
  }, [userEmail]);

  useEffect(() => {
    const handleScroll = () => setShowChatButton(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChatScroll = () => {
    const chatSection = document.getElementById("chat-section");
    if (chatSection) chatSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewChat = () => setChatKey((prev) => prev + 1);

  return (
    <div className="flex w-full min-h-screen bg-green-50">
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onLogout={onLogout}
        username={userEmail || "Guest"}
        history={chatHistory}
      />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-green-50 text-center px-4">
          <h2 className="text-5xl font-bold text-green-700 mb-4 flex items-center justify-center gap-3">
            {t("hero.title")} <span className="text-5xl">🌾</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("hero.description")}
          </p>
          <button
            onClick={handleChatScroll}
            className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-200"
          >
            {t("hero.tryChat")}
          </button>
        </section>

        {/* CHAT SECTION */}
        <section id="chat-section" className="w-full py-20 bg-green-50">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-green-700 text-center mb-8">
              {t("chat.header")}
            </h3>
            <ChatUI key={chatKey} userEmail={userEmail} />
          </div>
        </section>

        {/* FLOATING CHAT BUTTON */}
        {showChatButton && (
          <button
            onClick={handleChatScroll}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
          >
            <span role="img" aria-label="chat">
              💬
            </span>
            {t("hero.tryChat")}
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
