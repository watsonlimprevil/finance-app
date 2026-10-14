import { useState } from "react";

export default function OnboardingModal({ onFinish, user }) {
  const [step, setStep] = useState(1);

  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  };

  const modalStyle = {
    width: "420px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.45)",
    animation: "fadeIn 0.3s ease",
  };

  const btn = {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "15px",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={modalStyle}>
        {step === 1 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>
              Welcome {user?.name} to BudgetSense
            </h2>
            <p style={{ lineHeight: "1.5", marginBottom: "20px" }}>
              This app helps track manage and give insights on your finance all
              at the touch of your fingertips!!
            </p>
            <button
              style={{ ...btn, background: "#2575fc", color: "white" }}
              onClick={() => setStep(2)}
            >
              Next
            </button>

            <button
              style={{ ...btn, background: "transparent", color: "#ccc" }}
              onClick={onFinish}
            >
              Skip
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>What you can do here🚀</h2>
            <ul>
              <li>📌Create and manage teams</li>
              <li>📁Build projects with tasks</li>
              <li>⌛Track your activity and progress</li>
              <li>🤖 Use the Ai assistant to plan and organize</li>
              <li>📊 View insight and productivity stats</li>
            </ul>
            <button
              style={{ ...btn, background: "#2575fc", color: "white" }}
              onClick={() => setStep(3)}
            >
              Next
            </button>
            <button
              style={{ ...btn, background: "transparent", color: "#ccc" }}
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>Lets get started 🎯</h2>
            <p style={{ lineHeight: "1.5", marginBottom: "20px" }}>
              You can begin by creating ypur first team or project. Or let the
              Ai assitant help you set everything up.
            </p>

            <button
              style={{ ...btn, background: "#1e1e1e", color: "#ccc" }}
              onClick={() => {
                onFinish();
              }}
            >
              Create your first team
            </button>

            <button
              style={{ ...btn, background: "#1e1e1e", color: "#ccc" }}
              onClick={() => {
                onFinish();
              }}
            >
              Create your first Project
            </button>
            <button
              style={{ ...btn, background: "#2575fc", color: "#ccc" }}
              onClick={onFinish}
            >
              Finish
            </button>
            <button
              style={{ ...btn, background: "transparent", color: "#ccc" }}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
