import React, { useState } from 'react';
import { ACADEMIC_PROGRAMS } from '../data/schoolData';
import { 
  BookOpen, 
  Atom, 
  Scroll, 
  TrendingUp, 
  HeartHandshake, 
  CheckCircle, 
  GraduationCap, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AcademicsSectionProps {
  onOpenApply: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenApply }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(ACADEMIC_PROGRAMS[0].id);

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Atom':
        return <Atom className="w-5 h-5" />;
      case 'Scroll':
        return <Scroll className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  const selectedProgram = ACADEMIC_PROGRAMS.find(p => p.id === selectedProgramId) || ACADEMIC_PROGRAMS[0];

  return (
    <section id="academics" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white transition-colors duration-300 relative border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <GraduationCap className="w-4 h-4 text-school-gold" />
            <span>Academic Excellence & Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Comprehensive Programs Designed for High Achievement
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Our curriculum integrates the Nigerian National Secondary Education Curriculum with international STEM standards, Islamic moral ethics, and practical vocational skills.
          </p>
        </div>

        {/* Program Tab Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {ACADEMIC_PROGRAMS.map((program) => {
            const isSelected = program.id === selectedProgramId;
            const tabLabel = 
              program.id === 'junior-sec' ? 'Junior Secondary' :
              program.id === 'senior-science' ? 'Pure & Applied Science' :
              program.id === 'senior-arts' ? 'Arts & Islamic Studies' :
              program.id === 'senior-commercial' ? 'Commercial & Business' :
              program.id === 'tahfeez-program' ? 'Tahfeez & Mentorship' :
              program.title.includes(':') ? program.title.split(':')[1].trim() : program.title;

            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgramId(program.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-extrabold'
                    : 'bg-[#034d28] hover:bg-[#023a1e] text-emerald-100 border-emerald-600/40'
                }`}
              >
                <span className={isSelected ? 'text-emerald-950' : 'text-school-gold'}>
                  {getProgramIcon(program.iconName)}
                </span>
                <span>{tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Program Showcase Card */}
        <div className="bg-[#034d28] dark:bg-[#023a1e] rounded-3xl border border-emerald-500/30 shadow-xl overflow-hidden transition-colors duration-300 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Main Overview (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-6">
              
              {/* Program Header */}
              <div className="border-b border-emerald-700/50 pb-5">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-900/80 text-emerald-200 border border-emerald-600/40">
                    {selectedProgram.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-200 bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 text-school-gold" />
                    <span>WAEC / NECO / BECE Approved</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {selectedProgram.title}
                </h3>
                <p className="mt-3 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              {/* Subject Offerings */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-school-goldLight mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-school-gold" />
                  <span>Key Subjects & Examination Courses</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.subjects.map((subj, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/50 text-xs font-semibold text-emerald-100 hover:border-school-gold/60 transition-colors"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Features & Teaching Pillars */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-school-goldLight mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-school-gold" />
                  <span>Distinguishing Academic Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProgram.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/40">
                      <CheckCircle className="w-4 h-4 text-school-gold flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-emerald-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary & CTA Panel (4 cols) */}
            <div className="lg:col-span-4 bg-[#023a1e] text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-700/50">
              <div className="space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center text-school-gold">
                    {getProgramIcon(selectedProgram.iconName)}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-school-goldLight uppercase tracking-wider">HRA Academic Track</p>
                    <p className="text-sm font-extrabold text-white">Lafia, Nasarawa State</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-700/50 space-y-3">
                  <p className="text-xs font-bold text-school-gold uppercase">Why this Track at HRA?</p>
                  <ul className="text-xs text-emerald-100 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                      <span>Dedicated, experienced specialist teachers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                      <span>Regular CBT mock drills & continuous tests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                      <span>Weekend tutorials & academic clinics</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <p className="text-xs font-semibold text-school-goldLight">
                    Admissions currently open for JSS1, JSS2, SSS1 & SSS2 transfers for the 2026/2027 academic session.
                  </p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={onOpenApply}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-950" />
                  <span>Enroll in this Department</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
