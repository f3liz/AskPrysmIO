import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";

function Faq() {
  return (
    <div className="faqPage">
      <header className="navbar">
        <h1 className="title">FAQ Page</h1>
        <Link to="/">
          <button className="navButton">Home</button>
        </Link>
      </header>

      <main className="content">
        <FAQ />
      </main>
    </div>
  );
}

export default Faq;
