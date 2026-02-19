import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zenith-bg absolute inset-0 z-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-zenith-accent flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] mb-4">
            <span className="text-white font-bold text-3xl">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Welcome to Zenith</h1>
          <p className="text-zinc-400 text-sm mt-1">Sign in to your agency workspace</p>
        </div>

        <form className="glass-panel p-6 flex flex-col gap-5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="name@agency.com"
              className="w-full bg-zenith-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-zenith-accent focus:ring-1 focus:ring-zenith-accent transition-all" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400" htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full bg-zenith-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-zenith-accent focus:ring-1 focus:ring-zenith-accent transition-all" 
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button 
              formAction={login} 
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Log in
            </button>
            <button 
              formAction={signup} 
              className="flex-1 bg-zenith-accent hover:bg-zenith-accent-hover text-white py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}