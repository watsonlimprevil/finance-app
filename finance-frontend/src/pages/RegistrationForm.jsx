import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const [name, setName] = useState("");

  async function handleSignUp() {
    if (password.trim() !== confirmPassword.trim()) {
      setError("password not the same");
      return;
    }
    const res = await api.post("/auth/register", { email, password });
    if (!res.data.token) {
      setError("unable to complete registration");
      return;
    }
    localStorage.setItem("token", res?.data?.token);
    nav("/dashboard");
    setError(null);
  }

  async function sendVerificationcode() {
    try {
      const res = await api.post("auth/sendVerificationCode", { email });
      if (res.message === "verfication code successfully sent") {
        alert("code has been set to your email");
      }
      localStorage.removeItem("token");
      setShowCode(true);
    } catch (err) {
      alert("eror sendding code");
      console.log("error sending code", err);
    }
  }

  async function checkVerificationCode() {
    try {
      const res = await api.post("/auth/checkverificationcode", {
        code,
        email,
      });
      if (res.data.message !== "code successfully verified") {
        return setError("error verifiying code");
      }
      setShowpassword(true);
    } catch (err) {
      setError("code is not correct");
      console.log("error verifying the user code", err);
    }
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
        <h1>Lets create your Account!</h1>
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
          placeholder="Enter your name..."
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #6a11cb , #2575fc)",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={sendVerificationcode}
        >
          Verify Email
        </button>
        {error && <div>{error}</div>}

        {showCode && (
          <div>
            <input
              value={code}
              placeholder="enter the code"
              onChange={(e) => setCode(e.target.value)}
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
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #6a11cb , #2575fc)",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={checkVerificationCode}
            >
              Verify code
            </button>
          </div>
        )}

        {showPassword && (
          <div>
            <input
              type="password"
              value={password}
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                marginBotttom: "15px",
                borderRadius: "10px",
                border: "none",
                background: "#1e1e1e",
                color: "white",
                fontSize: "16px",
              }}
            />
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassowrd(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                marginBotttom: "15px",
                borderRadius: "10px",
                border: "none",
                background: "#1e1e1e",
                color: "white",
                fontSize: "16px",
              }}
            />
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #6a11cb , #2575fc)",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
