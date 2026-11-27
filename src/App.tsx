import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { PrincipalWelcome } from './components/PrincipalWelcome';
import { AcademicsSection } from './components/AcademicsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { StudentLifeSection } from './components/StudentLifeSection';
import { NewsEventsSection } from './components/NewsEventsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentPortalModal } from './components/StudentPortalModal';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('hra_theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('hra_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const sections = ['home', 'about', 'academics', 'admissions', 'facilities', 'student-life', 'news', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const active = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        return element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight;
      });
      if (active) setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const openStudentPortal = () => setIsStudentPortalOpen(true);
  const scrollToAcademics = () => document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' });
  const toggleDarkMode = () => setIsDarkMode((previous) => !previous);

  return (
    <div className="min-h-screen bg-[#046a38] font-sans text-slate-100 selection:bg-school-gold selection:text-emerald-950 transition-colors duration-300 dark:bg-[#03542c]">
      <Navbar
        onOpenPortal={openStudentPortal}
        onOpenApply={scrollToContact}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onToggleSidebar={() => setIsSidebarOpen((previous) => !previous)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenPortal={openStudentPortal}
        onOpenApply={scrollToContact}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main>
        <Hero onOpenApply={scrollToContact} onOpenPortal={openStudentPortal} onExploreAcademics={scrollToAcademics} />
        <PrincipalWelcome />
        <AcademicsSection onOpenApply={scrollToContact} />
        <AdmissionsSection onOpenApply={scrollToContact} />
        <FacilitiesSection />
        <StudentLifeSection />
        <NewsEventsSection />
        <ContactSection />
      </main>

      <Footer onOpenPortal={openStudentPortal} onOpenApply={scrollToContact} />
      <StudentPortalModal isOpen={isStudentPortalOpen} onClose={() => setIsStudentPortalOpen(false)} />
    </div>
  );
}

export default App;
