import { useState, useLayoutEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
document.documentElement.setAttribute("data-theme", "dark");
document.documentElement.style.setProperty("--accent-color", "#6366f1");
export default function Settings() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    theme: "dark",
    accentColor: "#6366f1",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadSettings = async () => {
    try {
      const res = await api.get("/settings/global");
      const data = res.data;

      const theme = data.preferences?.theme || "dark";
      const accent = data.prferences?.accentColor || "#6366f1";
      setPreferences({ theme, accentColor: accent });

      applyTheme(theme);
      applyAccent(accent);
    } catch (err) {
      console.error("Failed to load settings", err);
    }
  };

  useLayoutEffect(() => {
    loadSettings();
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch (error) {
      console.error("Fialed to load user", error);
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const applyAccent = (color) => {
    document.documentElement.setProperty("--accent-color", color);
  };

  const handleSavePreferences = async () => {
    try {
      await api.post("/settings/global", { preferences });
      applyTheme(preferences.theme);
      applyAccent(preferences.accentColor);
      alert("Preferences saved");
    } catch (err) {
      alert("failed  to save preferences");
    }
  };

  const handleChangePassword = async () => {
    if (oldPassword.trim() === "" || newPassword.trim() === "") {
      alert("new password and old password  must be set");
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      alert("confirm password and password do not match");
      return;
    }

    try {
      await api.put("/auth/changepassword", { oldPassword, newPassword });
      alert("password chnaged succesfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      alert("Failed to chnage password");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/auth/delete-account");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="settings-page">
      <button className="back-btn" onClick={handleGoBack}>
        ← Back
      </button>

      <h1 className="settings-title">Settings</h1>

      {/* Profile */}
      <section className="settings-card">
        <h2>Profile</h2>

        {user ? (
          <div className="profile-section">
            {/* Avatar */}
            <div className="settings-field">
              <label>Avatar{user.avatarUrl}</label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="profile-avatar"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  placeholder="select new profile picture"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("avatar", file);

                    try {
                      const res = await api.post("/user/avatar", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });

                      setUser((prev) => ({
                        ...prev,
                        avatarUrl: res.data.avatarUrl,
                      }));
                    } catch (err) {
                      alert("Failed to update avatar");
                    }
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <div className="settings-field">
              <label>Name</label>
              <input
                type="text"
                value={user.name || ""}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Email (read-only) */}
            <div className="settings-field">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
            </div>

            <button
              className="settings-btn"
              onClick={async () => {
                try {
                  await api.put("/api/user/update", {
                    name: user.name,
                  });
                  alert("Profile updated");
                } catch (err) {
                  alert("Failed to update profile");
                }
              }}
            >
              Save Profile
            </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </section>

      {/* Preferences */}
      <section className="settings-card">
        <h2>Appearance</h2>

        <div className="settings-field">
          <label>Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => {
              const theme = e.target.value;
              setPreferences({ ...preferences, theme });
              applyTheme(theme);
            }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="settings-field">
          <label>Accent Color</label>
          <input
            type="color"
            value={preferences.accentColor}
            onChange={(e) => {
              const color = e.target.value;
              setPreferences({ ...preferences, accentColor: color });
              applyAccent(color);
            }}
          />
        </div>

        <button className="settings-btn" onClick={handleSavePreferences}>
          Save Appearance
        </button>
      </section>

      {/* Account */}
      <section className="settings-card">
        <h2>Account</h2>

        <button
          style={{
            width: "80%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #6a11cb , #2575fc)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onClick={() => setShowPasswordForm(true)}
        >
          Change Password
        </button>
        {showPasswordForm && (
          <div className="password-form-card" style={{ position: "relative" }}>
            <input
              value={oldPassword}
              type="password"
              placeholder="old password..."
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              value={newPassword}
              type="password"
              placeholder="new Password..."
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              value={confirmPassword}
              placeholder="confirm passowrd"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="save-btn" onClick={handleChangePassword}>
              Save
            </button>
            <button
              className="close-btn"
              onClick={() => setShowPasswordForm(false)}
            >
              ❌
            </button>
          </div>
        )}

        <button className="danger-btn" onClick={() => setDeleting(true)}>
          Delete Account
        </button>
        {deleting && (
          <div>
            <p>
              Are you sure you want to delete your account? this action cannot
              be undone
            </p>
            <button onClick={handleDeleteAccount}>Confirm</button>
            <button onClick={() => setDeleting(false)}>Cancel</button>
          </div>
        )}
      </section>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
