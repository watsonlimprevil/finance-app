import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Summary from "../components/Summary.jsx";
import TransactionsPage from "../components/Transactions.jsx";
import CategoryPieChart from "../components/CategoryPieChart.jsx";
import AddTransactionModal from "./AddTransactioModel.jsx";
import AddTransaction from "../components/AddTransactions.jsx";
import EditTransaction from "../components/EditTransactions.jsx";
import { DeleteConfirm } from "./Delete.jsx";
import MonthlyTrendChart from "../components/MonthlyTrendChart.jsx";
import BudgetProgress from "../components/BudgetProgress.jsx";
import SidebarMenu from "../components/SidebarMenu.jsx";
import LowBalance from "../components/LowBalance.jsx";
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndate] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("desc");
  const [trends, setTrends] = useState([]);
  const [budgetProgress, setBudgetProgress] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionError, setTransactionError] = useState("");
  const [lowBalanceModel, SetLowBalanceModel] = useState(false);

  useEffect(() => {
    reloadAll();
  }, []);

  async function loadBudgetProgress() {
    const res = await api.get(`/transactions/budgets/progress`);

    const lowbalance = res.data.progress.monthly.percent > 90;
    if (lowbalance) {
      SetLowBalanceModel(true);
    }
  }

  async function addTransaction(data) {
    const budgetData = await api.get("/transactions/budgets");
    const budget = budgetData.data.budgets;
    if (!budget) {
      setTransactionError(
        "Budget must be set First before adding any transaction",
      );
      return;
    }
    await api.post(`/transactions`, data);

    reloadAll(); // refresh dashboard data
  }

  async function reloadAll() {
    setLoading(true);
    setError(null);

    try {
      await loadSummary(); // only summary reloads
      await loadTransactions();
      await loadTrends();
      await loadBudgetProgress();
    } catch (error) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults(null);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);
  async function loadSummary() {
    const res = await api.get("/transactions/summary");
    console.log(res.data);
    setSummary(res.data);
  }

  async function loadTransactions() {
    const res = await api.get(
      `/transactions?page=${page}&limit=${limit}&type=${typeFilter}&category=${categoryFilter}&startDate=${startDate}&endDate=${endDate}&sort=${sort}&order=${order}`,
    );
    setTransactions(res.data.transactions);
    setTotalPages(Math.ceil(res.data.total / limit));
  }
  useEffect(() => {
    loadTransactions();
  }, [page]);

  async function confirmDelete() {
    await api.delete(`/transactions/${deleting.id}`);
    setDeleting(null);
    reloadAll();
  }
  function cancelDelete() {
    setDeleting(null);
  }

  async function loadTrends() {
    const res = await api.get(`/transactions/trends`);

    const result = res.data;
    setTrends(result.trends);
  }

  function claerSEarch() {
    setSearch("");
    setSearchResults(null);
  }
  // RENDER STATES
  if (loading) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ color: "white" }}>Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <h1>Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={reloadAll}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div className="card">
          <SidebarMenu />
        </div>
        {lowBalanceModel && (
          <LowBalance onClose={() => SetLowBalanceModel(false)} />
        )}
        <div className="card">
          <Summary summary={summary} />
        </div>
        <div className="chart-row">
          <div className="card chart-card">
            <MonthlyTrendChart data={trends} />
          </div>

          <div className="card chart-card">
            <CategoryPieChart data={summary?.byCategory || []} />
          </div>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Transaction
        </button>

        <AddTransactionModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addTransaction}
        />
        {transactionError && <p>{transactionError}</p>}

        <div className="card">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="car">Car</option>
            <option value="rent">Rent</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndate(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>

          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <button onClick={() => loadTransactions()}>Apply</button>
        </div>

        <div className="card">
          <TransactionsPage
            transactions={transactions}
            startEdit={setEditing}
            remove={setDeleting}
          />
        </div>
        {editing && (
          <EditTransaction
            editing={editing}
            cancel={() => setEditing(null)}
            reload={reloadAll}
          />
        )}

        <div className="card">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

        <div className="card">
          <DeleteConfirm
            deleting={deleting}
            cancel={cancelDelete}
            confirm={confirmDelete}
          />
        </div>
      </div>
    </div>
  );
}
