import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { 
  X, 
  Home, 
  Info, 
  GraduationCap, 
  Building2, 
  Users, 
  Bell, 
  Phone, 
  UserCheck, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Atom, 
  Scroll, 
  TrendingUp, 
  HeartHandshake, 
  ShieldCheck,
  FileCheck,
  MapPin,
  Clock,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenPortal: () => void;
  onOpenApply: () => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  adminUser?: any;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
  onOpenPortal,
  onOpenApply,
  onOpenAdmin,
  isDarkMode,
  onToggleDarkMode,
  adminUser,
  onLogout,
}) => {
  const handleNavClick = (sectionId: string, href: string) => {
    setActiveSection(sectionId);
    onClose();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainNavItems = [
    { id: 'home', label: 'Home Page', href: '#home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: "About & Principal's Welcome", href: '#about', icon: <Info className="w-4 h-4" /> },
    { id: 'academics', label: 'Academic Programs', href: '#academics', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions 2026/2027', href: '#admissions', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'facilities', label: 'Campus Infrastructure', href: '#facilities', icon: <Building2 className="w-4 h-4" /> },
    { id: 'student-life', label: 'Student & Boarding Life', href: '#student-life', icon: <Users className="w-4 h-4" /> },
    { id: 'news', label: 'Bulletins & Term Calendar', href: '#news', icon: <Bell className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Lafia Location', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];


  const academicDepartments = [
    { label: 'Junior Secondary (JSS 1–3)', icon: <BookOpen className="w-3.5 h-3.5 text-school-gold" />, href: '#academics' },
    { label: 'Senior Science & STEM', icon: <Atom className="w-3.5 h-3.5 text-sky-400" />, href: '#academics' },
    { label: 'Arts & Islamic Humanities', icon: <Scroll className="w-3.5 h-3.5 text-emerald-400" />, href: '#academics' },
    { label: 'Commercial & Business', icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" />, href: '#academics' },
    { label: 'Tahfeez & Ethics Mentorship', icon: <HeartHandshake className="w-3.5 h-3.5 text-teal-400" />, href: '#academics' },
  ];

  return (
    <>
      {/* Background Dim Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-gradient-to-b from-[#021d15] via-emerald-950 to-[#022c22] text-white z-50 shadow-2xl border-r border-school-gold/30 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-school-gold to-amber-600 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-school-dark rounded-[10px] flex items-center justify-center border border-school-gold/40">
                <GraduationCap className="w-6 h-6 text-school-gold" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white font-heading tracking-tight">
                Hammadur Rahman
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-school-goldLight">
                <span className="font-semibold">Academy Secondary</span>
                <span>•</span>
                <span>Lafia</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          
          {/* WAEC & NECO Accreditation Badge (Moved from Top Bar) */}
          <div className="p-3.5 rounded-2xl bg-[#022419] border border-school-gold/40 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-school-gold/20 border border-school-gold/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-school-gold" />
              </div>
              <div className="text-[11px] text-emerald-100">
                <div className="font-extrabold text-white text-xs uppercase tracking-wide">Accredited Center</div>
                <div className="text-school-gold font-mono font-bold">WAEC: 4260189 • NECO: 025114</div>
              </div>
            </div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lafia
            </span>
          </div>

          {/* Quick Services & Portals (Moved from Top Bar) */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-black uppercase tracking-wider text-school-gold px-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-school-gold" />
              <span>Student & Parent Portals</span>
            </p>

            {/* Apply Online */}
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="w-full py-3 px-3.5 rounded-xl bg-gradient-to-r from-school-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-school-goldHover text-[#022419] text-xs font-black flex items-center justify-between shadow-gold-glow transition-all transform hover:scale-[1.02]"
              title="Apply Online for 2026/2027 Admission"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#022419]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#022419]" />
                </div>
                <div className="text-left">
                  <div className="font-black text-xs leading-tight">Apply Online</div>
                  <div className="text-[10px] font-bold text-[#022419]/80">2026/2027 Admission Form</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#022419]" />
            </button>

            {/* Student & Fee Payment Portal */}
            <button
              onClick={() => {
                onClose();
                onOpenPortal();
              }}
              className="w-full py-3 px-3.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-between border border-school-gold/40 shadow-sm transition-all transform hover:scale-[1.02]"
              title="Open Student Portal for Results, School Fees & Receipts"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-school-gold/20 flex items-center justify-center border border-school-gold/40">
                  <UserCheck className="w-4 h-4 text-school-gold" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-white leading-tight">Student & Fees Portal</div>
                  <div className="text-[10px] text-emerald-300">Check Results & Pay School Fees</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-school-gold" />
            </button>

            {/* Staff Administrative Access Section (Exclusively in Sidebar) */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-school-gold px-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-school-gold" />
                <span>Staff & Administrative Access</span>
              </p>

              {adminUser ? (
                <div className="p-3.5 rounded-2xl bg-[#022419] border border-school-gold/50 shadow-md space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold text-white truncate max-w-[180px]">
                          {adminUser.fullName || adminUser.username}
                        </div>
                        <div className="text-[10px] text-school-gold font-medium">
                          {adminUser.role || 'Staff Administrator'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-extrabold uppercase">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAdmin();
                      }}
                      className="py-2 px-3 bg-school-gold hover:bg-amber-400 text-emerald-950 rounded-xl text-xs font-black text-center transition-colors shadow-sm"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        if (onLogout) onLogout();
                      }}
                      className="py-2 px-3 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-red-500/30"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-3 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#033022] to-emerald-950 hover:border-school-gold text-white text-xs font-bold flex items-center justify-between border border-school-gold/40 shadow-md transition-all group hover:scale-[1.01]"
                  title="Staff & Administrative Login (Principal & Bursar)"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-4 h-4 text-school-gold" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xs text-white group-hover:text-school-gold transition-colors">
                        Admin & Staff Login
                      </div>
                      <div className="text-[10px] text-emerald-300/80">
                        Principal & Bursar Portals
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-school-gold group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Main Navigation Sections */}
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 pb-1">
              Main Campus Navigation
            </p>
            {mainNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-school-gold text-school-dark font-extrabold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-school-dark' : 'text-school-gold'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-school-dark' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Academic Departments Quick Jump */}
          <div className="space-y-1 pt-2 border-t border-white/10">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 pb-1">
              Curriculum & Departments
            </p>
            {academicDepartments.map((dept, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick('academics', dept.href)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  {dept.icon}
                  <span className="truncate">{dept.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 opacity-30" />
              </button>
            ))}
          </div>

          {/* Lafia Campus Information Card */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-school-gold font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Campus in Lafia</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Plot 14-18, Education Layout, Off Shendam Road, Lafia, Nasarawa State.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
              <Clock className="w-3 h-3 text-school-gold" />
              <span>Mon – Fri: 7:30 AM – 4:00 PM</span>
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 text-center text-[10px] text-slate-400 flex-shrink-0">
          <p className="font-semibold text-slate-300">{SCHOOL_INFO.name}</p>
          <p className="italic text-school-goldLight mt-0.5">Motto: {SCHOOL_INFO.motto}</p>
        </div>

      </aside>
    </>
  );
};
