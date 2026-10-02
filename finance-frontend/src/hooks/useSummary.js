import { useEffect, useState } from "react";
import api from "../utils/api";
export default function useSummary() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    async function loadData() {
      const res = await api.get("/transactions/summary");
      setSummary(res.data);
    }
    loadData;
  }, []);
  return summary;
}
