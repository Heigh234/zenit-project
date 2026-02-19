import { Bell, Search, User, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function Topbar() {
  const supabase = await createClient();
  
  // 1. Obtenemos el usuario autenticado
  const { data: { user } } = await supabase.auth.getUser();

  let displayName = "Developer Workspace";
  let emailStr = "";

  // 2. Si hay usuario, intentamos obtener su nombre del perfil o usamos su email
  if (user) {
    emailStr = user.email || "";
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single();

    if (profile?.full_name) {
      displayName = profile.full_name;
    } else {
      // Fallback: usar la parte del correo antes del @
      displayName = emailStr.split('@')[0];
    }
  }

  // 3. Server Action nativa para cerrar sesión de forma segura
  async function signOut() {
    "use server";
    const supabaseServer = await createClient();
    await supabaseServer.auth.signOut();
    redirect('/login');
  }

  return (
    <header className="h-20 px-8 flex items-center justify-between bg-zenith-bg/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-zenith-surface border border-white/5 rounded-xl px-4 py-2 w-96 transition-all focus-within:border-zenith-accent/50 focus-within:ring-1 focus-within:ring-zenith-accent/50">
        <Search size={18} className="text-zinc-500" />
        <input 
          type="text" 
          placeholder="Search projects, clients or tasks..." 
          className="bg-transparent border-none outline-none text-sm text-zinc-200 w-full placeholder:text-zinc-500"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-zenith-accent rounded-full border-2 border-zenith-bg"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-white/5">
          {/* User Info Dinámica */}
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-zinc-200 capitalize">{displayName}</p>
            <p className="text-xs text-zinc-500">{emailStr}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-zenith-surface border border-white/10 flex items-center justify-center overflow-hidden">
            <User size={20} className="text-zinc-400" />
          </div>

          {/* Botón de Logout conectado a la Server Action */}
          <form action={signOut}>
            <button 
              type="submit" 
              className="p-2 ml-2 text-zinc-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-red-400/50"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}