// src/pages/About.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center h-[80vh] bg-green-50 px-4">
      <div className="max-w-2xl text-center bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-4">{t("about.title")}</h1>
        <p className="text-gray-700 leading-relaxed">{t("about.description")}</p>
      </div>
    </div>
  );
};

export default About;
