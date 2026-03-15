import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Songs | Music Playlist Manager",
};

export default function SongsPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Songs</h1>
      <p className="mt-2 text-gray-400">Browse your entire song library.</p>
    </div>
  );
}
