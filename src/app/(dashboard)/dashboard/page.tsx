import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Music Playlist Manager",
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-400">Welcome back! Here's your music overview.</p>
    </div>
  );
}
