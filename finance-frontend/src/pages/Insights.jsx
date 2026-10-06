import { useState, useEffect } from "react";
import api from "../utils/api";
export default function Insights() {
  const [open, setOpen] = useState(true);
  const [summary, setSummary] = useState(null);

  async function getInsights() {
    const res = await api.get("/transactions/insights");
    setSummary(res.data);
  }
  useEffect(() => {
    getInsights();
  }, []);
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
            <span>Average Daily Spending: ${summary?.dailySpend}</span>
          </div>

          <div className="insight-item">
            <span className="icon">🧾</span>
            <span>Total Transactions: {summary?.totalTransactions || 0}</span>
          </div>
        </div>
      )}
    </div>
  );
}
