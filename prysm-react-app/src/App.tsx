import { Routes, Route, Link } from "react-router-dom"
import Chatbot from "./components/Chatbot"
import "./App.css"

export default function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <div className="page">
            {/* Header */}
            <header className="navbar">
              <div className="brand">
                <h1 className="title">Ask PrysmIO</h1>
            </div>

            {/* Button linking to FAQ Page */}
            <Link to="/faq">
              <button className="navButton">Go to FAQ</button>
            </Link>
          </header>
          
        {/* Main Content */}
        <main className="content">
            <h2>Welcome to PrysmIO's FAQ!</h2>
          {/* Chatbot Component */}
            <Chatbot />
          </main>
        </div>
          }
        />
          
      {/* FAQ Page */}
      <Route
        path="/faq"
        element={
          <div className="page">
            <header className="navbar">
            <h1 className="title">FAQ Page</h1>
            <Link to="/">
              <button className="navButton">Home</button>
            </Link>
          </header>

          <main className="content">
            <p>FAQ content will go here.</p>
            </main>
          </div>
        }
      />
    </Routes>
  )
}