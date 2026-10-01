import { useState, useEffect } from "react";
import { API_URL, authHeader } from "../utils/api";

export default function EditTransaction({ editing, cancel, reload }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    description: ""
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  if (!editing) return null;
  if (!form) return null;

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();

    await fetch(`${API_URL}/transactions/${editing.id}`, {
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
    <form onSubmit={submit}>
      <h3>Edit Transaction</h3>

      <input
        value={form.amount}
        onChange={e => updateField("amount", e.target.value)}
      />

      <input
        value={form.category}
        onChange={e => updateField("category", e.target.value)}
      />

      <input
        type="date"
        value={form.date}
        onChange={e => updateField("date", e.target.value)}
      />

      <input
        value={form.description}
        onChange={e => updateField("description", e.target.value)}
      />

      <button>Update</button>
      <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}
