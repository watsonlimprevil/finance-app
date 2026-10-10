import { useState } from "react";
import api from "../api/axios";

const btnStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#1e1e1e",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
};

export default function AssistantWindow({ userState, onClose }) {
  const messages =
    userState === "empty"
      ? [
          "Hey! Looks like you're just getting started.",
          "You don't have any transactions listed yet",
          "Want help adding your transactions?",
        ]
      : ["Welcome back!", "Need well with some insights on your transaction"];

  const [input, setInput] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  async function askAI(customMessage) {
    try {
      setLoading(true);

      const messageToSend = customMessage || input;

      const res = await api.post("/assistant/ask", {
        message: messageToSend,
      });

      setReply(res.data.reply);
      setInput("");
    } catch (err) {
      setReply("Something went wrong talking to the assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "320px",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
        padding: "20px",
        borderRadius: "16px",
        color: "white",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.45)",
        zIndex: 60,
        maxHeight: "60vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          marginBottom: "15px",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Assistant
      </div>

      {messages.map((m, i) => (
        <div key={i} style={{ marginBottom: "8px", fontSize: "14px" }}>
          {m}
        </div>
      ))}

      {userState === "empty" ? (
        <>
          <button
            style={btnStyle}
            onClick={() => askAI("Help me create my first team")}
          >
            Create your first team
          </button>

          <button
            style={btnStyle}
            onClick={() => askAI("Help me create my first project")}
          >
            Create your first project
          </button>

          <button
            style={btnStyle}
            onClick={() => askAI("Show me around the app")}
          >
            Show me around
          </button>
        </>
      ) : (
        <>
          <button
            style={btnStyle}
            onClick={() =>
              askAI("Suggest next actions for my teams and projects")
            }
          >
            Suggest next actions
          </button>

          <button
            style={btnStyle}
            onClick={() => askAI("Summarize my recent activity")}
          >
            Summarize my activity
          </button>

          <button
            style={btnStyle}
            onClick={() => askAI("Help me plan a project")}
          >
            Help plan a project
          </button>
        </>
      )}

      {/* AI Reply */}
      {reply && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          {reply}
        </div>
      )}

      {/* Input + Ask AI */}
      <div style={{ marginTop: "15px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        />

        <button
          onClick={() => askAI()}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#2575fc",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "10px",
          background: "transparent",
          border: "none",
          color: "#ccc",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Close
      </button>
    </div>
  );
}
