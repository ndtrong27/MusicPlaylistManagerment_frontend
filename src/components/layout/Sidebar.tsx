import Link from "next/link";
import { Music, LayoutDashboard, ListMusic, AudioLines, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/playlists", icon: ListMusic, label: "Playlists" },
  { href: "/songs", icon: AudioLines, label: "Songs" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/5 bg-bg-dark px-4 py-8 shadow-xl">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green shadow-lg shadow-accent-green/20">
          <Music className="text-bg-dark" size={24} />
        </div>
        <span className="font-righteous text-2xl tracking-tight text-text-light">
          MusicPM
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive 
                  ? "bg-primary-700 text-text-light shadow-lg shadow-primary-700/20" 
                  : "text-text-light/50 hover:bg-white/5 hover:text-text-light"
              )}
            >
              <Icon size={20} className={clsx(
                "transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-accent-green" : "text-text-light/40"
              )} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button 
        onClick={logout}
        className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-light/40 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
