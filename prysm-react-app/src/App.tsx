import { Routes, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <div>
            <h1>Home Page</h1>

            {/* Button linking to FAQ Page */}
            <Link to="/faq">
              <button>Go to FAQ</button>
            </Link>
          </div>
        }
      />

      {/* FAQ Page */}
      <Route
        path="/faq"
        element={
          <div>
            <h1>FAQ Page</h1>

            <Link to="/">
              <button>Back to Home</button>
            </Link>
          </div>
        }
      />
    </Routes>
  )
}