import { useState } from "react";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) nav("/");
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submit}>
        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
        <button>Register</button>
      </form>
    </div>
  );
}
