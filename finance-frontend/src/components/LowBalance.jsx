export default function LowBalance({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        background: "white",
        padding: "16px",
        borderRadius: "8px",
        border: "3px solid red",
        animation: "flashBorder 1s infinite",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        maxWidth: "260px",
        fontFamily: "sans-serif",
      }}
    >
      <h4>⚠️ Balance Running Low</h4>
      <p style={{ margin: "0 0 12px", fontSize: "14px" }}>
        Your remaining budget is critically low. Consider reducing non-essential
        spending.
      </p>
      <button
        onClick={onClose}
        style={{
          padding: "6px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Dismiss
      </button>
      <style>
        {`@keyframes flashBorder{
                    0% {border-color: red;}
                    50% {border-color: darkred ;}
                    500% {border-color: red}
                    }
               `}
      </style>
    </div>
  );
}
