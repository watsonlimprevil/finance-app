import { useState } from "react";
import { API_URL, authHeader } from "../utils/api";
import { useNavigate } from "react-router-dom";
export default function AddTransaction({ reload }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
 const nav = useNavigate()
  function validate() {
    const newErrors = {};

    if (!amount || isNaN(amount)) {
      newErrors.amount = "Amount must be a number";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero";
    }

    if (!type || (type !== "income" && type !== "expense")) {
      newErrors.type = "Type must be income or expense";
    }

    if (!category || category.trim() === "") {
      newErrors.category = "Category is required";
    }

    if (!date || isNaN(Date.parse(date))) {
      newErrors.date = "Invalid date format";
    }

    if (!description || description.trim() === "") {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit(e) {
   
    e.preventDefault();
    

    if (!validate()) return;

    await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
      body: JSON.stringify({
        amount,
        type,
        category,
        date,
        description
      })
    });

    reload();
    nav('/dashboard')
  }

  return (
    <div className="section">
    <form onSubmit={submit}>
      <h3>Add Transaction</h3>

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      {errors.amount && <p className="error">{errors.amount}</p>}

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      {errors.type && <p className="error">{errors.type}</p>}

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      {errors.category && <p className="error">{errors.category}</p>}

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {errors.date && <p className="error">{errors.date}</p>}

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {errors.description && <p className="error">{errors.description}</p>}

      <button disabled={!amount || !category || !date || !description}>
        Add
      </button>
    </form>
    </div>
  );
}
