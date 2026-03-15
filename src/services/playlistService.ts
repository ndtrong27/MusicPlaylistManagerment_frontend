import apiClient from "@/lib/apiClient";
import type { ApiResponse, Playlist, PaginatedResponse } from "@/types";

export const playlistService = {
  getAll: async (page = 1, limit = 20) => {
    const { data } = await apiClient.get<PaginatedResponse<Playlist>>(
      `/playlists?page=${page}&limit=${limit}`
    );
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Playlist>>(
      `/playlists/${id}`
    );
    return data.data;
  },

  create: async (payload: Pick<Playlist, "name" | "description" | "isPublic">) => {
    const { data } = await apiClient.post<ApiResponse<Playlist>>(
      "/playlists",
      payload
    );
    return data.data;
  },

  update: async (id: string, payload: Partial<Playlist>) => {
    const { data } = await apiClient.put<ApiResponse<Playlist>>(
      `/playlists/${id}`,
      payload
    );
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/playlists/${id}`);
  },

  addSong: async (playlistId: string, songId: string) => {
    const { data } = await apiClient.post<ApiResponse<Playlist>>(
      `/playlists/${playlistId}/songs`,
      { songId }
    );
    return data.data;
  },

  removeSong: async (playlistId: string, songId: string) => {
    await apiClient.delete(`/playlists/${playlistId}/songs/${songId}`);
  },
};
