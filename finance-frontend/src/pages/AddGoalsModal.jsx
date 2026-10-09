import { useState } from "react";

export default function AddGoalsModal({ onClose, onAdd }) {
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  function handleSubmit() {
    onAdd({
      deadline,
      target_amount: targetAmount,
      current_amount: currentAmount,
      target_amount: targetAmount,
      name,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Goals</h2>

        <input
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <textarea
          placeholder="current Amount"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
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
