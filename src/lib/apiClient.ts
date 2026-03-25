import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Needed for sending/receiving HTTP-only cookies like refresh_token
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Response interceptor - handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config?.url !== "/auth/refresh") {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        // Token expired or invalid, and standard refresh failed
        window.location.href = "/"; // Go back to landing
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
