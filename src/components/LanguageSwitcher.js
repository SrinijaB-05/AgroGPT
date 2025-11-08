import React, { useState, useRef, useEffect } from "react";

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen(!open);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Main Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition focus:outline-none"
      >
        <span>{language}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1 text-gray-800">
            {["English", "Telugu", "Hindi"].map((lang) => (
              <li
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className="px-4 py-2 hover:bg-green-50 cursor-pointer"
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
