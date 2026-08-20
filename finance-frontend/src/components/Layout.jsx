import Sidebar from "./Sidebar";
import useSummary from "../hooks/useSummary";
import useTransactions from "../hooks/useTransactions";



export default function Layout({ children }) {
    const summary = useSummary()
    const transactions = useTransactions()
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <div className="page-container">
          {children({summary , transactions})}
        </div>
      </div>
    </div>
  );
}
