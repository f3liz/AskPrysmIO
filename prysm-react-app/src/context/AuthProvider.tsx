import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type User } from "./AuthContext";
import { api, setupInterceptors } from "../api/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (err) {
      setUser(null);
      console.log(err);
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = setupInterceptors(navigate, () => setUser(null));
    return cleanup;
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, []);

  const loginUser = async () => {
    setIsLoading(true);
    await checkAuth();
  };

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
