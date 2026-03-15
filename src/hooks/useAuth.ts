"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .getProfile()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, setUser, logout, isAuthenticated: !!user };
}
