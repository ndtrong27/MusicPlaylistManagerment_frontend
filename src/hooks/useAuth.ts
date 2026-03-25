"use client";

import { useAuth as useAuthContext } from "@/context/AuthContext";

/**
 * Hook to access the authentication context.
 * The token and user data are stored in React state via the AuthProvider.
 */
export function useAuth() {
  const context = useAuthContext();
  
  return {
    user: context.user,
    token: context.token,
    loading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
    login: context.login,
    logout: context.logout,
  };
}
