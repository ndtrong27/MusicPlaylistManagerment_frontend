"use client";

import { LayoutDashboard, Music, ListMusic, User, ArrowRight, Play, Heart } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8 p-8 animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-righteous text-4xl text-text-light md:text-5xl">
          Dashboard
        </h1>
        <p className="text-text-light/60">
          Welcome back, <span className="text-accent-green font-medium">{user?.username || "Music Lover"}</span>! Ready for some beats?
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
        {/* Featured Hero Card */}
        <Card variant="primary" className="md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden relative group">
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

        {/* Quick Stats */}
        <Card className="flex flex-col justify-center gap-2 text-center group">
          <ListMusic className="mx-auto text-accent-green mb-2 group-hover:scale-110 transition-transform" size={32} />
          <span className="text-3xl font-bold font-righteous">12</span>
          <span className="text-sm text-text-light/50 uppercase tracking-widest">Playlists</span>
        </Card>

        <Card className="flex flex-col justify-center gap-2 text-center group">
          <Music className="mx-auto text-primary-700 mb-2 group-hover:scale-110 transition-transform" size={32} />
          <span className="text-3xl font-bold font-righteous">148</span>
          <span className="text-sm text-text-light/50 uppercase tracking-widest">Songs Found</span>
        </Card>

        {/* Recently Played / New Discoveries Section */}
        <Card className="md:col-span-2 lg:col-span-3 lg:row-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-righteous text-xl flex items-center gap-2">
              <AudioLines className="text-accent-green" size={20} />
              Recent Discoveries
            </h3>
            <button className="text-xs text-text-light/40 hover:text-accent-green transition-colors uppercase tracking-widest font-bold">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-white/10 flex items-center justify-center">
                   <Play size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm group-hover:text-accent-green transition-colors">Melodic Journey #{i}</h4>
                  <p className="text-xs text-text-light/40">Synthesized Vibes</p>
                </div>
                <Heart size={16} className="text-text-light/20 hover:text-red-500 transition-colors" />
              </div>
            ))}
          </div>
        </Card>

        {/* Small Profile Quick Link */}
        <Card className="flex flex-col items-center justify-center text-center gap-3">
           <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-700 to-accent-green p-0.5">
             <div className="h-full w-full rounded-full bg-bg-dark flex items-center justify-center">
                <User size={24} className="text-text-light/60" />
             </div>
           </div>
           <span className="text-sm font-medium">My Profile</span>
        </Card>
      </div>
    </div>
  );
}

function AudioLines({ className, size }: { className?: string, size?: number }) {
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      <div className="w-1 bg-current animate-wave1" style={{ height: '12px' }}></div>
      <div className="w-1 bg-current animate-wave2" style={{ height: '18px' }}></div>
      <div className="w-1 bg-current animate-wave3" style={{ height: '14px' }}></div>
      <div className="w-1 bg-current animate-wave4" style={{ height: '16px' }}></div>
    </div>
  );
}

