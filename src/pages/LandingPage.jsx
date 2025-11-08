import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-center px-6">
      <h1 className="text-5xl font-bold text-green-700 mb-6">🌾 Welcome to AgroGPT</h1>
      <p className="text-gray-700 max-w-2xl text-lg mb-10 leading-relaxed">
        Your AI-powered Agricultural Assistant for smarter and faster farming decisions.
        Upload images, ask questions, and get instant expert insights.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/signin")}
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-white text-green-700 border border-green-600 font-semibold rounded-full shadow-md hover:bg-green-50 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
