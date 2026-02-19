"use client";

import { useState } from 'react';
import { Plus, Search, MoreVertical, Mail, Building, ArrowUpDown } from 'lucide-react';
import { createClientAction } from './actions';

// Definimos la interfaz basada en nuestra tabla SQL
interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  created_at: string;
}

export default function ClientTable({ initialClients }: { initialClients: Client[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filteredClients = initialClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Clients</h1>
          <p className="text-zinc-400 mt-1">Manage your client relationships and contact information.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-zenith-accent hover:bg-zenith-accent-hover text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap"
        >
          {isAdding ? 'Cancel' : <><Plus size={16} /> Add Client</>}
        </button>
      </div>

      {/* Formulario rápido para agregar cliente */}
      {isAdding && (
        <form action={async (formData) => {
          await createClientAction(formData);
          setIsAdding(false);
        }} className="glass-panel p-4 flex gap-4 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-xs text-zinc-400">Name</label>
            <input name="name" required className="w-full bg-zenith-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zenith-accent" placeholder="Jane Doe" />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs text-zinc-400">Company</label>
            <input name="company" required className="w-full bg-zenith-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zenith-accent" placeholder="Acme Corp" />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs text-zinc-400">Email</label>
            <input name="email" type="email" required className="w-full bg-zenith-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zenith-accent" placeholder="jane@acme.com" />
          </div>
          <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors h-[38px]">
            Save
          </button>
        </form>
      )}

      {/* Toolbar */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-zenith-bg border border-white/5 rounded-lg px-3 py-2 w-full max-w-md focus-within:border-zenith-accent/50 focus-within:ring-1 focus-within:ring-zenith-accent/50 transition-all">
          <Search size={16} className="text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-zinc-200 w-full placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Client</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zenith-accent/20 to-purple-500/20 flex items-center justify-center border border-white/10 text-zinc-200 font-medium uppercase">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{client.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                          <Building size={12} /> {client.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Mail size={14} /> {client.email}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-zinc-500">
                    No clients found. Click "Add Client" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}