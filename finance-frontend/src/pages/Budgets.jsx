import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import BudgetProgress from "../components/BudgetProgress";
import AddGoalsModal from "./AddGoalsModal";
export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [budgetProgress, setBudgetProgress] = useState(null);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [error, setError] = useState("");
  const [goals, setGoals] = useState([]);

  function formData(dateString) {
    return new Date(
      dateString.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
  }

  useEffect(() => {
    loadBudgets();
    loadBudgetProgress();
    loadGoals();
  }, []);

  async function loadBudgets() {
    setLoading(true);
    const res = await api.get(`/transactions/budgets`);

    const result = await res.data;
    setBudgets(result.budgets);
    setLoading(false);
  }
  async function loadBudgetProgress() {
    const res = await api.get(`/transactions/budgets/progress`);

    setBudgetProgress(res.data.progress);
  }

  async function addBudget() {
    const montlyBugetCheck = await api.get(`/transactions/budgets/progress`);
    const monthybudget = montlyBugetCheck.data.monthly.budget;

    if (monthybudget.length > 1) {
      alert(
        "cannot add new monthly budget with deleting current monthly budget",
      );
      return;
    }
    const res = await api.post(`/transactions/budgets`, { category, amount });

    await loadBudgets();
    setAmount("");
    setCategory("");
  }

  async function addGoals(data) {
    try {
      const res = await api.post("/goals/addgoals", data);
      if (res.data.message === "successfully inputed goal") {
        alert("goals succesfully added");
      }
      loadGoals();
    } catch (err) {
      console.log("error adding goals", err);
    }
  }
  async function loadGoals() {
    const res = await api.get("/goals/getgoals");
    setGoals(res.data);
  }
  async function deleteBudget(id) {
    await api.delete(`/transactions/budgets/${id}`);
    loadBudgets();
  }

  async function DeleteGoal(id) {
    try {
      const res = await api.delete(`/goals/deletegoals/${id}`);

      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.log("unable to delete goal", error);
    }
  }
  return (
    <div className="budgets-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h1 className="page-title">Budgets</h1>

      <section className="add-budget-section">
        <h2>Add Budget</h2>

        <div className="form-row">
          <input
            type="text"
            placeholder="Category (leave empty for monthly budget)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button className="primary-btn" onClick={addBudget}>
            Add
          </button>
        </div>
      </section>

      <section className="budget-list-section">
        <h2>Your Budgets</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="budget-list">
            {budgets.map((b) => (
              <li key={b.id} className="budget-item">
                <span className="budget-label">
                  <strong>{b.category || "Monthly Budget"}:</strong> ${b.amount}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteBudget(b.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <BudgetProgress progress={budgetProgress} />

      <button className="add-goal-btn" onClick={() => setShowGoalsModal(true)}>
        + Add Goals
      </button>

      {showGoalsModal && (
        <AddGoalsModal
          onAdd={addGoals}
          onClose={() => setShowGoalsModal(false)}
        />
      )}

      <section className="goals-section">
        <h2>Your Goals</h2>

        {goals.map((g) => (
          <div key={g.id} className="goal-card">
            <div className="goal-header">
              <h3>{g.name}</h3>
              <span className="goal-deadline">{formData(g.deadline)}</span>
            </div>
            <div className="goal-progress-info">
              <span>
                {g.current_amount} / {g.target_amount}
              </span>
            </div>
            <button
              className="delete-goal-btn"
              onClick={() => DeleteGoal(g.id)}
            >
              Delete Goal
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
