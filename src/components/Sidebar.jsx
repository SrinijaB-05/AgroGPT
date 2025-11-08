import React, { useEffect } from "react";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Sidebar = ({ visible, onClose, onNewChat, onLogout, username = "Guest" }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!visible) return;
    const onKey = e => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  return (
    <>
      <div className={`sidebar-overlay ${visible ? "visible" : ""}`} onClick={onClose} aria-hidden={!visible} />
      <aside className={`sidebar ${visible ? "open" : ""}`} role="dialog" aria-hidden={!visible} aria-label="Conversations">
        <div className="sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="logo" style={{ height: 28 }} />
            <div style={{ fontWeight: 700 }}>{t("navbar.title")}</div>
          </div>
        </div>

        <div className="sidebar-body">
          <button className="sidebar-item" onClick={() => onNewChat && onNewChat()}>
            <FiPlus style={{ marginRight: 8 }} /> {t("sidebar.newChat")}
          </button>

          <div className="history-list" role="list">
            <div className="history-item" role="listitem">{t("sidebar.conversation", { number: 1 })}</div>
            <div className="history-item" role="listitem">{t("sidebar.conversation", { number: 2 })}</div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-block"><div style={{ fontWeight: 600 }}>{username}</div></div>
          <button className="sidebar-item logout" onClick={() => onLogout && onLogout()}>
            <FiLogOut style={{ marginRight: 8 }} /> {t("sidebar.logout")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
