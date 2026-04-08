"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const rawError = searchParams.get("error") || searchParams.get("message") || "An unknown error occurred";
  
  // Format the error message to be more readable (e.g., "missing_tokens" -> "Missing Tokens")
  const errorMessage = rawError.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glass Effect Container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="flex flex-col items-center space-y-6 text-center">
            
            {/* Error Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-red-400 to-red-600 p-4 rounded-2xl shadow-lg ring-1 ring-white/20">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-righteous text-white tracking-wide">
                Oops!
              </h1>
              <h2 className="text-xl font-poppins text-red-400 font-medium">
                Authentication Failed
              </h2>
              <p className="text-text-light/70 text-sm mt-3 px-4">
                {errorMessage}
              </p>
            </div>

            {/* Actions */}
            <div className="w-full pt-4 space-y-3">
              <Link 
                href="/dashboard"
                className="w-full relative group overflow-hidden rounded-xl p-[1px] block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background/50 backdrop-blur-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium hover:bg-background/30 transition-colors duration-300">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </div>
              </Link>

              <Link 
                href="/"
                className="w-full px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-text-light/60 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
