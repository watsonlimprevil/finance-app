import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Finance</h2>
      <nav className="sidebar-nav">
        <NavLink to={"/dashboard"} className={"nav-item"}>
          Dashboard
        </NavLink>

        <NavLink to={"/transactions"} className={"nav-item"}>
          Transactions
        </NavLink>

        <NavLink to={"/insights"} className={"nav-item"}>
          Insights
        </NavLink>
        <NavLink to={"/settings"} className={"nav-item"}>
          Settings
        </NavLink>
        <NavLink to={"/add"} className={"nav-item"}>
          Add Transaction
        </NavLink>

        <NavLink to={"/budgets"}>Budget</NavLink>
      </nav>
    </div>
  );
}
