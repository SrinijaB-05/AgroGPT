// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SignIn = ({ setIsLoggedIn, setUsername }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [manualKey, setManualKey] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState("register"); // register → setup → verify
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMsg("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/register", { email, password });
      if (res.data.status === "success" || res.data.status === "exists") {
        const qrRes = await axios.get(`http://127.0.0.1:8000/totp-setup/${email}`);
        setQrUrl("http://127.0.0.1:8000" + qrRes.data.qr_url);
        setManualKey(qrRes.data.manual_key);
        setStage("setup");
      }
    } catch (err) {
      setMsg(t("signin.error") + ": " + err.message);
    }
  };

  const handleVerify = async () => {
    setMsg("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/verify-totp", { email, password, code });
      if (res.data.status === "success") {
        const userData = { email, name: email.split("@")[0] };
        localStorage.setItem("agroUser", JSON.stringify(userData));
        setUsername(userData.name);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setMsg(res.data.message || t("signin.invalidCode"));
      }
    } catch (err) {
      setMsg(t("signin.error") + ": " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-green-200">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
          {t("signin.title")}
        </h2>

        {stage === "register" && (
          <>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder={t("signin.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              type="password"
              placeholder={t("signin.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {msg && <div className="text-sm text-red-600 mb-2">{msg}</div>}
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              {t("signin.continue")}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              {t("signin.noAccount")}{" "}
              <Link to="/signup" className="text-green-600 font-medium">
                {t("signin.signUp")}
              </Link>
            </p>
          </>
        )}

        {stage === "setup" && (
          <div>
            <p className="text-gray-700 mb-2 font-semibold">{t("signin.scanQR")}</p>
            {qrUrl && (
              <img src={qrUrl} alt="TOTP QR" className="mx-auto my-4 w-48 h-48 border rounded-lg shadow"/>
            )}
            <p className="font-mono text-lg bg-gray-100 inline-block px-4 py-2 rounded break-all">{manualKey}</p>
            <p className="mt-4">{t("signin.enterCode")}</p>
            <input
              className="border p-2 m-2 text-center w-24"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              className="w-full bg-green-600 text-white py-2 rounded mt-2"
            >
              {t("signin.verify")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
