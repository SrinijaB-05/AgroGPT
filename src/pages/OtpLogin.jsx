import React, { useState } from "react";
import axios from "axios";

function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [isSetup, setIsSetup] = useState(false);

  const handleGenerateQR = async () => {
    const res = await axios.get(`http://localhost:8000/api/auth/generate-totp/${phone}`, {
      responseType: "blob",
    });
    const qrUrl = URL.createObjectURL(res.data);
    setQrImage(qrUrl);
    setIsSetup(true);
  };

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:8000/api/auth/verify-totp", {
      phone,
      otp,
    });
    localStorage.setItem("token", res.data.access_token);
    alert("Login successful!");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">TOTP Login (AgroGPT)</h2>

      <input
        type="text"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mb-3 rounded w-64"
      />

      {!isSetup ? (
        <button onClick={handleGenerateQR} className="bg-green-600 text-white p-2 rounded">
          Generate QR for Authenticator
        </button>
      ) : (
        <>
          {qrImage && <img src={qrImage} alt="QR Code" className="my-4 w-48" />}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 mb-3 rounded w-64"
          />
          <button onClick={handleVerify} className="bg-blue-600 text-white p-2 rounded">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}

export default OtpLogin;
