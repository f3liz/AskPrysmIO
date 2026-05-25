import { NavLink, Link } from "react-router-dom";

function Navbar() {
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

        {/* Change to have the admin tab only appear when the user is an admin. Admin page should have mini nav bar for all admin features */}
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <button className="navButton">Admin</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
