import Link from 'next/link';
import { LayoutDashboard, KanbanSquare, Users, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Kanban Board', href: '/kanban', icon: KanbanSquare },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zenith-surface border-r border-white/5 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zenith-accent flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          <span className="text-white font-bold text-xl">Z</span>
        </div>
        <span className="text-2xl font-bold text-gradient tracking-wide">Zenith</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-xl transition-all group"
            >
              <Icon size={20} className="group-hover:text-zenith-accent transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
          <p className="text-sm text-zinc-400 mb-3">Unlock more features for your agency.</p>
          <button className="w-full py-2 bg-zenith-accent hover:bg-zenith-accent-hover text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
}
