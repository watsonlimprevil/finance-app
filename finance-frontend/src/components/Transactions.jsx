import { useState } from "react";
import TransactionList from "./TransactionList";
export default function TransactionsPage({ transactions, startEdit, remove }) {
  const [search, setSearch] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const filtered = transactions?.filter((t) => {
    const q = search.toLowerCase();
    return (
      (t?.category ?? "").toLowerCase().includes(q) ||
      (t?.type ?? "").toLowerCase().includes(q) ||
      (t?.amount ?? "").includes(search)
    );
  });

  return (
    <div className="page-container">
      <h2 className="page-title">Transaction</h2>
      <button className="search-btn" onClick={() => setOpenSearchBar(true)}>
        Search Transaction
      </button>
      <div className="search-bar">
        {openSearchBar && (
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search transactions"
            />
            <button onClick={() => setOpenSearchBar(false)}>cancel</button>
          </div>
        )}
      </div>
      <TransactionList
        transactions={filtered}
        startEdit={startEdit}
        remove={remove}
      />
    </div>
  );
}
