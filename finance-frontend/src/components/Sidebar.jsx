import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
export default function Sidebar(){
    return(
        <div className="sidebar">
            <h2 className="sidebar-title">Finance</h2>
          <nav className="sidebar-nav">
            <NavLink 
            to={'/dashboard'}
            className={({isActive})=> isActive ? 'active' : ''}
            >
            Dashboard
            </NavLink>

            <NavLink
            to={'/transactions'}
            className={({isActive}) => isActive ? 'active' : ''}
            >
                Transactions
            </NavLink>

            <NavLink
            to={'/insights'}
            className={({isActive})=> isActive ? 'active' : ''}
            >
                Insights
            </NavLink>
            <NavLink
            to={'/settings'}
            className={({isActive})=> isActive ? 'active' : ''}
            >
                Settings
            </NavLink>
          <NavLink to={'/add'}
          className={({isActive})=> isActive ? 'active' : ''}
          >
            Add Transaction
          </NavLink>

          <NavLink 
          to={'/budgets'}
          >
            Budget
          </NavLink>
          </nav>
        </div>
    )
}