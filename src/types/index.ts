// ─── User ───────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

// ─── Song ────────────────────────────────────────────────────────────────────
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // seconds
  coverUrl?: string;
  audioUrl?: string;
  genre?: string;
  createdAt: string;
}

// ─── Playlist ─────────────────────────────────────────────────────────────────
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  isPublic: boolean;
  userId: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
