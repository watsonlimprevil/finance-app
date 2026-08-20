import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')

    async function handleSignUp(e){
        e.preventDefault();
        setError("");

        try{
            const res = await fetch(`${API_URL}/auth/register`,{
                method: 'POST',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({email , password})
            })

            const data = await res.json();
            if(!res.ok) throw new Error(data.error)

                localStorage.setItem('token' , data.token)
                navigate('/dashboard')
        }catch(error){
            setError(error.message)
        }
    }

    return(
        <div className="auth-container">
            <h1>Create Account</h1>
            {error && <p style={{color :'red'}}>{error}</p>}

            <form onSubmit={handleSignUp}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>

            </form>
            <p>
                <span 
                style={{color: 'cyan' , cursor: 'pointer'}}
                onClick={() => navigate('/login')}
                >
                    Already have an account?{''}
                </span>
            </p>
        </div>
    )
}