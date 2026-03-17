"use client";

import Link from "next/link";
import {
  FiMusic, FiPlayCircle, FiZap, FiDownload,
  FiShare2, FiUsers, FiTrendingUp, FiLayers,
  FiCheckCircle, FiArrowRight
} from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";

export default function HomePage() {
  const handleConnectSpotify = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
    const responseType = process.env.NEXT_PUBLIC_RESPONSE_TYPE || "";
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || "";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f8fafc] selection:bg-primary-500 selection:text-white">
      {/* Navbar (Landing) */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
          <div className="flex items-center gap-3">
            <div className="flex bg-primary-600 p-2 rounded-xl text-white">
              <FiMusic size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-righteous)]">
              MusicPM
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors cursor-pointer">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">How it Works</Link>
            <button
              onClick={handleConnectSpotify}
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-semibold cursor-pointer"
            >
              Connect Spotify
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        {/* Animated Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400 mb-8 animate-fade-in-up">
            <FiZap className="animate-pulse" />
            <span>AI-Powered Playlist Generation</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter text-white mb-8 font-[family-name:var(--font-righteous)] animate-fade-in-up delay-100">
            Music Management <br />
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400 leading-relaxed animate-fade-in-up delay-200 font-[family-name:var(--font-poppins)]">
            Organize, discover, and share your music collection like never before.
            Smart playlists, waveform visualization, and cross-platform synchronization
            all in one beautiful interface.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-300">
            <Link href="/dashboard" className="group flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-5 text-lg font-bold text-white transition-all hover:bg-primary-500 hover:scale-105 cursor-pointer">
              Get Started Free
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer">
              Explore Features
            </Link>
          </div>
        </div>

        {/* Animated Waveform Visualizer Decor */}
        <div className="mt-16 flex items-end justify-center gap-1 h-32 animate-fade-in-up delay-500">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <div key={i} className={`w-2 md:w-3 bg-gradient-to-t from-primary-600 to-accent-400 rounded-full wave-bar-${i}`}></div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 border-y border-white/5 bg-[#0e0e29] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Playlists Created", value: "2M+" },
              { label: "Songs Indexed", value: "500K+" },
              { label: "Daily Streams", value: "10M+" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-4xl font-bold text-white font-[family-name:var(--font-righteous)]">{stat.value}</span>
                <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-righteous)]">
              Everything you need to <br /> craft the perfect vibe.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional tools for music collectors and playlist connoisseurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Bento Card */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/5 bg-[#141433] p-10 hover:border-primary-500/50 transition-all cursor-pointer">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiLayers size={140} className="text-primary-400" />
              </div>
              <div className="relative z-10 max-w-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600/20 text-primary-400">
                  <FiLayers size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Smart Hierarchical Playlists</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Nested folders, dynamic smart rules, and automated organization.
                  Keep your thousand-track collection perfectly categorized by mood,
                  bpm, and genre effortlessly.
                </p>
              </div>
            </div>

            {/* Side Bento Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#141433] p-8 hover:border-accent-500/50 transition-all cursor-pointer">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 text-accent-400">
                <FiTrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Discovery</h3>
              <p className="text-gray-400 text-sm">
                Our machine learning engine finds similar tracks based
                on waveform and acoustic patterns, not just metadata.
              </p>
            </div>

            {/* Side Bento Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#141433] p-8 hover:border-[#22C55E]/50 transition-all cursor-pointer">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/20 text-[#22C55E]">
                <FiShare2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Collaboration</h3>
              <p className="text-gray-400 text-sm">
                Invite friends to build playlists in real-time. Shared
                listening rooms and community voting features included.
              </p>
            </div>

            {/* Bottom Row */}
            {[
              { icon: FiDownload, color: "primary", title: "Offline Sync", desc: "Download entire libraries locally for uninterrupted listening anywhere." },
              { icon: BiLibrary, color: "accent", title: "Crate Management", desc: "Digital crates for DJs and music selectors to prep sets with ease." },
            ].map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#141433] p-8 hover:border-white/20 transition-all cursor-pointer">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${f.color === 'primary' ? 'bg-primary-600/20 text-primary-400' : 'bg-accent-500/20 text-accent-400'}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}

            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-primary-900 to-[#141433] p-8 hover:border-primary-400/50 transition-all cursor-pointer">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <FiUsers size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Hub</h3>
              <p className="text-gray-300 text-sm">Join thousands of curators sharing exclusive playlists monthly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#0e0e29]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-righteous)]">3 Steps to Perfection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-white/5 -z-10"></div>

            {[
              { step: "01", title: "Import Your Tracks", desc: "Connect Spotify, Apple Music, or your local library files with one click." },
              { step: "02", title: "Curate the Vibe", desc: "Use our intelligent sorting tools to build folders and themed playlists." },
              { step: "03", title: "Share & Enjoy", desc: "Generate public links or embed your collection on any website seamlessly." }
            ].map((item, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-3xl font-bold text-white shadow-lg shadow-primary-500/20 ring-8 ring-[#141433]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 max-w-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 overflow-hidden relative">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 px-8 py-20 text-center shadow-3xl">
            {/* Background Decorative Circles */}
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-[family-name:var(--font-righteous)]">
                Ready to find your rhythm?
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mb-12 font-medium">
                Join 50,000+ music lovers who trust MusicPM for their daily inspiration.
                Free to start, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="rounded-2xl bg-[#22C55E] px-10 py-5 text-xl font-bold text-white hover:bg-[#1db954] transition-all hover:scale-105 cursor-pointer shadow-xl shadow-black/20">
                  Launch Free App
                </Link>
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-primary-600 bg-gray-300"></div>
                    ))}
                  </div>
                  <span className="text-sm text-white/90 font-semibold tracking-wide">+800 joining today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#0a0a1a]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white font-[family-name:var(--font-righteous)]">MusicPM</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest border-l border-white/10 pl-3">Design by Antigravity</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500 font-medium">
            <Link href="#" className="hover:text-white cursor-pointer px-2 py-1">Privacy Policy</Link>
            <Link href="#" className="hover:text-white cursor-pointer px-2 py-1">Terms of Service</Link>
            <Link href="#" className="hover:text-white cursor-pointer px-2 py-1">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
