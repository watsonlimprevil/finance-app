import { useState } from "react";
import { API_URL } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("testing saving");
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      nav("/dashboard");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/login-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        transition: "filter 0.3s ease",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.4)",
          color: "white",
          transition: "opacity 0.6s ease",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Login
        </h1>
        <input
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#1e1e1e",
            color: "white",
            fontSize: "16px",
          }}
        />

        <input
          placeholder="enter email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#1e1e1e",
            color: "white",
            fontSize: "16px",
          }}
        />

        <button
          onClick={submit}
          style={{
            width: "1000%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #6a11cb , #2572fc)",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "Logggin In" : "Login"}
        </button>
      </div>
    </div>
  );
}
