"use client";

import { useEffect, useState, Suspense } from "react";
import { Music, Search, Filter, Play, Clock, MoreHorizontal, Heart } from "lucide-react";
import Card from "@/components/ui/Card";
import apiClient from "@/lib/apiClient";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number;
}

function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
}

function SongsContent() {
  const [songs, setSongs] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchSongs() {
      // Get token from hash or storage
      const hash = window.location.hash;
      let token = sessionStorage.getItem("spotify_access_token");

      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const providerToken = params.get("provider_token");
        if (providerToken) {
          token = providerToken;
          sessionStorage.setItem("spotify_access_token", token);
          window.location.hash = "";
        }
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/dashboard", {
          params: { access_token: token },
        });
        
        if (response.data.success && response.data.data.tracks) {
          // The backend maps tracks to { id, name, artist, album, albumArt, duration }
          setSongs(response.data.data.tracks);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-righteous text-4xl md:text-5xl text-white tracking-tight">
            Saved <span className="text-primary-700">Tracks</span>
          </h1>
          <p className="text-text-light/60 font-medium max-w-md">
            Your collection of favorites from Spotify, all in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-700 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-primary-700/50 focus:ring-1 focus:ring-primary-700/50 transition-all w-[240px] md:w-[320px] text-sm"
            />
          </div>
          <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Songs Table/List */}
      <Card className="p-0 overflow-hidden border-white/5 bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-widest text-text-light/40 font-bold">
                <th className="px-6 py-4 font-righteous">#</th>
                <th className="px-6 py-4 font-righteous">Title</th>
                <th className="px-6 py-4 font-righteous hidden md:table-cell">Album</th>
                <th className="px-6 py-4 font-righteous text-center">
                  <Clock size={16} className="mx-auto" />
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeletons
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-4 rounded bg-white/5 mx-auto" />
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-white/10" />
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-40 rounded bg-white/10" />
                        <div className="h-3 w-24 rounded bg-white/5" />
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="h-4 w-32 rounded bg-white/5" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-10 rounded bg-white/5 mx-auto" />
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : filteredSongs.length > 0 ? (
                filteredSongs.map((track, i) => (
                  <tr
                    key={track.id}
                    className="group hover:bg-white/5 transition-colors border-b border-white/[0.01]"
                  >
                    <td className="px-6 py-4 text-center">
                      <span className="text-text-light/40 group-hover:hidden">{i + 1}</span>
                      <Play size={14} className="hidden group-hover:block mx-auto text-primary-700" fill="currentColor" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded overflow-hidden bg-white/5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                          {track.albumArt ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={track.albumArt}
                              alt={track.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-white/10">
                              <Music size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-white font-bold truncate group-hover:text-primary-700 transition-colors">
                            {track.name}
                          </span>
                          <span className="text-sm text-text-light/40 font-medium truncate">
                            {track.artist}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-text-light/40 truncate block max-w-[200px]">
                        {track.album}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-text-light/40 font-medium">
                      {formatDuration(track.duration)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-text-light/40 hover:text-accent-red transition-colors">
                          <Heart size={18} />
                        </button>
                        <button className="text-text-light/40 hover:text-white transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="p-6 rounded-full bg-white/5 w-fit mx-auto mb-6">
                      <Music size={48} className="text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No tracks found</h3>
                    <p className="text-text-light/40 max-w-sm mx-auto">
                      Your saved tracks collection is currently empty or matches no results.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default function SongsPage() {
  return (
    <Suspense fallback={null}>
      <SongsContent />
    </Suspense>
  );
}
