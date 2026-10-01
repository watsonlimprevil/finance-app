import { useState } from "react";
import { API_URL } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
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
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
