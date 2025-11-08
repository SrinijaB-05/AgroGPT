import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // placeholder bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Processing your query…" },
      ]);
    }, 600);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
      <div
        style={{
          width: "75%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2e7d32" }}>Welcome to AgroGPT</h2>
        <p>Ask anything related to agriculture!</p>

        <div
          style={{
            height: "400px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor:
                  msg.sender === "user" ? "#e8f5e9" : "#f1f1f1",
                color: "#333",
                padding: "8px 12px",
                borderRadius: "6px",
                marginBottom: "8px",
                alignSelf:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {username && <Sidebar username={username} onLogout={handleLogout} />}
    </div>
  );
};

export default Dashboard;
