import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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

export function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-school-gold selection:text-school-dark">
      {/* Navigation Bar */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
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
    </div>
  );
}

export default App;
