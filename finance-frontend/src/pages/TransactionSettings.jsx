import api from "../utils/api";
import { useEffect } from "react";
export default function TransactionSettings() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = usestate(false);
  const [error, setError] = useState(null);
  async function loadTransactions() {
    setLoading(true);
    try {
      const res = await api.get("/transactions");
      const data = res.data.transactions;
      setTransactions(data);
    } catch (error) {
      setError("unable to load transactions");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Transactions</h1>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h1>Your Transactions</h1>
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
        </div>
      ))}
    </div>
  );
}
