import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="brand-link">
        <div className="brand">
          <span className="logoText">
            NU SKIN<sup>®</sup>
          </span>
        </div>
      </Link>

      <div className="btn-container">
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <button className="navButton">Go to FAQ</button>
        </NavLink>

        {user?.is_admin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <button className="navButton">Admin</button>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Navbar;
