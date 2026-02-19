"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, Briefcase, Users, TrendingUp, Calendar, Clock } from 'lucide-react';

// --- MOCK DATA FOR CHARTS ---
const revenueData = [
  { month: 'Jan', revenue: 3200 }, { month: 'Feb', revenue: 4100 },
  { month: 'Mar', revenue: 3800 }, { month: 'Apr', revenue: 5200 },
  { month: 'May', revenue: 4800 }, { month: 'Jun', revenue: 6500 },
  { month: 'Jul', revenue: 7200 }, { month: 'Aug', revenue: 6800 },
  { month: 'Sep', revenue: 8500 }, { month: 'Oct', revenue: 9400 },
  { month: 'Nov', revenue: 11000 }, { month: 'Dec', revenue: 12450 },
];

const clientSourcesData = [
  { name: 'Referrals', value: 35 }, { name: 'Upwork', value: 45 },
  { name: 'Organic Web', value: 15 }, { name: 'Social Media', value: 5 },
];

const PIE_COLORS = ['#6366f1', '#4f46e5', '#818cf8', '#a5b4fc'];

// --- TYPES ---
interface Task {
  id: string;
  title: string;
  due_date: string;
  priority: string;
  clients: { name: string } | null;
}

interface DashboardProps {
  totalClients: number;
  activeProjects: number;
  upcomingTasks: Task[];
}

export default function DashboardClient({ totalClients, activeProjects, upcomingTasks }: DashboardProps) {
  
  // Helper para asignar colores según la prioridad
  const getUrgencyColor = (priority: string) => {
    switch(priority) {
      case 'Urgent': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Overview</h1>
          <p className="text-zinc-400 mt-1">Welcome back. Here is what's happening with your projects today.</p>
        </div>
        <button className="px-4 py-2 bg-zenith-accent hover:bg-zenith-accent-hover text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20">
          + New Project
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue (Mocked) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm font-medium">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-zenith-accent/10 flex items-center justify-center">
              <DollarSign size={18} className="text-zenith-accent" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-zinc-100">$12,450</h3>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> +12.5% from last month
            </p>
          </div>
        </div>

        {/* Active Projects (Real Data) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm font-medium">Active Projects</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase size={18} className="text-blue-500" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-zinc-100">{activeProjects}</h3>
            <p className="text-xs text-zinc-500 mt-1">Currently in progress</p>
          </div>
        </div>

        {/* Total Clients (Real Data) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm font-medium">Total Clients</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users size={18} className="text-purple-500" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-zinc-100">{totalClients}</h3>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Growing network
            </p>
          </div>
        </div>

        {/* Efficiency Rate (Mocked) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm font-medium">Efficiency Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-zinc-100">94%</h3>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Optimization on point
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart Section */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-100">Revenue Overview</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ backgroundColor: '#121215', borderColor: '#ffffff1a', borderRadius: '8px', color: '#f4f4f5' }} itemStyle={{ color: '#6366f1' }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel (Pie Chart & Deadlines) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          <div className="glass-panel p-6 flex flex-col gap-4 flex-1">
            <h2 className="text-lg font-semibold text-zinc-100">Client Sources</h2>
            <div className="h-[180px] w-full relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={clientSourcesData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {clientSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121215', borderColor: '#ffffff1a', borderRadius: '8px', color: '#f4f4f5' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-zinc-100">{totalClients}</span>
                <span className="text-xs text-zinc-500">Clients</span>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines (Real Data) */}
          <div className="glass-panel p-6 flex flex-col gap-4 flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-zinc-100">Upcoming Deadlines</h2>
              <Calendar size={16} className="text-zinc-500" />
            </div>
            <div className="space-y-4 mt-2">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="mt-0.5">
                      <Clock size={16} className={getUrgencyColor(item.priority)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate">{item.title}</p>
                      <p className="text-xs text-zinc-500 truncate">{item.clients?.name || 'Internal Task'}</p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className={`text-xs font-medium ${getUrgencyColor(item.priority)}`}>
                        {new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 text-center py-4">No upcoming deadlines.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}