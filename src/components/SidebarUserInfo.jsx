import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarUserInfo = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  if (!username) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="fixed bottom-6 left-6 bg-white border rounded-md shadow px-4 py-2 text-green-700">
      <div className="font-medium">{username}</div>
      <button onClick={handleLogout} className="text-sm text-red-600 mt-1 hover:underline">
        Logout
      </button>
    </div>
  );
};

export default SidebarUserInfo;
