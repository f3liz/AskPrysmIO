import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  is_admin: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
