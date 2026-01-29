import React, { useEffect, useState } from "react";

import { getUser } from "@/api/auth";
import { AuthContext } from "./AuthContext/AuthContext";
import type { IUserData } from "@/types/UserTypes";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const data = await getUser();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, refreshAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
