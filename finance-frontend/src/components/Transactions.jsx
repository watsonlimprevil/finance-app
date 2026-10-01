import { API_URL, authHeader } from "../utils/api.js";

export default function Transactions({ transactions = [], reload, startEdit }) {

  async function remove(id) {
    await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: authHeader()
    });
    reload();
  }

  return (
    <div>
      <h2>Your Transactions</h2>

      {transactions.map(t => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          {t.date} — {t.type} — {t.category} — ${t.amount}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => startEdit(t)}
          >
            Edit
          </button>

          <button
            style={{ marginLeft: "10px", color: "red" }}
            onClick={() => remove(t.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
