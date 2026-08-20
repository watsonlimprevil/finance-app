import { useState , useEffect } from "react";
import { API_URL , authHeader} from "../utils/api";

export default function useTransactions(){
    const [transactions, setTransactions] = useState(null);

    useEffect(()=>{
        async function loadTransactions(){
            const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
                headers: authHeader()
            })
            const data = await res.json()
            setTransactions(data.transactions)
        }
        loadTransactions()
    },[])
    return transactions
}
