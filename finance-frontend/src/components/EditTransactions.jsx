import { useState, useEffect } from "react";
import { API_URL, authHeader } from "../utils/api";

export default function EditTransaction({ editing, cancel, reload }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
    date: "",
    description: ""
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
    setForm(prev => ({ ...prev, [key]: value }));
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

    await fetch(`${import.meta.env.VITE_API_URL}/transactions/${editing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
      body: JSON.stringify(form)
    });

    reload();
    cancel();
  }

  return (
    <div className="card">
      <form onSubmit={submit}>
        <h3>Edit Transaction</h3>

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={e => updateField("amount", e.target.value)}
        />
        {errors.amount && <p className="error">{errors.amount}</p>}

        <select
          value={form.type}
          onChange={e => updateField("type", e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {errors.type && <p className="error">{errors.type}</p>}

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => updateField("category", e.target.value)}
        />
        {errors.category && <p className="error">{errors.category}</p>}

        <input
          type="date"
          value={form.date}
          onChange={e => updateField("date", e.target.value)}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <input
          placeholder="Description"
          value={form.description}
          onChange={e => updateField("description", e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <button>Update</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
}
