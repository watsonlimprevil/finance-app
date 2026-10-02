import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [error, setError] = useState(null);

  async function handleSignUp() {
    if (password !== confirmPassword) {
      setError("password not the same");
      return;
    }
    const res = await api.post("/auth/register", { email, password });
    if (!res.ok) {
      setError("unable to complete login");
      return;
    }
    nav("/");
    setError(null);
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
        position: "relative",
        padding: "20px",
        transition: "filter 0.3s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "420px",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(12px)",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.45)",
            color: "white",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Create Account
          </h1>
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              background: "#1e1e1e",
              color: "white",
              fontSize: "16px",
            }}
          />

          <input
            placeholder="enter new password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
              background: "#1e1e1e",
              color: "white",
            }}
          />

          <input
            placeholder="enter new password"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassowrd(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
              background: "#1e1e1e",
              color: "white",
            }}
          />

          <button
            onClick={handleSignUp}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Register
          </button>
          {error && <div>{error}</div>}
          <span
            onClick={() => {
              nav("/");
            }}
            style={{
              display: "block",
              marginTop: "20px",
              textAlign: "center",
              cursor: "pointer",
              color: "#cfcfcf",
              fontSize: "15px",
            }}
          >
            Have A account?
          </span>
        </div>
      </div>
    </div>
  );
}
