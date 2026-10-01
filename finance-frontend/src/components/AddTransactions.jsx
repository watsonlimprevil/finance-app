import { useState } from "react";
import { API_URL, authHeader } from "../utils/api";

export default function AddTransaction({ reload }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  async function submit(e) {
    e.preventDefault();

    await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
      body: JSON.stringify({
        amount,
        type,
        category,
        date,
        description
      })
    });

    reload();
  }

  return (
    <form onSubmit={submit}>
      <h3>Add Transaction</h3>

      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  );
}
