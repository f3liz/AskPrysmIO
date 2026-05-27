import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
  activeChat: string
  changeActiveChat: (chatID: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
