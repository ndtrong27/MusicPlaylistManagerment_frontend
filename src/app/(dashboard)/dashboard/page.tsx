"use client";

import { Suspense } from "react";
import Link from "next/link";

import { Music, ListMusic, User, ArrowRight, Play, Heart } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";

// ── Inner component ────────────────────────────────────────────────────────────────
function DashboardContent() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading: loading } = useDashboard();

  const displayName =
    dashboardData?.user.username || user?.username || "Music Lover";
  const playlistsCount = dashboardData?.stats.playlistsCount ?? 0;
  const songsCount = dashboardData?.stats.songsCount ?? 0;
  const playlists = dashboardData?.stats.playlists ?? [];
  const recentDiscoveries = dashboardData?.recentDiscoveries ?? [];

  return (
    <div className="flex flex-col gap-8 p-8 animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-righteous text-4xl text-text-light md:text-5xl">
          Dashboard
        </h1>
        <p className="text-text-light/60">
          Welcome back,{" "}
          <span className="text-accent-green font-medium">{displayName}</span>!
          Ready for some beats?
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Featured Hero Card */}
        <Card
          variant="primary"
          className="md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-righteous text-2xl mb-2">Sync Your Playlists</h2>
              <p className="text-white/80 text-sm max-w-[280px]">
                Import your favorite tracks from Spotify and organize them with ease.
              </p>
            </div>
            <Button variant="white" className="w-fit gap-2">
              Start Syncing <ArrowRight size={18} />
            </Button>
          </div>
          <Music className="absolute -right-8 -bottom-8 text-white/10 w-48 h-48 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Link href="/playlists" className="block outline-none">
          <Card className="flex flex-col justify-center gap-2 text-center group h-full cursor-pointer hover:border-accent-green/30 transition-all duration-300 relative overflow-hidden">
            {/* Background Thumbnail Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
              {playlists.slice(0, 4).map((p, i) => (
                <div
                  key={p.id || i}
                  className="bg-cover bg-center h-full w-full"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
              ))}
            </div>

            <ListMusic
              className="mx-auto text-accent-green mb-2 group-hover:scale-110 transition-transform relative z-10"
              size={32}
            />
            <span className="text-3xl font-bold font-righteous relative z-10">
              {loading ? "…" : playlistsCount}
            </span>
            <div className="flex flex-col relative z-10 gap-2">
              <span className="text-sm text-text-light/50 uppercase tracking-widest font-medium">
                Playlists
              </span>

              {!loading && playlists.length > 0 && (
                <div className="flex -space-x-2 overflow-hidden justify-center items-center">
                  {playlists.slice(0, 3).map((p, i) => (
                    <div
                      key={p.id || i}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-bg-dark overflow-hidden bg-white/5"
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ListMusic size={10} className="m-auto mt-1.5 opacity-20" />
                      )}
                    </div>
                  ))}
                  {playlistsCount > 3 && (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-bg-dark bg-white/5 text-[8px] font-bold text-accent-green/60">
                      +{playlistsCount - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </Link>

        {/* Songs Found Stat */}
        <Link href="/songs" className="block outline-none">
          <Card className="flex flex-col justify-center gap-2 text-center group h-full cursor-pointer hover:border-primary-500/30 transition-all duration-300">
            <Music
              className="mx-auto text-primary-700 mb-2 group-hover:scale-110 transition-transform"
              size={32}
            />
            <span className="text-3xl font-bold font-righteous">
              {loading ? "…" : songsCount}
            </span>
            <span className="text-sm text-text-light/50 uppercase tracking-widest font-medium">
              Songs Found
            </span>
          </Card>
        </Link>

        {/* Recent Discoveries */}
        <Card className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 min-h-[320px]">
          <div className="flex items-center justify-between">
            <h3 className="font-righteous text-xl flex items-center gap-2">
              <AudioLines className="text-accent-green" size={20} />
              Recent Discoveries
            </h3>
            <button className="text-xs text-text-light/40 hover:text-accent-green transition-colors uppercase tracking-widest font-bold">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="h-14 w-14 rounded-lg bg-white/10" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-3 w-40 rounded bg-white/10" />
                    <div className="h-2 w-24 rounded bg-white/5" />
                  </div>
                </div>
              ))
            ) : recentDiscoveries.length > 0 ? (
              recentDiscoveries.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    {track.albumArt ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={track.albumArt}
                        alt={track.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : null}
                    <Play
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200 relative z-10"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm group-hover:text-accent-green transition-colors truncate">
                      {track.name}
                    </h4>
                    <p className="text-xs text-text-light/40 truncate">{track.artist}</p>
                  </div>
                  <Heart size={16} className="text-text-light/20 hover:text-red-500 transition-colors flex-shrink-0" />
                </div>
              ))
            ) : (
              <p className="text-sm text-text-light/40 text-center py-4">
                No recent tracks found. Start listening on Spotify!
              </p>
            )}
          </div>
        </Card>

        {/* Profile Quick Link */}
        <Card className="flex flex-col items-center justify-center text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-700 to-accent-green p-0.5">
            <div className="h-full w-full rounded-full bg-bg-dark flex items-center justify-center overflow-hidden">
              {dashboardData?.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dashboardData.user.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={24} className="text-text-light/60" />
              )}
            </div>
          </div>
          <span className="text-sm font-medium">My Profile</span>
        </Card>
      </div>
    </div>
  );
}

// ── Outer page — wraps content in Suspense ──────────────────────────────────
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full text-text-light/40">
          Loading dashboard…
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

// ── AudioLines icon ───────────────────────────────────────────────────────────
function AudioLines({ className, size }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-end gap-1 ${className}`} style={{ height: size }}>
      <div className="w-1 bg-current animate-wave1" style={{ height: "12px" }} />
      <div className="w-1 bg-current animate-wave2" style={{ height: "18px" }} />
      <div className="w-1 bg-current animate-wave3" style={{ height: "14px" }} />
      <div className="w-1 bg-current animate-wave4" style={{ height: "16px" }} />
    </div>
  );
}
