import { useEffect , useState } from "react";
import { authHeader } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Budgets(){
    const [budgets , setBudgets] = useState([]);
    const [amount , setAmount] = useState('')
    const [category , setCategory] = useState('')
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        loadBudgets();
    } , [])

    async function loadBudgets(){
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/budgets` , {
            headers: authHeader()
        })

        const data = await res.json();
        setBudgets(data.budgets);
        setLoading(false)
    }

    async function addBudget(){
        const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/budgets` ,{
            method: 'POST' ,
            headers:{
                ...authHeader() ,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({category , amount})
        });

        await loadBudgets();
        setAmount('')
        setCategory('')
    }

    async function deleteBudget(id){
        await fetch(`${import.meta.env.VITE_API_URL}/transactions/budgets/${id}` , {
            method : 'DELETE' ,
            headers : authHeader()
        });
        loadBudgets()
    }

    return(
        <div style={{padding :20}}>
            <button onClick={()=> navigate('/dashboard')}>
                Back to Dashboard
            </button>

            <h1>Budgets</h1>
            <div style={{marginTop: 20}}>
                <h2>Add Budget</h2>

                <input 
                type="text"
                placeholder="Category(leave empty for monthly budget)"
                value={category}
                onChange={e=> setCategory(e.target.value)}
                />

                <input 
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                />
                <button onClick={addBudget}>Add</button>
            </div>

            <div style={{marginTop :30}}>
                <h2>Your Budgets</h2>
                {loading ? (
                    <p>Loading...</p>
                ):(
                    <ul>
                        {budgets.map(b => (
                            <li key={b.id}>
                                <strong>{b.category || 'Monthly Budget'}:</strong>
                                ${b.amount}
                                <button onClick={()=> deleteBudget(b.id)} style={{marginLeft:10}}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}