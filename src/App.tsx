import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { PrincipalWelcome } from './components/PrincipalWelcome';
import { AcademicsSection } from './components/AcademicsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { StudentLifeSection } from './components/StudentLifeSection';
import { NewsEventsSection } from './components/NewsEventsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentPortalModal } from './components/StudentPortalModal';
import { ApplicationModal } from './components/ApplicationModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PanelLeft, ShieldCheck } from 'lucide-react';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Dark / Black Light Mode State with Persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('hra_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hra_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hra_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'academics', 'admissions', 'facilities', 'student-life', 'news', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAcademics = () => {
    const el = document.getElementById('academics');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-school-gold selection:text-school-dark relative transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Slide-out Campus Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Floating Quick Sidebar Dock Trigger on Left Viewport Margin */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-school-dark/95 hover:bg-school-navy text-white hover:text-school-gold py-3 px-2 rounded-r-2xl shadow-royal border-y border-r border-school-gold/40 backdrop-blur-md flex flex-col items-center gap-2 group transition-all duration-300 transform hover:translate-x-1"
          title="Open Campus Navigation Sidebar"
          aria-label="Open Campus Navigation Sidebar"
        >
          <PanelLeft className="w-5 h-5 text-school-gold group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-extrabold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase text-slate-200 group-hover:text-school-gold">
            NAV SIDEBAR
          </span>
        </button>
      </div>

      <main>
        {/* Hero Section */}
        <Hero
          onOpenApply={() => setIsApplyOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
          onExploreAcademics={scrollToAcademics}
        />

        {/* Principal's Address, Mission, Vision */}
        <PrincipalWelcome />

        {/* Academic Programs & Curriculum */}
        <AcademicsSection onOpenApply={() => setIsApplyOpen(true)} />

        {/* Admissions & Requirements */}
        <AdmissionsSection onOpenApply={() => setIsApplyOpen(true)} />

        {/* Campus Facilities Showcase */}
        <FacilitiesSection />

        {/* Student Life & Boarding */}
        <StudentLifeSection />

        {/* News, Bulletins & Upcoming Events */}
        <NewsEventsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Campus Location & Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Interactive Student & Parent Result Portal Modal */}
      <StudentPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      {/* Online Admission Application Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;
