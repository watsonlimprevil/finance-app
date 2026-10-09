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
      if (res.message === "Goal was deleted") {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      }
    } catch (error) {
      console.log("unable to delete goal", error);
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

      <h1>Budgets</h1>
      <div style={{ marginTop: 20 }}>
        <h2>Add Budget</h2>

        <input
          type="text"
          placeholder="Category(leave empty for monthly budget)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addBudget}>Add</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>Your Budgets</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {budgets.map((b) => (
              <li key={b.id}>
                <strong>{b.category || "Monthly Budget"}:</strong>${b.amount}
                <button
                  onClick={() => deleteBudget(b.id)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <BudgetProgress progress={budgetProgress} />

      <button
        className="add-transaction-btn"
        onClick={() => setShowGoalsModal(true)}
      >
        + Add Goals
      </button>

      {showGoalsModal && (
        <AddGoalsModal
          onAdd={addGoals}
          onClose={() => setShowGoalsModal(false)}
        />
      )}

      {goals?.map((g) => (
        <div key={g.id}>
          <span>
            {g.name} - {g.deadline} - {g.current_amount} - {g.target_amount}
          </span>
          <button onClick={() => DeleteGoal(g.id)}>Delete Goal</button>
        </div>
      ))}
    </div>
  );
}
