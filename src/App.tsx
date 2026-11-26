import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
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

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { user: supabaseUser, signOut: supabaseSignOut } = useAuth();

  // Authenticated Administrator Session with Supabase & localStorage synchronization
  const [adminUser, setAdminUser] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hra_admin_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Sync Supabase Auth state with adminUser
  useEffect(() => {
    if (supabaseUser) {
      const role = (supabaseUser.app_metadata?.role as string) || (supabaseUser.user_metadata?.role as string) || 'Administrator';
      const userObj = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        username: supabaseUser.email?.split('@')[0] || 'admin',
        fullName: (supabaseUser.user_metadata?.full_name as string) || supabaseUser.email?.split('@')[0] || 'Administrator',
        role: role,
        source: 'supabase'
      };
      setAdminUser(userObj);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hra_admin_user', JSON.stringify(userObj));
      }
    }
  }, [supabaseUser]);

  const handleAdminLogin = (user: any) => {
    setAdminUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hra_admin_user', JSON.stringify(user));
    }
  };

  const handleAdminLogout = async () => {
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hra_admin_user');
    }
    await supabaseSignOut();
  };

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
    <div className="min-h-screen bg-[#046a38] dark:bg-[#03542c] text-slate-100 font-sans selection:bg-school-gold selection:text-emerald-950 relative transition-colors duration-300">
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
        adminUser={adminUser}
        onLogout={handleAdminLogout}
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
        adminUser={adminUser}
        onLogout={handleAdminLogout}
      />

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
        currentUser={adminUser}
        onLogoutUser={handleAdminLogout}
        onLoginUser={handleAdminLogin}
      />

    </div>
  );
}


export default App;
