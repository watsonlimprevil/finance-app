import { useState, useEffect } from "react";
import api from "../utils/api";

export default function EditTransaction({ editing, cancel, reload }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
      setErrors({});
    }
  }, [editing]);

  if (!editing) return null;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.amount || isNaN(form.amount)) {
      newErrors.amount = "Amount must be a number";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero";
    }

    if (!form.type || (form.type !== "income" && form.type !== "expense")) {
      newErrors.type = "Type must be income or expense";
    }

    if (!form.category || form.category.trim() === "") {
      newErrors.category = "Category is required";
    }

    if (!form.date || isNaN(Date.parse(form.date))) {
      newErrors.date = "Invalid date format";
    }

    if (!form.description || form.description.trim() === "") {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit(e) {
    e.preventDefault();

    if (!validate()) return;

    await api.put(
      `${import.meta.env.VITE_API_URL}/transactions/${editing.id}`,
      form,
    );

    reload();
    cancel();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Transaction</h3>

        <form onSubmit={submit}>
          <label>Amount</label>
          <input
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
          />

          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label>Category</label>
          <input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />

          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />

          <label>Description</label>
          <input
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <div className="modal-actions">
            <button className="primary" type="submit">
              Update
            </button>
            <button className="secondary" type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
