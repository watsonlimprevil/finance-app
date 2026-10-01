import { useEffect, useState } from "react";
import { API_URL, authHeader } from "../utils/api.js";
import Summary from "../components/Summary.jsx";
import Transactions from "../components/Transactions.jsx";
import CategoryPieChart from "../components/CategoryPieChart.jsx";
import AddTransaction from "../components/AddTransactions.jsx";
import EditTransaction from "../components/EditTransactions.jsx";

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    reloadAll();
  }, []);

  function reloadAll() {
    loadSummary();
    loadTransactions();
  }

  async function loadSummary() {
    const res = await fetch(`${API_URL}/transactions/summary`, {
      headers: authHeader()
    });
    setSummary(await res.json());
  }

  async function loadTransactions() {
    const res = await fetch(`${API_URL}/transactions`, {
      headers: authHeader()
    });
    const data = await res.json();
    setTransactions(data.transactions);
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <Summary summary={summary} />

      <CategoryPieChart data={summary.byCategory || []} />

      <AddTransaction reload={reloadAll} />

      <EditTransaction editing={editing} cancel={() => setEditing(null)} reload={reloadAll} />

      <Transactions
        transactions={transactions}
        reload={reloadAll}
        startEdit={t => setEditing(t)}
      />
    </div>
  );
}

