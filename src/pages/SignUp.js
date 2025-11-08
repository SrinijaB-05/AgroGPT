// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/register", { email, password, name });
      if (res.data.status === "success" || res.data.status === "exists") {
        setMsg(t("signup.success"));
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        setMsg(res.data.message || t("signup.failed"));
      }
    } catch (err) {
      setMsg(t("signup.error") + ": " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-green-200">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">{t("signup.title")}</h2>
        <form className="space-y-4" onSubmit={submit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("signup.name")} className="w-full border rounded px-3 py-2" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("signup.email")} type="email" className="w-full border rounded px-3 py-2" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("signup.password")} type="password" className="w-full border rounded px-3 py-2" required />
          {msg && <div className="text-sm text-green-700">{msg}</div>}
          <button className="w-full bg-green-600 text-white py-2 rounded">{t("signup.button")}</button>
          <p className="text-sm text-gray-600 mt-2">
            {t("signup.haveAccount")} <Link to="/signin" className="text-green-600 font-medium">{t("signup.signIn")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
