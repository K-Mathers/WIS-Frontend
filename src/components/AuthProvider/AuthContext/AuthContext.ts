import type { IUserData } from "@/types/UserTypes";
import { createContext, useContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUserData | null;
  refreshAuth: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
