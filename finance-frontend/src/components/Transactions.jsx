import { useEffect, useState } from "react";
import { authHeader } from "../utils/api.js";

export default function Transactions({ transactions = [], reload, startEdit, remove }) {

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  async function handleSearch() {
    if (!search.trim()) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/transactions/search?q=${search}`,
      { headers: authHeader() }
    );

    const data = await res.json();
    setSearchResults(data.results);
  }

  function handleClear() {
    setSearch("");
    setSearchResults(null);
  }

  const listToShow = searchResults || transactions;

  useEffect(()=>{
    const interval = setTimeout(() => {
      handleSearch()
    },300)
    return () => clearTimeout(interval)
  },[search])

  return (
    <div className="transactions section">

      <input
        value={search}
        type="text"
        placeholder="search transaction"
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      <div>
        {listToShow.map(t => (
          <div key={t.id}>
            {t.date} — {t.type} — {t.category} — ${t.amount}
            <button onClick={() => startEdit(t)}>Edit</button>
            <button onClick={() => remove(t.id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}

