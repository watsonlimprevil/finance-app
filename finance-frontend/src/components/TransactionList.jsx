export default function TransactionList({ transactions, startEdit, remove }) {
  return (
    <div className="transaction-list">
      {transactions?.map((t) => (
        <div key={t.id} className="transaction-card">
          <div className="transaction-info">
            <div className={`type ${t?.type}`}>
              {t?.type === "income" ? "⬆" : "⬇"}
            </div>
            <div className="details">
              <p className="category">{t?.category}</p>
              <p className="date">
                {new Date(t?.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="amount">${Number(t?.amount)}</p>
          </div>
          <div className="actions">
            <button className="edit-btn" onClick={() => startEdit(t)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => remove(t)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
