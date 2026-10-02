import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function loadTransactions() {
      const res = await api.get(`/transactions`);
      setTransactions(res.data.transactions);
    }
    loadTransactions();
  }, []);
  return transactions;
}
