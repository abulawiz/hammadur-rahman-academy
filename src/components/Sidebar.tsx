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
  ChevronRight, 
  BookOpen, 
  Atom, 
  Scroll, 
  TrendingUp, 
  HeartHandshake, 
  FileCheck,
  MapPin,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenPortal: () => void;
  onOpenApply: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
  onOpenPortal,
  onOpenApply,
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
    { id: 'admissions', label: 'Admissions', href: '#admissions', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'facilities', label: 'Campus Infrastructure', href: '#facilities', icon: <Building2 className="w-4 h-4" /> },
    { id: 'student-life', label: 'Student life & wellbeing', href: '#student-life', icon: <Users className="w-4 h-4" /> },
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
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-[#046a38] text-white z-50 shadow-2xl border-r border-school-gold/30 transform transition-transform duration-300 ease-in-out flex flex-col ${
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
          
          <div className="rounded-xl border border-school-gold/30 bg-[#03542c] p-3.5 text-xs shadow-md">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-school-gold" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Campus location</p>
                <p className="mt-1 text-xs font-semibold text-white">Lafia, Nasarawa State</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-school-gold px-1">Families & admissions</p>
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="w-full rounded-xl bg-amber-400 px-3.5 py-3 text-left text-xs font-bold text-emerald-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="block">Ask about admissions</span>
              <span className="mt-1 block text-[10px] font-medium text-emerald-900/80">Contact the school for current intake details</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenPortal();
              }}
              className="w-full rounded-xl border border-emerald-700 bg-[#034d28] px-3.5 py-3 text-left text-xs font-semibold text-white transition-colors hover:border-school-gold/60 hover:bg-[#023a1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold"
            >
              <span className="block">Student & parent support</span>
              <span className="mt-1 block text-[10px] font-medium text-emerald-200">Contact the school office directly</span>
            </button>
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
