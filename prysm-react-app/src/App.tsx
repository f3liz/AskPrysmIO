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
import { useAuth } from "./context/useAuth";
import "./App.css";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Routes WITHOUT the Layout */}
      <Route path="/login" element={<Login />} />

      {/* Routes WITH the Layout */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />

          {/* 2. Use logical AND instead of if/else */}
          {user?.is_admin && <Route path="/admin" element={<Admin />} />}
        </Route>
      </Route>

      {/* 404 Fallback: If a non-admin tries to visit /admin, they will fall through to this */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}
