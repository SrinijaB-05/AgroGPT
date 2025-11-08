// src/pages/Reports.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function Reports() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-md border border-green-200 text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">{t("reports.title")}</h2>
        <p className="text-gray-700">{t("reports.description")}</p>
      </div>
    </div>
  );
}
