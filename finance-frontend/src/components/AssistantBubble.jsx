export default function AssistantBubble({ onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "white",
        padding: "14px 18px",
        borderRadius: "50px",
        cursor: "pointer",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        fontWeight: "600",
        fontSize: "15px",
        userSelect: "none",
        transition: "transform 0.15s ease",
        zIndex: 50,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      🧠 Ask AI?
    </div>
  );
}
