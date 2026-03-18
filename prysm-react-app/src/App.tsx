import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/*Public Routes*/}
      <Route path="/login" element={<Login />} />

      {/*Protected Routes*/}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Catch-all for 404s */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
