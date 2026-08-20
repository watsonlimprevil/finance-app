import { useState } from "react";

export default function BudgetProgress({ progress }) {
  const [open, setOpen] = useState(true);

  if (!progress) return null;

  const monthly = progress.monthly;

  return (
    <div className="card collapsible-card">
      <div className="collapse-header" onClick={() => setOpen(!open)}>
        <h2 className="card-title">Budget Progress</h2>
        <span className="collapse-icon">{open ? "▼" : "▶"}</span>
      </div>

      {open && (
        <div className="collapse-content">

          {/* Monthly Budget */}
          {monthly && (
            <div className="budget-item">
              <span className="icon">📆</span>
              <span className="category">Monthly Budget</span>

              <span>Budget: ${monthly.budget}</span>
              <span>Spent: ${monthly.spent}</span>
              <span>Remaining: ${monthly.remaining}</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${monthly.percent}%`,
                    background: monthly.exceeded ? "red" : "green"
                  }}
                />
              </div>

              {monthly.exceeded && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  You exceeded your monthly budget!
                </p>
              )}
            </div>
          )}

          {/* Category Budgets */}
          <h3 style={{ marginTop: 20 }}>Category Budgets</h3>

          {progress.categories.length === 0 && (
            <p>No category budgets set.</p>
          )}

          {progress.categories.map(cat => (
            <div key={cat.category} className="budget-item">
              <span className="icon">🏷️</span>
              <span className="category">{cat.category}</span>

              <span>Budget: ${cat.budget}</span>
              <span>Spent: ${cat.spent}</span>
              <span>Remaining: ${cat.remaining}</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${cat.percent}%`,
                    background: cat.exceeded ? "red" : "green"
                  }}
                />
              </div>

              {cat.exceeded && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  You exceeded your {cat.category} budget!
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
