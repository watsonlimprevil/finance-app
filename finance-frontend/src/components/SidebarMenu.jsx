import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="finance-menu">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        Manage Finance
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <nav className="menu-items">
          <NavLink to={"/dashboard"}>dashboard…</NavLink>
          <NavLink to={"/transactions"}>Transactions</NavLink>
          <NavLink to={"/insight"}>Insights</NavLink>
          <NavLink to={"/settings"}>Settings</NavLink>
          <NavLink to={"/add"}>Add transactions</NavLink>
          <NavLink to={"/budgets"}>Budget</NavLink>
          <NavLink></NavLink>
        </nav>
      )}
    </div>
  );
}
