import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Music Playlist Manager",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800">
        <h1 className="font-display text-3xl font-bold text-center">Create Account</h1>
        <p className="mt-2 text-gray-400 text-center">Start managing your music today.</p>
      </div>
    </div>
  );
}
