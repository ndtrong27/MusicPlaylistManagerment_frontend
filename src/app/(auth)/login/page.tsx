"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { FiMusic, FiPlayCircle, FiArrowLeft, FiShield } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-primary-600/10 blur-[130px] rounded-full"></div>
      
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex bg-primary-600 p-3 rounded-2xl text-white mb-4 shadow-lg shadow-primary-500/20">
            <FiMusic size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-righteous)]">
            MusicPM
          </h2>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-gray-400 font-[family-name:var(--font-poppins)]">
              Connect your account to start managing your vibes.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-[#22c55e] px-6 py-4 text-lg font-bold text-white transition-all hover:bg-[#1db954] hover:scale-[1.02] cursor-pointer shadow-xl shadow-black/20"
            >
              <FiPlayCircle size={24} />
              Connect Spotify
            </button>
            
            <button 
              className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer"
            >
              Other Providers
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-semibold">
              <FiShield className="text-primary-400" />
              <span>Secure Authentication</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-[family-name:var(--font-poppins)]">
          By connecting, you agree to our <Link href="#" className="text-white hover:underline">Terms of Service</Link> and <Link href="#" className="text-white hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
