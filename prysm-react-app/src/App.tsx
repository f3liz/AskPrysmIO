import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      {/* FAQ Page */}
      <Route path="/faq" element={<Faq />} />

      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
