import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function loadTransactions() {
      const res = await api.get(`${import.meta.env.VITE_API_URL}/transactions`);
      const data = await res.json();
      setTransactions(data.transactions);
    }
    loadTransactions();
  }, []);
  return transactions;
}
