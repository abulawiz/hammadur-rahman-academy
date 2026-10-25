import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Menu, 
  X, 
  UserCheck, 
  FileText, 
  ChevronRight,
  Sparkles,
  BookOpen,
  PanelLeft,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenApply: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenPortal, 
  onOpenApply, 
  onOpenAdmin,
  activeSection,
  setActiveSection,
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Academics', href: '#academics', id: 'academics' },
    { label: 'Admissions', href: '#admissions', id: 'admissions' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    { label: 'Student Life', href: '#student-life', id: 'student-life' },
    { label: 'News & Events', href: '#news', id: 'news' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Notification Bar */}
      <div className="bg-school-dark dark:bg-black text-slate-200 text-xs py-2 px-4 border-b border-school-navy/40 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left contact items */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5 text-school-goldLight font-medium">
              <MapPin className="w-3.5 h-3.5 text-school-gold" />
              <span>Lafia, Nasarawa State, Nigeria</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-school-gold" />
              <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-school-gold transition-colors">
                {SCHOOL_INFO.phone}
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-school-gold" />
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-school-gold transition-colors">
                {SCHOOL_INFO.email}
              </a>
            </div>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden xl:inline text-slate-400 border-r border-slate-700 pr-3">
              WAEC & NECO Center: <strong className="text-white">4260189</strong>
            </span>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-1 sm:px-2 sm:py-1 rounded-lg bg-white/10 hover:bg-white/20 text-school-gold flex items-center gap-1.5 transition-colors border border-white/10"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Black / Dark Mode"}
              aria-label="Toggle Light and Dark Mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-bold text-white hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-school-goldLight" />
                  <span className="text-[11px] font-bold text-white hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Admin Portal Trigger */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded text-xs font-semibold tracking-wide border border-white/10 transition-all duration-200 shadow-sm"
              title="Staff & Administrator Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-school-gold" />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 bg-school-navy/80 hover:bg-school-blue text-white px-2.5 py-1 rounded text-xs font-semibold tracking-wide border border-school-blue/40 transition-all duration-200 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-school-gold" />
              <span className="hidden sm:inline">Student Result Portal</span>
              <span className="sm:hidden">Portal</span>
            </button>
            <button
              onClick={onOpenApply}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-school-gold hover:from-amber-600 hover:to-school-goldHover text-school-dark font-bold px-3 py-1 rounded text-xs shadow-sm transition-all duration-200 transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-school-dark" />
              <span>Apply Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-100 dark:border-slate-800 py-2.5' 
            : 'bg-white dark:bg-slate-900 shadow-md py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & School Branding */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-school-dark dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm group"
              title="Open Navigation Sidebar"
              aria-label="Open Navigation Sidebar"
            >
              <PanelLeft className="w-5 h-5 text-school-navy dark:text-school-gold group-hover:text-school-blue transition-colors" />
              <span className="hidden xl:inline text-xs font-bold text-slate-700 dark:text-slate-200">Sidebar</span>
            </button>

            <a 
              href="#home" 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home', '#home');
              }}
            >
              {/* School Crest / Monogram Badge */}
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-school-dark via-school-navy to-school-blue p-0.5 shadow-md flex items-center justify-center group-hover:shadow-royal transition-all duration-300">
                <div className="w-full h-full bg-school-dark rounded-[10px] flex flex-col items-center justify-center p-1 border border-school-gold/40">
                  <GraduationCap className="w-6 h-6 text-school-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[8px] font-black tracking-widest text-school-goldLight uppercase">HRA</span>
                </div>
              </div>

              {/* School Text */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg md:text-xl font-extrabold text-school-dark dark:text-white tracking-tight font-heading leading-tight group-hover:text-school-blue transition-colors">
                    Hammadur Rahman
                  </span>
                  <span className="text-xs md:text-sm font-bold text-amber-600 dark:text-school-gold uppercase tracking-wider">
                    Academy
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-school-navy dark:text-school-goldLight font-semibold">Secondary School</span>
                  <span>•</span>
                  <span>Lafia, Nasarawa</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.href)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'text-school-navy dark:text-school-gold bg-school-blue/10 dark:bg-white/10 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-school-dark dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-school-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenApply}
              className="bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:hover:bg-amber-400 text-white dark:text-school-dark text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-md hover:shadow-royal transition-all duration-300 flex items-center gap-1.5 border border-school-gold/30"
            >
              <FileText className="w-3.5 h-3.5 text-school-gold dark:text-school-dark" />
              <span>Enroll Now</span>
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-school-dark hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-300 max-h-[80vh] overflow-y-auto">
          <div className="p-3 mb-2 rounded-lg bg-school-dark dark:bg-black text-white flex items-center justify-between border border-school-gold/30">
            <div>
              <p className="text-xs font-semibold text-school-gold">Hammadur Rahman Academy</p>
              <p className="text-[11px] text-slate-300">Lafia, Nasarawa State</p>
            </div>
            <span className="text-[10px] bg-school-gold text-school-dark font-extrabold px-2 py-0.5 rounded">
              Govt. Approved
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.href)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-school-navy text-white font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-school-dark/90 text-school-gold text-xs font-bold flex items-center justify-center gap-2 border border-school-gold/30"
            >
              <ShieldCheck className="w-4 h-4 text-school-gold" />
              <span>Admin & Staff Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-school-dark dark:text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-school-blue" />
              <span>Access Student / Parent Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-school-gold to-amber-600 text-school-dark text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Apply for Admission (2026/2027)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
