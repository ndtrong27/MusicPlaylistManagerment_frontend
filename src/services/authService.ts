import apiClient from "@/lib/apiClient";
import type { ApiResponse, AuthTokens, User, LoginPayload, RegisterPayload } from "@/types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post<ApiResponse<AuthTokens & { user: User }>>(
      "/auth/login",
      payload
    );
    return data.data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post<ApiResponse<{ user: User }>>(
      "/auth/register",
      payload
    );
    return data.data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>("/auth/me");
    return data.data;
  },
};
