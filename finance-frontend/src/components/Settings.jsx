import { useState } from "react"
import { authHeader } from "../utils/api";
import { useNavigate } from "react-router-dom";
export default function Settings(){

    const API_URL = import.meta.env.VITE_API_URL;

    const [monthlyBudget , setMonthlyBudget] = useState('')
    const [currency , setCurrency] = useState('USD')
    const [theme , setTheme] = useState('dark')
    const [message , setMessage] = useState('')
    const navigate = useNavigate()
    async function updateMonthlyBudget(){
        try{
            const res = await fetch(`${API_URL}/transactions/budgets/monthly` ,{
                method: 'PATCH',
                headers:{'Content-Type': 'application/json' ,
                    ...authHeader()
                } 
                ,
                body: JSON.stringify({budget: Number(monthlyBudget)})
            });

            if(!res.ok) throw new Error('Failed to update budget')
                setMessage('Monthly budget updated successfully')
        }catch(error){
            setMessage(error.message)
        }
    }
function handleLogout(){
    localStorage.removeItem('token')
    navigate('/login')
}

    async function saveCurrency(){
        localStorage.setItem('currency' , currency)
        setMessage('currency preference saved.')
    }

    function toggleTheme(){
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme' , newTheme)
        setMessage(`theme switched to ${newTheme}`)
    }

    async function resetAllData(){
        try{
            const res = await fetch(`${API_URL}/transactions/reset` ,{
                method: 'DELETE'
            });
            if(!res.ok) throw new Error('Failed to reset data')
                setMessage('all data has been reset')
        }catch(err){
            setMessage(err.message)
        }
    }
    return(
        <div style={{padding: '20px'}}>
            <h1>Settings</h1>
            {message && <p style={{color: 'lime'}}>{message}</p>}

            <section>
                <h2>Monthly Budget</h2>
                <input 
                type="number"
                placeholder="Enter new monthly budget"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                />
                <button onClick={updateMonthlyBudget}> update Budget</button>
            </section>

            <section>
                <h2>Theme</h2>
                <button onClick={toggleTheme}> 
                    switch to {theme === 'dark' ? 'light' : 'dark'}
                </button>
            </section>

            <section>
                <h2 style={{color : 'red'}}>Danger Zone</h2>
                <button style={{background: 'red' , color : 'white'}} onClick={resetAllData}>
                    Reset All Data
                </button>
            </section>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}