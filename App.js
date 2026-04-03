import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Mail, Users, Ticket, Shield, 
  Settings, HelpCircle, Search, Bell, Download, 
  Plus, Filter, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

// --- Mock Data ---
const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-04-01', category: 'Software', amount: 120.00, type: 'expense' },
  { id: 2, date: '2026-04-02', category: 'Consulting', amount: 2500.00, type: 'income' },
  { id: 3, date: '2026-04-02', category: 'Marketing', amount: 450.00, type: 'expense' },
  { id: 4, date: '2026-03-28', category: 'Sales', amount: 1800.00, type: 'income' },
];

const REVENUE_DATA = [
  { name: '20 Oct', val: 2400 }, { name: '21 Oct', val: 3200 },
  { name: '22 Oct', val: 4100 }, { name: '23 Oct', val: 3800 },
  { name: '24 Oct', val: 5200 }, { name: 'Today', val: 2100 },
];

const TICKET_DATA = [
  { month: 'Jan', created: 40, resolved: 24 },
  { month: 'Feb', created: 30, resolved: 13 },
  { month: 'Mar', created: 60, resolved: 38 },
  { month: 'Apr', created: 27, resolved: 39 },
  { month: 'May', created: 18, resolved: 48 },
];

export default function MetalicDashboard() {
  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [search, setSearch] = useState('');

  const canEdit = role === 'Admin';

  const filteredTransactions = transactions.filter(t => 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="text-xl font-bold tracking-tight">Metalic</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<Mail size={20}/>} label="Inbox" />
          <NavItem icon={<Users size={20}/>} label="Customer" />
          <NavItem icon={<Ticket size={20}/>} label="Ticket" />
          <div className="pt-4 pb-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools</div>
          <NavItem icon={<Shield size={20}/>} label="Security" />
        </nav>

        <div className="pt-10 border-t border-slate-100 space-y-1">
          <NavItem icon={<Settings size={20}/>} label="Settings" />
          <NavItem icon={<HelpCircle size={20}/>} label="Help & Support" />
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
             <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">System Role</p>
             <select 
              className="text-sm bg-transparent font-medium focus:outline-none w-full cursor-pointer"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
             >
               <option>Admin</option>
               <option>Viewer</option>
             </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-slate-500 cursor-pointer hover:text-blue-600 transition" />
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold">Young Hepher</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                <img src="https://ui-avatars.com/api/?name=Young+Hepher&bg=0D94FB&color=fff" alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Title & Actions */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, here is what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Product Revenue" value="€4,250" trend="+15%" trendUp={true} />
          <StatCard label="Total Deals" value="1,625" trend="-3%" trendUp={false} />
          <StatCard label="Opened Tickets" value="3,452" trend="+8%" trendUp={true} />
          <StatCard label="Average Reply" value="8:02" trend="+1%" trendUp={true} />
        </div>

        {/* Charts Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Total Revenue</h3>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-500">
              <Filter size={14}/>
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Avg. Ticket Created</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TICKET_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                  <Bar dataKey="created" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="resolved" fill="#DBEAFE" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pro Mode Banner */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Pro Mode</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">Upgrade now to unlock all advanced financial reporting tools and insights.</p>
              <button className="bg-white text-blue-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition active:scale-95">
                Unlock Now
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <section className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Recent Transactions</h3>
            {canEdit && (
              <button className="text-blue-600 flex items-center gap-1 text-sm font-bold hover:underline transition">
                <Plus size={16} /> Add Transaction
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium text-right">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(t => (
                    <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                      <td className="py-4 font-semibold text-slate-700">{t.category}</td>
                      <td className="py-4 text-slate-500">{t.date}</td>
                      <td className="py-4 font-bold text-slate-800">€{t.amount.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {t.type}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-slate-400 italic">No transactions found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
      active ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function StatCard({ label, value, trend, trendUp }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition">
      <p className="text-slate-500 text-sm mb-1 font-medium">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className={`text-xs font-bold mb-1 flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trendUp ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
          {trend}
        </span>
      </div>
    </div>
  );
}
