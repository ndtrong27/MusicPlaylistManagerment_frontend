import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playlists | Music Playlist Manager",
};

export default function PlaylistsPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">My Playlists</h1>
      <p className="mt-2 text-gray-400">Manage and explore your playlists.</p>
    </div>
  );
}
