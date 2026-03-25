"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient, { setAuthToken } from "@/lib/apiClient";

interface User {
  id: string;
  email?: string;
  username?: string;
  // Expand based on what backend returns
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial silent refresh
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to automatically refresh the token using the HTTP-only cookie
        const res = await apiClient.post("/auth/refresh");
        if (res.data?.success && res.data?.data?.access_token) {
          const newToken = res.data.data.access_token;
          const userData = res.data.data.user;
          setTokenState(newToken);
          setAuthToken(newToken);
          if (userData) setUser(userData);
        }
      } catch (err) {
        // Silently fail - user is just not logged in
        console.log("No valid session found.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, userData?: User) => {
    setTokenState(newToken);
    setAuthToken(newToken);
    if (userData) setUser(userData);
  };

  const logout = async () => {
    try {
      // Call backend to clear HTTP-only cookie
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setTokenState(null);
      setUser(null);
      setAuthToken(null);
      window.location.href = "/"; // Redirect to landing page
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
