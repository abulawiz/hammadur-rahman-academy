import React from 'react';
import { SCHOOL_INFO, ADMISSION_STEPS } from '../data/schoolData';
import { 
  FileCheck, 
  Sparkles, 
  Calendar, 
  Download, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  Clock,
  BadgeAlert
} from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenApply: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="admissions" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white relative border-t border-emerald-700/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <FileCheck className="w-4 h-4 text-school-gold" />
            <span>Admissions Portal 2026/2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Begin Your Child's Journey to Excellence
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Admissions are ongoing for Junior Secondary (JSS 1, JSS 2) and Senior Secondary (SSS 1, SSS 2 transfers). Day and Boarding slots are available on merit.
          </p>
        </div>

        {/* 4-Step Admission Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ADMISSION_STEPS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 hover:border-school-gold/60 shadow-md transition-all duration-300 relative group"
            >
              <div className="text-4xl font-black font-heading text-school-gold/40 group-hover:text-school-gold transition-colors mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-school-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements & Key Dates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Requirements Checklist (7 cols) */}
          <div className="lg:col-span-7 bg-emerald-950/70 border border-emerald-800/70 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-school-gold">
                <FileCheck className="w-5 h-5 text-school-gold" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
                  Admission Requirements Checklist
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 mb-6">
                Please prepare the following credentials before sitting for the screening exercise at our Lafia campus:
              </p>

              <div className="space-y-3">
                {[
                  "Completed Online Application Form or Physical Application Dossier",
                  "Photocopy of Candidate's National Birth Certificate or Statutory Age Declaration",
                  "Primary Six (6) School Testimonial / Continuous Assessment Record (for JSS1)",
                  "Official Transcript & Last Promotion Report Card (for SSS1 / JSS2 transfers)",
                  "Four (4) recent passport-sized photographs (red/white background)",
                  "Certificate of Medical Fitness from a recognized Government/General Hospital",
                  "Letter of Identification from Parent's/Guardian's Employer or Traditional Ruler"
                ].map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-emerald-100">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/80">
              <span>Age Requirement: Minimum of 10 years for JSS1 entry.</span>
              <span className="text-school-gold font-bold">Strict Merit Policy</span>
            </div>
          </div>

          {/* Right: Key Dates & Quick Register (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#033527] to-emerald-950 border border-school-gold/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-white">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-school-gold uppercase tracking-wider">
                  2026/2027 Screening Schedule
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Batch 1 Open
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">First Entrance Examination</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">Saturday, 8th August 2026 • 8:30 AM</p>
                    <p className="text-[11px] text-emerald-200/80 mt-1">Main Hall, HRA Campus, Lafia, Nasarawa State</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Second (Supplementary) Examination</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">Saturday, 29th August 2026 • 8:30 AM</p>
                    <p className="text-[11px] text-emerald-200/80 mt-1">For candidates unable to attend Batch 1</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Resumption for 2026/2027 Session</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">Monday, 14th September 2026</p>
                    <p className="text-[11px] text-emerald-200/80 mt-1">Boarders check-in on Sunday, 13th September</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6 space-y-3">
              <button
                onClick={onOpenApply}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              >
                <FileCheck className="w-5 h-5 text-emerald-950" />
                <span>Fill Online Application Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-emerald-200/80">
                Application takes only 3 minutes. Instant confirmation and reference ID.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
