import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./components/Transactions";
import Insights from "./pages/Insights";
import Settings from "./components/Settings";

import Layout from "./components/Layout";
import AddTransaction from "./components/AddTransactions";
import Budgets from "./pages/Budgets";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout>
                {({ summary, transactions }) => (
                  <Transactions transactions={transactions} summary={summary} />
                )}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Layout>{({ summary }) => <Insights summary={summary} />}</Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>{({ summary }) => <Settings summary={summary} />}</Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/addtransactions" element={<AddTransaction />} />
        <Route path="/budgets" element={<Budgets />} />
      </Routes>
    </BrowserRouter>
  );
}
