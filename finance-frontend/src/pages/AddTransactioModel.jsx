import { useState } from "react";

export default function AddTransactionModal({ show, onClose, onAdd }) {
  if (!show) return null;

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    const inputDate = new Date(date);
    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth());
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const isInThisMonth = inputDate >= startOfMonth && inputDate < endOfMonth;
    const isNotFuture = inputDate <= today;

    if (!isInThisMonth) {
      alert("You can only add transactions from this month");
      return;
    }
    if (!isNotFuture) {
      alert("You cannot add future dates");
      return;
    }
    onAdd({
      amount,
      type,
      category,
      date,
      description,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button className="primary" onClick={handleSubmit}>
            Add
          </button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
