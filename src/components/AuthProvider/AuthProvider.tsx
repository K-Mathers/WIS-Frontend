import React from "react";
import { getUser } from "@/api/auth";
import { AuthContext } from "./AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, user, refreshAuth: refetch, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
