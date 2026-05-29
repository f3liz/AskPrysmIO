import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import { AuthProvider } from "./context/AuthProvider";
import { ChatProvider } from "./context/ChatProvider";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            {/* 1. Routes WITHOUT the Layout (Login, Signup, etc.) */}
            <Route path="/login" element={<Login />} />

            {/* 2. Routes WITH the Layout (Home, Admin, etc.) */}
            <Route element={<MainLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Route>

            {/* 404 can go either way */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}
