import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function OnboardingModal({ onFinish, user }) {
  const [step, setStep] = useState(1);
  const nav = useNavigate();

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
            <h1 style={{ marginBottom: "10px" }}>
              Welcome {user?.name} to BudgetSense🤖
            </h1>
            <h2>📊Welcome to the dashboard section! here you can</h2>
            <ul>
              <li>View your various monthly transactions</li>
              <li>➕Add new monthly transactions</li>
              <li>
                📈We have graphs and charts that gives a breakdown of your
                comings and outgoings for the month
              </li>
              <li>🤏🏾sort and filter through your various transactions</li>
            </ul>
            <button
              style={{ ...btn, background: "#2575fc", color: "white" }}
              onClick={() => {
                setStep(2);
                nav("/budgets");
              }}
            >
              🔥 Let me show you around
            </button>

            <button
              style={{ ...btn, background: "transparent", color: "#ccc" }}
              onClick={() => {
                (onFinish, localStorage.removeItem("token"));
              }}
            >
              Skip
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>
              Welcome to the budget and goals sections🚀
            </h2>
            <span>
              welcome to one of my favourite sections of the app here you can
            </span>
            <ul>
              <li>💴Add monthly budget</li>
              <li>💴Add budget by various categories</li>
              <li>💴Add and track money goals</li>
            </ul>
            <button
              style={{ ...btn, background: "#2575fc", color: "white" }}
              onClick={() => {
                setStep(3);
                nav("/insights");
              }}
            >
              Next
            </button>
            <button
              style={{ ...btn, background: "transparent", color: "#ccc" }}
              onClick={() => {
                (setStep(1), nav("/dashboard"));
              }}
            >
              Back
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>Lets get started 🎯</h2>
            <p style={{ lineHeight: "1.5", marginBottom: "20px" }}>
              🔎 Welcome to insights here you track your average daily spending
              and aswell as sepending per category. and also you can ask ai on
              advice your various money goals🔎
            </p>

            <button
              style={{ ...btn, background: "#1e1e1e", color: "#ccc" }}
              onClick={() => {
                setStep(4);
                nav("/settings");
              }}
            >
              Lets go check out settings 🛠️
            </button>

            <button
              style={{ ...btn, background: "#1e1e1e", color: "#ccc" }}
              onClick={() => {
                onFinish();
              }}
            >
              skip Settings
            </button>
            {step === 4 && (
              <>
                <h2>Welcome to the Settings page. here you can..🛠️</h2>

                <ul>
                  <li>🧑🏾‍🏫Add profile picture</li>
                  <li>Logout from your account</li>
                  <li>Change the theme and appeaarence of the app</li>
                  <li>Change your password hassle free</li>
                </ul>
                <button
                  onClick={() => {
                    (nav("/budgets"), localStorage.removeItem("token"));
                  }}
                >
                  💸Lets Created a Budget to Begin!!💸
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
