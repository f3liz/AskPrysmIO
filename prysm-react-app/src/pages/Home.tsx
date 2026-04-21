import Chatbot from "../components/Chatbot";
import prysmBg from "../assets/prysmIobg.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
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

      <main className="content">
        <section
          className="prysm"
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
  );
}

export default Home;
