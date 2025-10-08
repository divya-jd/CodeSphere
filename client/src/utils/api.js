const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getSessions = async () => {
  const res = await fetch(`${API_BASE}/sessions`);
  return res.json();
};

export const createSession = async (roomId) => {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId }),
  });
  return res.json();
};
