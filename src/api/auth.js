// src/api/auth.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

export async function signup(name, phone) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, phone })
  });
  return res.json();
}

export async function loginLegacy(phone, otp) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone, otp })
  });
  return res.json();
}

export async function generateTOTP(phone) {
  // returns PNG blob
  const res = await fetch(`${API_BASE}/api/auth/generate-totp/${phone}`);
  if (!res.ok) throw new Error("QR generation failed");
  return res.blob();
}

export async function verifyTOTP(phone, token) {
  const res = await fetch(`${API_BASE}/api/auth/verify-totp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone, token })
  });
  return res.json();
}

export async function loginTOTP(phone, totp) {
  const res = await fetch(`${API_BASE}/api/auth/login-totp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone, totp })
  });
  return res.json();
}
