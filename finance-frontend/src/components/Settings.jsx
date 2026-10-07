import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState("dark");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordModel, setPasswordModel] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function updateMonthlyBudget() {
    try {
      const res = await api.patch(`/transactions/budgets/monthly`, {
        budget: Number(monthlyBudget),
      });

      if (!res.ok) throw new Error("Failed to update budget");
      setMessage("Monthly budget updated successfully");
    } catch (error) {
      setMessage(error.message);
    }
  }
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function saveCurrency() {
    localStorage.setItem("currency", currency);
    setMessage("currency preference saved.");
  }

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setMessage(`theme switched to ${newTheme}`);
  }

  async function changePassword() {
    if (
      oldPassword.trim() === "" ||
      newPassword.trim === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("all fields must be set");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("new password does not match confirm password");
      return;
    }

    try {
      const res = await api.patch("/auth/changepassword", {
        oldPassword,
        newPassword,
      });
      if (res.data.message === "Password updated successfully") {
        alert("password succesfully updated");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log("error updating password");
    }
  }

  async function resetAllData() {
    try {
      const res = await api.delete(`/transactions/reset`);
      if (!res.ok) throw new Error("Failed to reset data");
      setMessage("all data has been reset");
    } catch (err) {
      setMessage(err.message);
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      {message && <p style={{ color: "lime" }}>{message}</p>}

      <section>
        <h2>Monthly Budget</h2>
        <input
          type="number"
          placeholder="Enter new monthly budget"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
        />
        <button onClick={updateMonthlyBudget}> update Budget</button>
      </section>

      <section>
        <h2>Theme</h2>
        <button onClick={toggleTheme}>
          switch to {theme === "dark" ? "light" : "dark"}
        </button>
      </section>

      <div>
        <button onClick={() => setPasswordModel(true)}>Change Password</button>
      </div>

      {passwordModel && (
        <div>
          <input
            value={oldPassword}
            placeholder="enter your old password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            value={newPassword}
            placeholder="enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            value={confirmPassword}
            placeholder="confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={changePassword}>Change password</button>
          <button onClick={() => setPasswordModel(false)}>Cancel</button>
          {error && <p>{error}</p>}
        </div>
      )}

      <section>
        <h2 style={{ color: "red" }}>Danger Zone</h2>
        <button
          style={{ background: "red", color: "white" }}
          onClick={resetAllData}
        >
          Reset All Data
        </button>
      </section>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
