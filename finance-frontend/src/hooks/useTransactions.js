import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function loadtransactions() {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    }
    loadtransactions();
  }, []);
  return transactions;
}
