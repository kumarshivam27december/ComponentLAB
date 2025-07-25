"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type Session = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    // Decode JWT to get email and extract name
    try {
      const decoded: any = jwtDecode(token);
      if (decoded && decoded.email) {
        const name = decoded.email.split("@")[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    } catch {}
    axios
      .get("/api/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSessions(res.data))
      .catch(() => setError("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleNewSession = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "/api/sessions",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push(`/playground/${res.data._id}`);
    } catch {
      setError("Failed to create session");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto 0 auto",
          padding: 32,
          width: "100%",
        }}
      >
        {userName && (
          <h3
            style={{
              color: "#39ff14",
              marginBottom: 12,
              fontFamily: 'Share Tech Mono, monospace',
              textShadow: '0 0 10px #39ff14'
            }}
          >
            Welcome back, {userName}!
          </h3>
        )}
        <h2>Dashboard</h2>

        <button onClick={handleNewSession} style={{ marginBottom: 16 }}>
          + New Session
        </button>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {sessions.map((session) => (
              <li key={session._id} style={{ marginBottom: 8 }}>
                <a href={`/playground/${session._id}`}>
                  Session {session._id.slice(-6)} (Last updated:{" "}
                  {new Date(session.updatedAt).toLocaleString()})
                </a>
              </li>
            ))}
          </ul>
        )}

        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
