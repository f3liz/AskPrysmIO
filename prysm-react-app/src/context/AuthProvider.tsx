import { useState, type ReactNode, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { api, setupInterceptors } from "../api/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginUser = () => setIsAuthenticated(true);
  const logoutUser = () => setIsAuthenticated(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    
  useEffect(() => {
    const cleanup = setupInterceptors(navigate, setIsAuthenticated);
    return cleanup;
  }, [navigate])

  useEffect(()=> {
    const checkAuth = async () => {
      try{
        await api.get('/check/');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.log(err)
        navigate('/login', {replace: true});
      }  finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

if (loading) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
