import { Routes, Route, Link } from "react-router-dom"
import Chatbot from "./components/Chatbot"
import FAQ from "./components/FAQ"
import "./App.css"
import prysmBg from "./assets/prysmIobg.png"

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
                <span className="logoText">
                  NU SKIN<sup>®</sup>
                </span>
            </div>

            {/* Button linking to FAQ Page */}
            <Link to="/faq">
              <button className="navButton">Go to FAQ</button>
            </Link>
          </header>
          
        {/* Main Content */}
            <main className="content">
              <section className="prysm"
              style={{ backgroundImage: `url(${prysmBg})` }}
              >
                <div className="prysmOverlay">
                  <h1>Ask Prysm iO</h1>
                  <h2>Your next AI health Assistant.</h2>

                  <div className="chatWrapper">
                    <Chatbot />
                  </div>
                </div>
              </section>
            </main>
          </div>
        }
      />
          
      {/* FAQ Page */}
      <Route
        path="/faq"
        element={
          <div className="faqPage">
            <header className="navbar">
            <h1 className="title">FAQ Page</h1>
            <Link to="/">
              <button className="navButton">Home</button>
            </Link>
          </header>

          <main className="content">
            <FAQ/>
            </main>
          </div>
        }
      />
    </Routes>
  )
}