import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  LogOut, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  Sparkles,
  Laptop
} from 'lucide-react';
import { api } from '../services/api';

interface AdminSectionProps {
  adminUser: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
  onOpenDashboard: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({
  adminUser,
  onLogin,
  onLogout,
  onOpenDashboard
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.adminLogin(username, password);
      onLogin(res.admin);
    } catch (err: any) {
      setError(err.message || 'Invalid administrator username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admin" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white relative border-t border-emerald-700/40 transition-colors duration-300">
      {/* Decorative ambient gradients */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-school-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-school-gold/40 text-school-gold text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-school-gold" />
            <span>Administrative Management Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Staff & Administrator Portal
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Authorized management area for Hammadur Rahman Academy administrators, examiners, house masters, and accounts bursary.
          </p>
        </div>

        {/* Dynamic State: Logged Out vs. Logged In */}
        {!adminUser ? (
          /* ==================== 1. LOGGED OUT STATE: LOGIN FORM ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info & Feature List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-emerald-900/40 dark:bg-emerald-900/20 rounded-3xl p-6 sm:p-8 border border-emerald-700/50 backdrop-blur-md shadow-royal">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-school-gold to-amber-600 flex items-center justify-center text-emerald-950 font-bold shadow-gold-glow">
                    <Lock className="w-6 h-6 text-emerald-950" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      Faculty & Administrative Control
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-200">
                      WAEC / NECO Accredited Examination Center: <strong className="text-school-gold">4260189</strong>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-emerald-100/90 leading-relaxed mb-6">
                  Log in with your institutional credentials to manage student profiles, publish term examination report cards, review admission applications, allocate boarding bedspaces, and oversee school fee receipts.
                </p>

                {/* Capabilities grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Results & Scratch Cards</h4>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">Upload terminal scores, positions, and generate 12-digit scratch card PINs.</p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 flex items-start gap-3">
                    <Users className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Students & Admissions</h4>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">Approve new entrance applications and assign class arms (Diamond/Gold).</p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bursary & Payments</h4>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">Record bank transfers, tuition receipts, and manage fee schedules.</p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 flex items-start gap-3">
                    <Laptop className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">120-Seat CBT Lab</h4>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">Configure WAEC, NECO & JAMB practice tests with automated scoring.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Login Form Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-emerald-900/60 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border-2 border-school-gold/50 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                
                {/* Form Top Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-emerald-800">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-school-gold" />
                      Admin Login
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-emerald-200 mt-1">
                      Enter administrative credentials to gain access
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-school-gold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2.5 mb-5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
                      Username / Staff ID
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. admin or bursar"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-emerald-950/80 border border-slate-300 dark:border-emerald-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-school-gold text-sm font-medium transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
                      Security Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-emerald-950/80 border border-slate-300 dark:border-emerald-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-school-gold text-sm font-medium transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Authenticating with Lafia Server...</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4 text-school-gold" />
                          <span>Login to Admin Portal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-800 text-center">
                  <p className="text-[11px] text-slate-400 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-school-gold" />
                    <span>Connected to SQLite WAL Database • Port 5000</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ==================== 2. LOGGED IN STATE: ADMIN DASHBOARD PART ==================== */
          <div className="bg-emerald-900/60 dark:bg-emerald-900/30 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-school-gold/60 backdrop-blur-md shadow-2xl">
            
            {/* Top Authenticated User Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-emerald-800/80">
              
              {/* User Profile */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-school-gold via-amber-400 to-amber-600 p-0.5 shadow-gold-glow">
                    <div className="w-full h-full rounded-2xl bg-emerald-950 flex items-center justify-center text-school-gold font-bold text-xl">
                      {adminUser.fullName ? adminUser.fullName.charAt(0) : 'A'}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-emerald-950 animate-pulse" title="Active Session" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                      Active Administrator Session
                    </span>
                    <span className="text-xs text-emerald-300 hidden sm:inline">• Lafia Campus</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {adminUser.fullName || 'Dr. Abdur-Rahman A. Al-Hassan'}
                  </h3>
                  <p className="text-xs sm:text-sm text-school-gold font-medium">
                    {adminUser.role || 'Principal & Director of Studies'} • Account: <code className="bg-emerald-950/80 px-1.5 py-0.5 rounded text-white">{adminUser.username}</code>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Open Dashboard & Logout */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-school-gold to-amber-500 hover:from-amber-400 hover:to-school-gold text-emerald-950 font-bold text-xs sm:text-sm shadow-gold-glow flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-950" />
                  <span>Open Full Admin Dashboard</span>
                </button>

                <button
                  onClick={onLogout}
                  className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200"
                  title="Sign out of administrative session"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800">
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                  <span>Enrolled Students</span>
                  <Users className="w-4 h-4 text-school-gold" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">4</div>
                <span className="text-[10px] text-emerald-400 mt-1 block">Active across Junior & Senior arms</span>
              </div>

              <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800">
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                  <span>Faculty & Staff</span>
                  <GraduationCap className="w-4 h-4 text-school-gold" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">5</div>
                <span className="text-[10px] text-emerald-400 mt-1 block">TRCN certified instructors</span>
              </div>

              <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800">
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                  <span>Fee Collections</span>
                  <CreditCard className="w-4 h-4 text-school-gold" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">₦450,000</div>
                <span className="text-[10px] text-emerald-400 mt-1 block">Verified terminal bursary receipts</span>
              </div>

              <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800">
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                  <span>Active CBT Exams</span>
                  <Laptop className="w-4 h-4 text-school-gold" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">2</div>
                <span className="text-[10px] text-emerald-400 mt-1 block">120-Seat Solar Lab Mock Tests</span>
              </div>
            </div>

            {/* Module Shortcuts Grid */}
            <div className="mt-8 pt-8 border-t border-emerald-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-school-gold" />
                <span>Direct Administrative Management Modules</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={onOpenDashboard}
                  className="bg-emerald-950/60 hover:bg-emerald-800/50 p-4 rounded-2xl border border-emerald-800 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-school-gold/20 flex items-center justify-center text-school-gold mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-white group-hover:text-school-gold transition-colors">Students & PINs</h5>
                  <p className="text-xs text-emerald-300/80 mt-1">Enroll students & issue 12-digit scratch card PINs.</p>
                </button>

                <button
                  onClick={onOpenDashboard}
                  className="bg-emerald-950/60 hover:bg-emerald-800/50 p-4 rounded-2xl border border-emerald-800 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-school-gold/20 flex items-center justify-center text-school-gold mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-white group-hover:text-school-gold transition-colors">Terminal Results</h5>
                  <p className="text-xs text-emerald-300/80 mt-1">Upload grades, class positions, and promotion remarks.</p>
                </button>

                <button
                  onClick={onOpenDashboard}
                  className="bg-emerald-950/60 hover:bg-emerald-800/50 p-4 rounded-2xl border border-emerald-800 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-school-gold/20 flex items-center justify-center text-school-gold mb-3 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-white group-hover:text-school-gold transition-colors">Bursary & Fees</h5>
                  <p className="text-xs text-emerald-300/80 mt-1">Manage term fee schedules and generate receipts.</p>
                </button>

                <button
                  onClick={onOpenDashboard}
                  className="bg-emerald-950/60 hover:bg-emerald-800/50 p-4 rounded-2xl border border-emerald-800 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-school-gold/20 flex items-center justify-center text-school-gold mb-3 group-hover:scale-110 transition-transform">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-white group-hover:text-school-gold transition-colors">CBT & Timetables</h5>
                  <p className="text-xs text-emerald-300/80 mt-1">Set test questions, check scores, and update class timetables.</p>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
