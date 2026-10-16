import { useState } from "react";
import api from "../utils/api";

export default function VerificationForm({ onclose }) {
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  async function handleVerify() {
    try {
      const res = await api.post("/user/getcode", { email, newPassword, code });
      if (res.ok) {
        alert("password updated succesfully");
      }
    } catch (err) {
      console.log("unable to update password");
    }
  }
  return (
    <div className="verification-form">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter email"
        type="email"
      />
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="enter the code sent to your email"
      />
      <input
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type=" new password"
        placeholder="enter your password"
      />
      <button onClick={handleVerify}>Reset Password</button>
      <button onClick={onclose}>Cancel</button>
    </div>
  );
}
