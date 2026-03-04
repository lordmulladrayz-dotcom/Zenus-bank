import React, { useState } from 'react';
import { 
  LayoutDashboard, ArrowUpRight, ArrowDownLeft, Send, History, 
  LogOut, Wallet, TrendingUp, ShieldCheck, Search, Bell, 
  Eye, EyeOff, Lock, AlertCircle, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { cn } from './lib/utils';

type View = 'dashboard' | 'transactions' | 'send-money';

interface Transaction {
  id: string; title: string; amount: number; 
  type: 'income' | 'expense'; date: string; category: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Real Estate Investment', amount: 100000, type: 'income', date: '2024-03-01', category: 'Investment' },
  { id: '2', title: 'YouTube Ad Revenue', amount: 50000, type: 'income', date: '2024-02-28', category: 'Business' },
  { id: '3', title: 'Private Jet Maintenance', amount: 25000, type: 'expense', date: '2024-02-25', category: 'Transport' },
  { id: '4', title: 'Luxury Villa Rental', amount: 15000, type: 'expense', date: '2024-02-20', category: 'Lifestyle' },
  { id: '5', title: 'Stock Dividends', amount: 12000, type: 'income', date: '2024-02-15', category: 'Investment' },
];

const CHART_DATA = [
  { name: 'Jan', balance: 11500000 },
  { name: 'Feb', balance: 11800000 },
  { name: 'Mar', balance: 12000000 },
];

const BANKS = [
  'JPMorgan Chase', 'Bank of America', 'Citigroup', 'Wells Fargo', 'Goldman Sachs', 
  'Morgan Stanley', 'U.S. Bancorp', 'PNC Financial Services', 'Truist Financial', 
  'Capital One', 'TD Bank', 'Bank of New York Mellon', 'American Express', 
  'Citizens Financial Group', 'First Citizens Bank', 'Fifth Third Bank', 
  'KeyCorp', 'Huntington Bancshares', 'M&T Bank', 'Regions Financial Corporation', 
  'Northern Trust', 'Discover Financial', 'Santander Bank'
];
const Login = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (name === 'Christopher Alexander Mitchell' && password === 'ChrisforGod200') {
        onLogin(name);
      } else {
        setError('Invalid credentials. Please check your account name and password.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-500 mb-2 tracking-tight">Zenus Bank</h1>
          <p className="text-blue-500 text-sm uppercase tracking-[0.2em]">Private Banking</p>
        </div>
        <div className="bg-[#141414] border border-white/10 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Account Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white/30 transition-colors" placeholder="Full Legal Name" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Access Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white/30 transition-colors" placeholder="••••••••" required />
            </div>
            {error && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg"><AlertCircle size={16} /><span>{error}</span></motion.div>}
            <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <><ShieldCheck size={20} />Sign In Securely</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onViewAll }: { onViewAll: () => void }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeBadges, setActiveBadges] = useState<string[]>([]);
  const toggleBadge = (badge: string) => setActiveBadges(prev => prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-sm text-white font-medium">Welcome back,</p>
          <h2 className="text-3xl font-bold text-white">Christopher Alexander Mitchell</h2>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white/5 border border-white/10 rounded-full shadow-sm hover:bg-white/10 transition-colors"><Bell size={20} className="text-white/70" /></button>
          <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-white/5 border border-white/10 rounded-full shadow-sm hover:bg-white/10 transition-colors">{showBalance ? <EyeOff size={20} className="text-white/70" /> : <Eye size={20} className="text-white/70" />}</button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><Wallet size={80} /></div>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Total Combined Balance</p>
          <h3 className="text-4xl font-bold mb-6">{showBalance ? '$12,000,000.00' : '••••••••'}</h3>
          <div className="flex items-center gap-2 text-white text-sm font-medium"><TrendingUp size={16} /><span>+2.4% this month</span></div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-[#141414] border border-white/10 p-8 rounded-3xl shadow-sm">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Premium Savings</p>
          <h3 className="text-3xl font-bold mb-6 text-white">{showBalance ? '$2,000,000.00' : '••••••••'}</h3>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className="bg-white h-full w-[85%]" /></div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-[#141414] border border-white/10 p-8 rounded-3xl shadow-sm">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Premium Checking</p>
          <h3 className="text-3xl font-bold mb-6 text-white">{showBalance ? '$400,000.00' : '••••••••'}</h3>
          <div className="flex gap-2">
            <button onClick={() => toggleBadge('infinite')} className={cn("px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase text-white transition-all outline-none", activeBadges.includes('infinite') ? "ring-2 ring-blue-500" : "")}>Infinite Card</button>
            <button onClick={() => toggleBadge('priority')} className={cn("px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase text-white transition-all outline-none", activeBadges.includes('priority') ? "ring-2 ring-blue-500" : "")}>Priority</button>
          </div>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#141414] border border-white/10 p-8 rounded-3xl shadow-sm">
          <h4 className="text-lg font-bold text-white">Wealth Growth</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs><linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fff" stopOpacity={0.1}/><stop offset="95%" stopColor="#fff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} itemStyle={{ color: '#fff' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']} />
                <Area type="monotone" dataKey="balance" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6"><h4 className="text-lg font-bold text-white">Recent Activity</h4><button onClick={onViewAll} className="text-xs font-semibold uppercase tracking-wider text-white/40 hover:text-white transition-colors">View All</button></div>
          <div className="space-y-6">
            {INITIAL_TRANSACTIONS.slice(0, 4).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tx.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>{tx.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</div>
                  <div><p className="text-sm font-medium text-white">{tx.title}</p><p className="text-xs text-white/40">{tx.category}</p></div>
                </div>
                <p className={cn("text-sm font-semibold", tx.type === 'income' ? "text-emerald-400" : "text-red-400")}>{tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const TransactionsView = () => (
  <div className="space-y-8">
    <header><h2 className="text-3xl font-bold text-white">Transaction History</h2><p className="text-white">Detailed overview of your financial movements.</p></header>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl"><p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Income</p><p className="text-2xl font-bold text-white">$162,000.00</p></div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl"><p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Expenses</p><p className="text-2xl font-bold text-white">$40,000.00</p></div>
    </div>
    <div className="bg-[#141414] border border-white/10 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} /><input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-full text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/10" /></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="bg-white/[0.02] text-[10px] font-bold uppercase tracking-[0.15em] text-white/40"><th className="px-8 py-4">Transaction</th><th className="px-8 py-4">Category</th><th className="px-8 py-4">Date</th><th className="px-8 py-4 text-right">Amount</th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {INITIAL_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-8 py-6"><div className="flex items-center gap-3"><div className={cn("w-8 h-8 rounded-full flex items-center justify-center", tx.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>{tx.type === 'income' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}</div><span className="text-sm font-medium text-white">{tx.title}</span></div></td>
                <td className="px-8 py-6"><span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">{tx.category}</span></td>
                <td className="px-8 py-6 text-sm text-white/50">{tx.date}</td>
                <td className={cn("px-8 py-6 text-sm font-semibold text-right", tx.type === 'income' ? "text-emerald-400" : "text-red-400")}>{tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SendMoneyView = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    setTimeout(() => {
      if (pin === '9009') { setError('Account frozen. For more information, go to nearest bank branch'); setIsProcessing(false); }
      else { setError('Invalid Security PIN. Access Denied.'); setIsProcessing(false); }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="text-center"><h2 className="text-3xl font-bold text-white">Secure Transfer</h2><p className="text-white">Move funds across global networks instantly.</p></header>
      <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl shadow-sm">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div><label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Recipient Bank</label><select value={bank} onChange={(e) => setBank(e.target.value)} className="w-full bg-white/5 border-none text-white px-4 py-3 rounded-xl focus:ring-1 focus:ring-white/10"><option value="">Select Destination Bank</option>{BANKS.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Account Number</label><input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="0000 0000 0000" className="w-full bg-white/5 border-none text-white px-4 py-3 rounded-xl focus:ring-1 focus:ring-white/10" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Amount (USD)</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg">$</span><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-white/5 border-none text-white pl-10 pr-4 py-4 rounded-xl text-xl font-bold focus:ring-1 focus:ring-white/10" /></div></div>
              <button onClick={() => setStep(2)} disabled={!amount || !bank || !accountNumber} className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50">Continue to Verification</button>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="bg-white/5 p-4 rounded-xl space-y-2"><div className="flex justify-between text-sm"><span className="text-white/40">Recipient</span><span className="font-medium text-white">{bank}</span></div><div className="flex justify-between text-sm"><span className="text-white/40">Amount</span><span className="font-bold text-white">${Number(amount).toLocaleString()}</span></div></div>
              <form onSubmit={handleTransfer} className="space-y-6">
                <div><label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2 text-center">Enter 4-Digit Transfer PIN</label><div className="flex justify-center gap-4"><input type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} className="w-32 text-center bg-white/5 border-none text-white px-4 py-4 rounded-xl text-2xl tracking-[1em] focus:ring-1 focus:ring-white/10" placeholder="••••" required /></div></div>
                {error && <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={cn("p-4 rounded-xl flex items-start gap-3 text-sm border", error.includes('frozen') ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-white/5 text-white border-white/10")}><AlertCircle className="shrink-0 mt-0.5" size={18} /><span>{error}</span></motion.div>}
                <div className="flex gap-4"><button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">Back</button><button type="submit" disabled={isProcessing || pin.length < 4} className="flex-2 bg-white text-black py-4 rounded-xl font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">{isProcessing ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <><Lock size={18} />Authorize Transfer</>}</button></div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const handleLogout = () => { setUser(null); setActiveView('dashboard'); setIsSidebarOpen(false); setIsProfilePopupOpen(false); };
  const handleViewChange = (view: View) => { setActiveView(view); setIsSidebarOpen(false); };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A0A0A] z-30">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Menu size={24} className="text-white" /></button>
        <div className="flex flex-col items-center"><h1 className="text-xl font-bold tracking-tight text-blue-500">Zenus</h1><p className="text-[8px] uppercase tracking-[0.2em] text-blue-500 font-bold">Private Banking</p></div>
        <div className="relative"><button onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-white/20 transition-colors">CA</button>
          <AnimatePresence>{isProfilePopupOpen && (<><div className="fixed inset-0 z-40" onClick={() => setIsProfilePopupOpen(false)} /><motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50 p-2"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><LogOut size={18} />Sign Out</button></motion.div></>)}</AnimatePresence>
        </div>
      </header>
      <AnimatePresence>
        {isSidebarOpen && (
          <><div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsSidebarOpen(false)} /><motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-72 bg-[#141414] border-r border-white/10 flex flex-col z-50">
              <div className="p-8 flex justify-between items-center"><div><h1 className="text-2xl font-bold tracking-tight text-blue-500">Zenus</h1><p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold">Private Banking</p></div><button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><X size={20} className="text-white/50" /></button></div>
              <nav className="flex-1 px-4 space-y-2">
                <button onClick={() => handleViewChange('dashboard')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all", activeView === 'dashboard' ? "bg-white text-black shadow-lg" : "text-white/50 hover:bg-white/5")}><LayoutDashboard size={20} />Dashboard</button>
                <button onClick={() => handleViewChange('transactions')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all", activeView === 'transactions' ? "bg-white text-black shadow-lg" : "text-white/50 hover:bg-white/5")}><History size={20} />Transactions</button>
                <button onClick={() => handleViewChange('send-money')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all", activeView === 'send-money' ? "bg-white text-black shadow-lg" : "text-white/50 hover:bg-white/5")}><Send size={20} />Send Money</button>
              </nav>
              <div className="p-4 border-t border-white/10"><div className="bg-white/5 p-4 rounded-2xl mb-4"><div className="flex items-center gap-3 mb-3"><div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-white text-xs font-bold">CA</div><div><p className="text-xs font-bold truncate w-32 text-white">C.A. Mitchell</p><p className="text-[10px] text-white font-bold">Elite Member</p></div></div><button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><LogOut size={14} />Sign Out</button></div></div>
            </motion.aside></>
        )}
      </AnimatePresence>
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeView === 'dashboard' && <Dashboard onViewAll={() => setActiveView('transactions')} />}
              {activeView === 'transactions' && <TransactionsView />}
              {activeView === 'send-money' && <SendMoneyView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
const TransactionsView=()=>(<div className="space-y-8"><h2 className="text-2xl font-bold">Transactions</h2><div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden"><table className="w-full text-left"><thead className="bg-white/5 text-[10px] uppercase text-white/40"><tr><th className="p-6">Name</th><th className="p-6">Date</th><th className="p-6 text-right">Amount</th></tr></thead><tbody className="divide-y divide-white/5">{INITIAL_TRANSACTIONS.map(t=>(<tr key={t.id} className="text-sm"><td className="p-6">{t.title}</td><td className="p-6 text-white/40">{t.date}</td><td className={cn("p-6 text-right font-bold",t.type==='income'?'text-emerald-400':'text-red-400')}>{t.type==='income'?'+':'-'}${t.amount.toLocaleString()}</td></tr>))}</tbody></table></div></div>);
const SendMoneyView=()=>{
const [st,setSt]=useState(1);const [am,setAm]=useState('');const [bk,setBk]=useState('');const [ac,setAc]=useState('');const [pi,setPi]=useState('');const [er,setEr]=useState('');const [pr,setPr]=useState(false);
const tr=(s:React.FormEvent)=>{s.preventDefault();setPr(true);setEr('');setTimeout(()=>{if(pi==='9009'){setEr('Account frozen. Visit branch.');setPr(false);}else{setEr('Invalid PIN.');setPr(false);}},1500);};
return(<div className="max-w-xl mx-auto space-y-8"><h2 className="text-2xl font-bold text-center">Transfer</h2><div className="bg-[#141414] p-8 rounded-3xl border border-white/10"><AnimatePresence mode="wait">{st===1?(<motion.div key="1" initial={{opacity:0}} animate={{opacity:1}} className="space-y-4"><select value={bk} onChange={x=>setBk(x.target.value)} className="w-full bg-white/5 p-4 rounded-xl border-none text-white"><option value="">Select Bank</option>{BANKS.map(b=><option key={b} value={b}>{b}</option>)}</select><input type="text" value={ac} onChange={x=>setAc(x.target.value)} placeholder="Account Number" className="w-full bg-white/5 p-4 rounded-xl border-none text-white"/><input type="number" value={am} onChange={x=>setAm(x.target.value)} placeholder="Amount" className="w-full bg-white/5 p-4 rounded-xl border-none text-white text-xl font-bold"/><button onClick={()=>setSt(2)} disabled={!am||!bk||!ac} className="w-full bg-white text-black py-4 rounded-xl font-bold">Next</button></motion.div>):(<motion.div key="2" initial={{opacity:0}} animate={{opacity:1}} className="space-y-6"><div className="bg-white/5 p-4 rounded-xl text-sm"><p>Bank: {bk}</p><p className="font-bold">Amount: ${am}</p></div><form onSubmit={tr} className="space-y-4"><input type="password" maxLength={4} value={pi} onChange={x=>setPi(x.target.value)} className="w-full bg-white/5 p-4 rounded-xl text-center text-2xl tracking-widest" placeholder="PIN"/><button type="submit" disabled={pr||pi.length<4} className="w-full bg-white text-black py-4 rounded-xl font-bold">{pr?'Processing...':'Send Money'}</button><button onClick={()=>setSt(1)} className="w-full text-white/40 text-sm">Back</button></form>{er&&<div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-center text-sm border border-red-500/20">{er}</div>}</motion.div>)}</AnimatePresence></div></div>);};
export default function App(){
const [u,setU]=useState<string|null>(null);const [v,setV]=useState<View>('dashboard');const [o,setO]=useState(false);
if(!u)return <Login onLogin={setU}/>;
return(<div className="min-h-screen bg-[#0A0A0A] flex flex-col"><header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A0A0A] sticky top-0 z-50"><button onClick={()=>setO(true)} className="p-2"><Menu size={24}/></button><div className="text-center"><h1 className="text-lg font-bold text-blue-500">Zenus</h1><p className="text-[8px] uppercase text-blue-500 font-bold">Private Banking</p></div><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">CA</div></header><AnimatePresence>{o&&(<><div className="fixed inset-0 bg-black/60 z-40" onClick={()=>setO(false)}/><motion.aside initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} className="fixed top-0 left-0 bottom-0 w-64 bg-[#141414] z-50 p-8 flex flex-col"><div className="flex justify-between mb-12"><h1 className="text-xl font-bold text-blue-500">Zenus</h1><button onClick={()=>setO(false)}><X/></button></div><nav className="space-y-2 flex-1"><button onClick={()=>{setV('dashboard');setO(false)}} className={cn("w-full text-left p-4 rounded-xl",v==='dashboard'?'bg-white text-black':'text-white/50')}>Dashboard</button><button onClick={()=>{setV('transactions');setO(false)}} className={cn("w-full text-left p-4 rounded-xl",v==='transactions'?'bg-white text-black':'text-white/50')}>History</button><button onClick={()=>{setV('send-money');setO(false)}} className={cn("w-full text-left p-4 rounded-xl",v==='send-money'?'bg-white text-black':'text-white/50')}>Transfer</button></nav><button onClick={()=>setU(null)} className="text-red-400 p-4 text-left font-bold">Sign Out</button></motion.aside></>)}</AnimatePresence><main className="p-6 max-w-5xl mx-auto w-full">{v==='dashboard'&&<Dashboard onViewAll={()=>setV('transactions')}/>}{v==='transactions'&&<TransactionsView/>}{v==='send-money'&&<SendMoneyView/>}</main></div>);
  }
