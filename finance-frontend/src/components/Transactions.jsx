import { useState } from "react";
import TransactionList from "./TransactionList";
export default function TransactionsPage({
  transactions,
  reload,
  startEdit,
  remove,
}) {
  const [search, setSearch] = useState("");

  const filtered = transactions?.filter(
    (t) =>
      t?.category.toLowerCase().includes(search.toLowerCase()) ||
      t?.type.toLowerCase().inlcludes(search.toLowerCase()) ||
      stringify(t?.amount).includes(search),
  );

  return (
    <div className="page-container">
      <h2 className="page-title">Transaction</h2>
      <div className="search-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search transactions"
        />
      </div>
      <TransactionList
        transactions={filtered}
        startEdit={startEdit}
        remove={remove}
      />
    </div>
  );
}
