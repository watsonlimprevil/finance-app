import { useState } from "react";

export default function Insights({ summary }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card collapsible-card">
      <div className="collapse-header" onClick={() => setOpen(!open)}>
        <h2 className="card-title">Insights</h2>
        <span className="collapse-icon">{open ? "▼" : "▶"}</span>
      </div>

      {open && (
        <div className="collapse-content">
          <div className="insight-item">
            <span className="icon">🔎</span>
            <span>
              Highest Category:{" "}
              {summary?.highestCategory?.category
                ? `${summary.highestCategory.category} ($${summary.highestCategory.total})`
                : "None"}
            </span>
          </div>

          <div className="insight-item">
            <span className="icon">📅</span>
            <span>Average Daily Spending: ${summary?.averageDailySpending || 0}</span>
          </div>

          <div className="insight-item">
            <span className="icon">🧾</span>
            <span>Total Transactions: {summary?.count || 0}</span>
          </div>
        </div>
      )}
    </div>
  );
}
