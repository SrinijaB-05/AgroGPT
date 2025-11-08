// src/components/OtpSetup.jsx
import React, { useState } from "react";
import { generateTOTP, verifyTOTP } from "../api/auth";

export default function OtpSetup({ phone, onVerified }) {
  const [qrSrc, setQrSrc] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleGetQr = async () => {
    try {
      const blob = await generateTOTP(phone);
      setQrSrc(URL.createObjectURL(blob));
    } catch (e) {
      setError("Failed to generate QR: " + e.message);
    }
  };

  const handleVerify = async () => {
    setError("");
    try {
      const data = await verifyTOTP(phone, code);
      if (data.status === "success") {
        onVerified && onVerified(data);
      } else {
        setError(data.detail || data.message || "Verification failed");
      }
    } catch (e) {
      setError("Verification failed");
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={handleGetQr} className="btn">Get setup QR</button>
      {qrSrc && (
        <div style={{ marginTop: 10 }}>
          <img src={qrSrc} alt="qr" style={{ maxWidth: 220, display: "block", marginBottom: 8 }} />
          <p>Scan this with Google Authenticator, then enter the 6-digit code below:</p>
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="123456" />
          <button onClick={handleVerify} className="btn">Verify & Enable</button>
          {error && <div style={{color:"red"}}>{error}</div>}
        </div>
      )}
    </div>
  );
}
