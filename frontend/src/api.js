// src/api.js

const BASE_URL =
  process.env.REACT_APP_API_URL?.trim().replace(/\/$/, "") || "http://localhost:8000";

export async function fetchAllLogs() {
  try {
    const res = await fetch(`${BASE_URL}/api/behavior`);
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch logs:", error);
    return [];
  }
}

export async function sendBehaviorLog(logData) {
  try {
    const res = await fetch(`${BASE_URL}/api/behavior`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to send log:", error);
    return null;
  }
}
