"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

// ── Types matching the API response ──────────────────────────────────────────

interface DashboardUser {
    username: string;
    email: string;
    image: string;
}

interface Playlist {
    id: string;
    name: string;
    image: string;
}

interface Stats {
    playlistsCount: number;
    songsCount: number;
    playlists: Playlist[];
}

interface RecentDiscovery {
    id: string;
    name: string;
    artist: string;
    albumArt: string;
}

interface DashboardData {
    user: DashboardUser;
    stats: Stats;
    recentDiscoveries: RecentDiscovery[];
}

interface DashboardContextType {
    data: DashboardData | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { accessToken, isLoading: isAuthLoading } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await apiClient.get(`/dashboard?access_token=${accessToken}`);
            if (res.data?.success && res.data?.data) {
                setData(res.data.data as DashboardData);
            } else {
                setError("Unexpected response from server.");
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to load dashboard data.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthLoading && accessToken) {
            fetchDashboard();
        } else if (!isAuthLoading && !accessToken) {
            setIsLoading(false); // finish loading if not authenticated
        }
    }, [isAuthLoading, accessToken]);

    return (
        <DashboardContext.Provider
            value={{
                data,
                isLoading,
                error,
                refetch: fetchDashboard
            }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};
