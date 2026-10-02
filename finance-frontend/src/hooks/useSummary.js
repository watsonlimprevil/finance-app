import { useEffect, useState } from "react";
import api from "../utils/api";
export default function useSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}/transactions/summary`,
        {
          headers: authHeader(),
        },
      );
      const data = await res.json();
      setSummary(data);
    }
    load();
  }, []);
  return summary;
}
