import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { 
  Mail, 
  Phone,
  GraduationCap, 
  Menu, 
  X, 
  UserCheck, 
  FileText, 
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  ShieldCheck,
  LogOut,
  Lock,
  ArrowRight
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
  adminUser?: any;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenPortal, 
  onOpenApply, 
  onOpenAdmin,
  activeSection,
  setActiveSection,
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
  adminUser,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ordered navigation links matching user specification
  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Academics', href: '#academics', id: 'academics' },
    { label: 'Admissions', href: '#admissions', id: 'admissions' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    { label: 'Student Life', href: '#student-life', id: 'student-life' },
    { label: 'News & Events', href: '#news', id: 'news' },
    { label: 'Contact', href: '#contact', id: 'contact' },
    { label: 'Admin Portal', href: '#admin', id: 'admin' },
  ];

  const handleLinkClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminAction = () => {
    if (adminUser) {
      onOpenAdmin();
    } else {
      handleLinkClick('admin', '#admin');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans">
      
      {/* ======================================================== */}
      {/* 1. TOP BAR                                               */}
      {/* Clean Header: Email | Helpline Phone | Light/Dark Mode   */}
      {/* (WAEC/NECO, Admin Login & Portals moved to Sidebar)      */}
      {/* ======================================================== */}
      <div className="bg-[#022419] dark:bg-[#01140e] text-emerald-100 text-xs py-2 px-3 sm:px-6 border-b border-emerald-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Top Bar Left: Email & Phone */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs">
            {/* Email link */}
            <a 
              href={`mailto:${SCHOOL_INFO.email}`} 
              className="flex items-center gap-1.5 text-emerald-200 hover:text-school-gold transition-colors font-medium group"
              title="Official School Inquiries Email"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-900/80 border border-school-gold/40 flex items-center justify-center group-hover:border-school-gold transition-colors">
                <Mail className="w-3 h-3 text-school-gold" />
              </div>
              <span className="tracking-tight">{SCHOOL_INFO.email}</span>
            </a>

            <span className="hidden sm:inline text-emerald-700/80">•</span>

            {/* Helpline Phone */}
            <a 
              href={`tel:${SCHOOL_INFO.phone}`} 
              className="hidden sm:flex items-center gap-1.5 text-emerald-200/90 hover:text-school-gold transition-colors font-medium"
              title="Campus Helpline & Inquiries"
            >
              <Phone className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
          </div>

          {/* Top Bar Right: Theme Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 hover:bg-emerald-900 text-school-gold border border-emerald-700/60 hover:border-school-gold/60 transition-all text-[11px] font-semibold shadow-sm"
              title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
              aria-label="Toggle Light and Dark Mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-white hidden xs:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-school-gold" />
                  <span className="text-emerald-100 hidden xs:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN NAVBAR                                           */}
      {/* 3-Line Sidebar Toggle | Logo/Name | Navigation Links     */}
      {/* ======================================================== */}
      <nav 
        className={`w-full transition-all duration-300 border-b border-emerald-800/50 shadow-xl ${
          isScrolled 
            ? 'bg-[#022419]/98 dark:bg-[#01140e]/98 backdrop-blur-md py-2.5' 
            : 'bg-[#033527] dark:bg-[#021d15] py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Left Group: 3-Line Sidebar Toggle + School Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Sidebar Toggle Button - Prominent 3 Horizontal Lines */}
            <button
              onClick={onToggleSidebar}
              className="p-2 sm:px-3 sm:py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-school-gold hover:text-white border border-emerald-700/60 hover:border-school-gold transition-all flex items-center gap-2 shadow-sm group"
              title="Open Navigation Menu & Portals"
              aria-label="Open Sidebar Menu"
            >
              {/* Three horizontal lines (hamburger icon) */}
              <div className="flex flex-col justify-between w-5 h-3.5 space-y-1">
                <span className="w-5 h-0.5 bg-school-gold group-hover:bg-amber-300 rounded-full transition-colors block"></span>
                <span className="w-5 h-0.5 bg-school-gold group-hover:bg-amber-300 rounded-full transition-colors block"></span>
                <span className="w-5 h-0.5 bg-school-gold group-hover:bg-amber-300 rounded-full transition-colors block"></span>
              </div>
              <span className="hidden sm:inline text-xs font-bold text-emerald-100 group-hover:text-school-gold transition-colors tracking-wide">
                Menu
              </span>
            </button>

            {/* School Logo & Branding (Clickable Home Link) */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home', '#home');
              }}
              className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
              title="Hammadur Rahman Academy Homepage"
            >
              {/* Crest Monogram Badge */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-school-gold via-amber-500 to-emerald-700 p-0.5 shadow-md flex items-center justify-center group-hover:shadow-royal transition-all duration-300">
                <div className="w-full h-full bg-[#022419] rounded-[10px] flex flex-col items-center justify-center p-1 border border-school-gold/50">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-school-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[7px] sm:text-[8px] font-black tracking-widest text-school-goldLight uppercase">HRA</span>
                </div>
              </div>

              {/* School Name & Campus Subtitle */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1 sm:gap-1.5">
                  <span className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight font-heading leading-tight group-hover:text-school-gold transition-colors whitespace-nowrap">
                    Hammadur Rahman
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-school-gold uppercase tracking-wider">
                    Academy
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-emerald-200/90 font-medium whitespace-nowrap">
                  <span className="text-school-goldLight font-semibold">Secondary School</span>
                  <span>•</span>
                  <span>Lafia, Nasarawa State</span>
                </div>
              </div>
            </a>

          </div>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'admin') {
                      onOpenAdmin();
                    } else {
                      handleLinkClick(link.id, link.href);
                    }
                  }}
                  className={`px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-school-gold bg-emerald-950/80 font-bold border border-school-gold/40 shadow-sm'
                      : 'text-emerald-100/90 hover:text-white hover:bg-emerald-800/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-school-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Enroll Now CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Enroll Now Button */}
            <button
              onClick={onOpenApply}
              className="bg-gradient-to-r from-school-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-school-goldHover text-[#022419] text-xs font-black uppercase tracking-wider px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-md hover:shadow-gold-glow transition-all duration-300 flex items-center gap-1.5 border border-school-gold/60 transform hover:scale-105 whitespace-nowrap"
              title="Enroll into Hammadur Rahman Academy"
            >
              <FileText className="w-3.5 h-3.5 text-[#022419]" />
              <span>Enroll Now</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-emerald-100 hover:text-white bg-emerald-950/70 hover:bg-emerald-800/80 border border-emerald-700/60 lg:hidden transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-school-gold" /> : <Menu className="w-5 h-5 text-emerald-100" />}
            </button>

          </div>

        </div>
      </nav>

      {/* ======================================================== */}
      {/* 3. MOBILE MENU DRAWER                                    */}
      {/* Comprehensive responsive menu with all links & actions   */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#022419]/98 dark:bg-[#01140e]/98 backdrop-blur-xl border-b border-emerald-800/60 shadow-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-300 max-h-[85vh] overflow-y-auto">
          
          {/* Header Card inside Mobile Menu */}
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-school-gold/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-school-gold/20 border border-school-gold/40 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-school-gold" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Hammadur Rahman Academy</p>
                <p className="text-[10px] text-emerald-200">Secondary School • Lafia, Nasarawa</p>
              </div>
            </div>
            <span className="text-[9px] bg-school-gold text-[#022419] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              Govt. Approved
            </span>
          </div>

          {/* Quick Action Pills in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="p-2.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-700/60 flex items-center justify-center gap-1.5 font-bold text-center"
            >
              <UserCheck className="w-3.5 h-3.5 text-school-gold" />
              <span>Result Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="p-2.5 rounded-lg bg-school-gold hover:bg-amber-400 text-[#022419] flex items-center justify-center gap-1.5 font-extrabold text-center shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#022419]" />
              <span>Apply Online</span>
            </button>
          </div>

          {/* All 9 Main Navigation Links */}
          <div className="space-y-1 pt-1 border-t border-emerald-800/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.id === 'admin') {
                      onOpenAdmin();
                    } else {
                      handleLinkClick(link.id, link.href);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-950 text-school-gold font-bold border border-school-gold/40'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60 text-school-gold" />
                </button>
              );
            })}
          </div>

          {/* Mobile Admin Status & Login Footer */}
          <div className="pt-3 border-t border-emerald-800/50 space-y-2">
            {adminUser ? (
              <div className="p-3 rounded-xl bg-emerald-950 border border-school-gold/40 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-school-gold">{adminUser.fullName || adminUser.username}</p>
                  <p className="text-[10px] text-emerald-200">{adminUser.role || 'Administrator'}</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="px-2.5 py-1 bg-school-gold text-[#022419] rounded text-xs font-bold"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="px-2 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded text-xs font-bold flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('admin', '#admin');
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-100 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-emerald-700/60 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-school-gold" />
                <span>Admin Login & Staff Access</span>
              </button>
            )}

            {/* Sidebar Opener from inside Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleSidebar();
              }}
              className="w-full py-2 px-4 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-800/60"
            >
              <Menu className="w-3.5 h-3.5 text-school-gold" />
              <span>Open Campus Navigation Sidebar</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
