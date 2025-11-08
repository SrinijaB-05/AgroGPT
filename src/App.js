import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Reports from "./pages/Reports";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  // Track login state and username
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("agroUser"));
    if (storedUser?.email) {
      setIsLoggedIn(true);
      setUsername(storedUser.name || storedUser.email.split("@")[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("agroUser");
    setIsLoggedIn(false);
    setUsername("");
    window.location.href = "/signin";
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-0 m-0">
          <Routes>
            <Route path="/" element={<Home userEmail={username} onLogout={handleLogout} />} />
            <Route path="/home" element={<Home userEmail={username} onLogout={handleLogout} />} />
            <Route path="/about" element={<About />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
