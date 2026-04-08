"use client";

import { useState, Suspense } from "react";
import { ListMusic, Search, Filter, Play, ExternalLink } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

function PlaylistsContent() {
  const { data, isLoading: loading } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");

  const playlists = data?.stats?.playlists || [];

  const filteredPlaylists = playlists.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-righteous text-4xl md:text-5xl text-white tracking-tight">
            My <span className="text-accent-green">Playlists</span>
          </h1>
          <p className="text-text-light/60 font-medium max-w-md">
            All your curated soundscapes from Spotify, synced and ready for management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent-green transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-accent-green/50 focus:ring-1 focus:ring-accent-green/50 transition-all w-[240px] md:w-[320px] text-sm"
            />
          </div>
          <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          // Skeletons
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 animate-pulse">
              <div className="aspect-square rounded-2xl bg-white/5" />
              <div className="flex flex-col gap-2 px-1">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))
        ) : filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => (
            <div key={playlist.id} className="group relative flex flex-col gap-4 cursor-pointer">
              {/* Cover Art Card */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                {playlist.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/10">
                    <ListMusic size={64} />
                  </div>
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="p-4 rounded-full bg-accent-green text-black scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl hover:bg-accent-green/90">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>

                {/* Spotify Link Icon */}
                <a
                  href={`https://open.spotify.com/playlist/${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Metadata */}
              <div className="flex flex-col px-1">
                <h3 className="font-bold text-white group-hover:text-accent-green transition-colors truncate">
                  {playlist.name}
                </h3>
                <span className="text-sm text-text-light/40 font-medium">
                  Spotify Playlist
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="p-6 rounded-full bg-white/5 w-fit mx-auto mb-6">
              <ListMusic size={48} className="text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No playlists found</h3>
            <p className="text-text-light/40 max-w-sm mx-auto">
              We couldn't find any playlists matching your criteria. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlaylistsPage() {
  return (
    <Suspense fallback={null}>
      <PlaylistsContent />
    </Suspense>
  );
}
