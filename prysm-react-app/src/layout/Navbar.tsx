import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="navbar">
        <div className="brand">
          <span className="logoText">
            NU SKIN<sup>®</sup>
          </span>
        </div>

        <div className="btn-container">
          <Link to="/faq">
            <button className="navButton">Go to FAQ</button>
          </Link>
          <Link to="/admin">
            <button className="navButton">File Upload</button>
          </Link>
        </div>
      </header>
  )
}

export default Navbar