import type { IUserData } from "@/types/UserTypes";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUserData | null;
  refreshAuth: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IUserData, Error>>;
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
