"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const hasFetched = useRef(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !hasFetched.current) {
      hasFetched.current = true;

      apiClient.get(`/auth/oauth2?code=${code}`)
        .then((response) => {
          if (response.data?.success) {
            const token = response.data.data.access_token;
            const user = response.data.data.user;
            login(token, user);
            router.push("/dashboard");
          } else {
            setErrorMsg("Authentication failed. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Failed to exchange token", err);
          setErrorMsg(err.response?.data?.message || err.message || "Failed to exchange token with Spotify.");
          // We remove router.push("/") here so the user can actually see the error!
        });
    } else if (!code && !hasFetched.current) {
        setErrorMsg("No authorization code provided by Spotify.");
    }
  }, [searchParams, login, router]);

  if (errorMsg) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg-dark gap-4">
        <div className="text-center max-w-md p-8 rounded-2xl bg-white/5 border border-red-500/30">
          <h2 className="font-righteous text-2xl text-red-400 mb-4">
            Validation Error
          </h2>
          <p className="text-text-light/80 mb-6">{errorMsg}</p>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-dark">
      <div className="text-center">
        <h2 className="font-righteous text-2xl text-accent-green mb-4 animate-pulse">
          Authenticating with Spotify...
        </h2>
        <p className="text-text-light/40">Please wait while we establish your secure session.</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-bg-dark">
        <div className="h-8 w-8 border-4 border-accent-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
