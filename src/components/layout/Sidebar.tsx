import Link from "next/link";
import { FiMusic, FiList, FiGrid, FiSettings, FiLogOut } from "react-icons/fi";

const navItems = [
  { href: "/dashboard", icon: FiGrid, label: "Dashboard" },
  { href: "/playlists", icon: FiList, label: "Playlists" },
  { href: "/songs", icon: FiMusic, label: "Songs" },
  { href: "/settings", icon: FiSettings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-800 bg-gray-950 px-4 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="text-2xl">🎵</span>
        <span className="font-display text-lg font-bold text-white">
          MusicPM
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-all duration-150 hover:bg-gray-800 hover:text-white"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-800 hover:text-red-400">
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
