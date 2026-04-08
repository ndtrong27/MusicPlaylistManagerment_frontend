"use client";

import { useEffect, Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";

function CallbackContent() {

  // méo biết làm gì ở đây
  const router = useRouter();
  const { login } = useAuth();
  // -------------------------

  async function saveRefreshToken(
    refreshToken: string
  ) {
    const response = await apiClient.get(
      `/auth/saveRefreshToken?refresh_token=${refreshToken}`
    );
    if (response.data?.success) {
      console.log("Refresh token saved successfully");
    }
  }


  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));

      const accessToken = params.get("provider_token");
      const refreshToken = params.get("provider_refresh_token");

      if (refreshToken) {
        saveRefreshToken(refreshToken);
      }

      if (accessToken) {
        // Save in React context
        login(accessToken);

        // save access token in local storage
        localStorage.setItem("access_token", accessToken);
        router.push(`/dashboard`);
      } else {
        // If no token, check for error or other params
        router.push("/");
      }
    } else {
      router.push("/");
    }

  }, [router, login]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-700/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-700 border-t-transparent animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-righteous text-white">Connecting...</h2>
          <p className="text-text-light/40 animate-pulse">
            Securely authenticating with Spotify
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  );
}
