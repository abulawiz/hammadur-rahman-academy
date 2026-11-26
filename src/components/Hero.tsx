import React, { useState } from 'react';
import { SCHOOL_INFO, ANNOUNCEMENTS } from '../data/schoolData';
import { SchoolImageSlot } from './SchoolImageSlot';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle, 
  Play, 
  Users, 
  Calendar,
  ChevronRight,
  Bell,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
  onOpenPortal: () => void;
  onExploreAcademics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenApply, 
  onOpenPortal,
  onExploreAcademics 
}) => {
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);

  const stats = [
    { label: "WAEC & NECO Success Rate", value: "98.4%", detail: "Distinction in English & Maths" },
    { label: "Graduated Scholars", value: "1,500+", detail: "Studying in top Universities" },
    { label: "Modern CBT Workstations", value: "120+", detail: "Fully Solar Powered & Air-conditioned" },
    { label: "Teacher-to-Student Ratio", value: "1 : 14", detail: "Personalized Academic Care" },
  ];

  return (
    <section id="home" className="relative pt-28 lg:pt-36 pb-16 md:pb-24 bg-[#046a38] dark:bg-[#03542c] text-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Notice Bulletin Ticker */}
        <div className="mb-8 p-1.5 bg-school-navy/60 backdrop-blur-md rounded-2xl border border-school-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5 px-3 py-1 bg-amber-500/20 text-school-goldLight rounded-xl text-xs font-semibold w-full sm:w-auto">
            <Bell className="w-3.5 h-3.5 text-school-gold" />
            <span className="uppercase tracking-wider font-extrabold text-[10px]">Official Notice:</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 flex-1 px-2 text-center sm:text-left truncate font-medium">
            <span className="text-school-gold font-bold mr-2">[{ANNOUNCEMENTS[activeNoticeIdx].category}]</span>
            {ANNOUNCEMENTS[activeNoticeIdx].title}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <button 
              onClick={() => setActiveNoticeIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
              className="text-[11px] text-school-goldLight hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <span>Next Announcement</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited Secondary School in Lafia, Nasarawa State</span>
              <span className="hidden sm:inline-block text-school-gold font-semibold">|</span>
              <span className="hidden sm:inline-block text-school-gold">Govt. Approved</span>
            </div>

            {/* School Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                Nurturing <span className="bg-gradient-to-r from-school-gold via-amber-300 to-yellow-500 bg-clip-text text-transparent">Academic Distinction</span> & Noble Character.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong>{SCHOOL_INFO.name}</strong>, Lafia. We deliver a premier secondary school education that synthesizes standard Nigerian & British curricula with advanced STEM, Islamic moral ethos, and leadership mastery.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-school-gold flex-shrink-0" />
                <span>WAEC, NECO & BECE Approved Center</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-school-gold flex-shrink-0" />
                <span>Integrated Quranic Tahfeez & Moral Studies</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-school-gold flex-shrink-0" />
                <span>Modern Solar-Powered Science & CBT Labs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-school-gold flex-shrink-0" />
                <span>Safe Day & Full Boarding Facilities in Lafia</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApply}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm sm:text-base shadow-md flex items-center gap-2.5 transition-all duration-200"
              >
                <GraduationCap className="w-5 h-5 text-emerald-950" />
                <span>Apply for 2026/2027 Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPortal}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all duration-200"
              >
                <span>Student Result Portal</span>
                <span className="text-[10px] bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded font-extrabold">Portal</span>
              </button>

              <button
                onClick={onExploreAcademics}
                className="px-4 py-3.5 text-xs sm:text-sm text-emerald-100 hover:text-white font-semibold underline underline-offset-4 decoration-school-gold/60 transition-colors"
              >
                View Academic Departments →
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Card & School Identity */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Container */}
              <div className="relative bg-[#034d28] dark:bg-[#023a1e] rounded-2xl border border-emerald-500/30 p-6 shadow-xl space-y-6">
                
                {/* School Header Badge Inside Card */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-school-dark border border-school-gold/50 flex items-center justify-center">
                      <Award className="w-6 h-6 text-school-gold" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">HRA Secondary</h2>
                      <p className="text-[11px] text-slate-400">Lafia, Nasarawa State</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    2026/27 ADMISSIONS OPEN
                  </span>
                </div>

                {/* Hero Showcase Image Slot */}
                <SchoolImageSlot
                  id="hero_campus_students"
                  title="Campus & Classroom Activity"
                  category="Campus Spotlight"
                  aspectRatio="aspect-video"
                  recommendedDimensions="1200 × 675 px (PNG / JPG)"
                  overlayBadge="Campus Spotlight"
                  overlayCaption="Active Secondary Classroom & Collaborative Learning"
                  altText="Hammadur Rahman Academy Lafia Campus Activity"
                  className="border border-white/10"
                />

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400 font-medium">Curriculum</p>
                    <p className="text-xs font-bold text-school-goldLight mt-0.5">Nigerian (NERDC) + Cambridge Science</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400 font-medium">Boarding Option</p>
                    <p className="text-xs font-bold text-school-goldLight mt-0.5">Full Boarding & Day Scholars</p>
                  </div>
                </div>

                {/* Quick Action */}
                <div className="bg-gradient-to-r from-school-dark to-school-navy p-3.5 rounded-xl border border-school-gold/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-school-gold" />
                    <div>
                      <p className="text-xs font-bold text-white">Next Entrance Exam</p>
                      <p className="text-[11px] text-slate-300">Saturday, 8th August 2026</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenApply}
                    className="text-xs font-bold bg-school-gold text-school-dark px-3 py-1.5 rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    Register
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Floating Quick Stats Bar */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-school-gold/40 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-school-gold group-hover:scale-105 transition-transform duration-200">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {item.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
