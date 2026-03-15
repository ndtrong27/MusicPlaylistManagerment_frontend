import apiClient from "@/lib/apiClient";
import type { ApiResponse, Song, PaginatedResponse } from "@/types";

export const songService = {
  getAll: async (page = 1, limit = 20) => {
    const { data } = await apiClient.get<PaginatedResponse<Song>>(
      `/songs?page=${page}&limit=${limit}`
    );
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Song>>(`/songs/${id}`);
    return data.data;
  },

  create: async (payload: Partial<Song>) => {
    const { data } = await apiClient.post<ApiResponse<Song>>("/songs", payload);
    return data.data;
  },

  update: async (id: string, payload: Partial<Song>) => {
    const { data } = await apiClient.put<ApiResponse<Song>>(
      `/songs/${id}`,
      payload
    );
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/songs/${id}`);
  },
};
