import { createContext } from "react";
import type { Message } from "../types";

export interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
