import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin() {
    if (!email || !password) {
      setError("Email and password must be set");
      return;
    }
    setLoading(true);
    const res = await api.post("/auth/login", { email, password });
    if (!res.token) {
      setError("error loggin in");
      return;
    }
    nav("/dashboard");
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/login-wallpaper.png')",
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
          placeholder="enter password"
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
          onClick={handleLogin}
          style={{
            width: "100%",
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
        {error && (
          <div
            style={{
              marginTop: "15px",
              color: "#ff6b6b",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
        <span
          onClick={() => nav("/register")}
          style={{
            marginTop: "25px",
            padding: "10px 18px",
            borderRadius: "25px",
            border: "1px solid #00eaff",
            color: "#00eaff",
            fontSize: "15px",
            fontWeight: "600",
            textAlign: "center",
            width: "70%",
            marginLeft: "auto",
            display: "block",
            marginRight: "auto",
            transition: "all 0.25 ease",
          }}
        >
          Dont have a account? Register here
        </span>
      </div>
    </div>
  );
}
