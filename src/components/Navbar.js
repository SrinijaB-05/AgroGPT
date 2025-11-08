import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = ({ isLoggedIn = false, username = "Guest", onLogout }) => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen(s => !s);
  const handleClose = () => setSidebarOpen(false);

  const handleNewChat = () => {
    window.dispatchEvent(new CustomEvent("agro:newchat"));
    handleClose();
  };

  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-btn" onClick={handleToggle} aria-label="Open sidebar">
            <Menu size={22} color="#fff" />
          </button>
          <img src="/logo.png" alt="AgroGPT Logo" className="logo" />
          <h2 className="title">{t("navbar.title")}</h2>
        </div>

        <div className="navbar-right flex items-center gap-4">
          <Link to="/home">{t("navbar.home")}</Link>
          <Link to="/about">{t("navbar.about")}</Link>
          <Link to="/reports">{t("navbar.reports")}</Link>
          {!isLoggedIn && <Link to="/signup">{t("navbar.signup")}</Link>}

          <select className="lang-select" defaultValue={i18n.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>

          {isLoggedIn && (
            <div className="avatar ml-3 rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </nav>

      <Sidebar
        visible={sidebarOpen}
        onClose={handleClose}
        onNewChat={handleNewChat}
        onLogout={onLogout}
        username={username}
      />
    </>
  );
};

export default Navbar;
