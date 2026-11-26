import React from 'react';
import { SCHOOL_INFO, LEADERSHIP } from '../data/schoolData';
import { SchoolImageSlot } from './SchoolImageSlot';
import { Quote, Award, CheckCircle2, BookMarked, Compass, Shield } from 'lucide-react';

export const PrincipalWelcome: React.FC = () => {
  const principal = LEADERSHIP[0];

  return (
    <section id="about" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white relative transition-colors duration-300 border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <Compass className="w-4 h-4 text-school-gold" />
            <span>Welcome to Hammadur Rahman Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Cultivating Leaders of <span className="text-school-gold">Intellect</span>, <span className="text-amber-400">Integrity</span> & <span className="text-emerald-400">Faith</span>
          </h2>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-lg leading-relaxed">
            Established in the heart of Lafia, Nasarawa State, Hammadur Rahman Academy Secondary School is committed to holistic, 21st-century secondary school education that nurtures the mind, body, and soul.
          </p>
        </div>

        {/* Principal's Address Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Principal Image & Credentials */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative bg-[#034d28] dark:bg-[#023a1e] rounded-2xl overflow-hidden shadow-xl border border-emerald-500/30">
                <SchoolImageSlot
                  id="principal_portrait"
                  title="Principal's Official Portrait"
                  category="Leadership Portrait"
                  aspectRatio="aspect-[4/5]"
                  recommendedDimensions="800 × 1000 px"
                  altText="Dr. Abdur-Rahman A. Al-Hassan - Principal Hammadur Rahman Academy Lafia"
                  showOverlayOnImage={false}
                />
                
                {/* Overlay card */}
                <div className="p-5 bg-gradient-to-t from-school-dark via-school-dark/95 to-school-dark/80 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white font-heading">{principal.name}</h3>
                      <p className="text-xs font-semibold text-school-gold">{principal.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center">
                      <Award className="w-5 h-5 text-school-gold" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2 font-mono border-t border-white/10 pt-2">
                    {principal.qualification}
                  </p>
                </div>
              </div>

              {/* State Accreditation Seal Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-black text-xs">
                  WAEC
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Center Accreditation</p>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-white">Lafia, Nasarawa State</p>
                </div>
              </div>

            </div>
          </div>

          {/* Principal Address Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-school-gold font-bold text-sm tracking-wide">
              <Quote className="w-5 h-5 text-school-gold" />
              <span>Message from the Principal / Director of Studies</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug font-heading">
              "We provide an inspiring environment where every young scholar discovers their purpose and achieves academic brilliance."
            </h3>

            <div className="space-y-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              <p>
                Dear Parents, Prospective Students, and Valued Visitors,
              </p>
              <p>
                It gives me immense pleasure to welcome you to <strong>{SCHOOL_INFO.name}</strong>, strategically positioned in Lafia, the capital of Nasarawa State. Since our foundation, our overarching mission has been to provide a disciplined haven of learning where young boys and girls can acquire first-rate intellectual training while staying firmly anchored in exemplary moral integrity and religious consciousness.
              </p>
              <p>
                In today's fast-evolving global landscape, academic certificates without practical skills and upright character are insufficient. That is why our curriculum seamlessly combines the rigorous Nigerian National Curriculum (WAEC/NECO/BECE) with contemporary STEM, ICT coding, and the sacred values of honesty, industriousness, and empathy.
              </p>
              <p>
                Whether your child is enrolled as a day student or a resident in our modern, secure boarding facilities, they are surrounded by devoted educators who mentor them with love, firm guidance, and relentless encouragement.
              </p>
            </div>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60">
                <CheckCircle2 className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">100% University Transition Track</h4>
                  <p className="text-[11px] text-emerald-200/80">Dedicated JAMB CBT coaching & career counseling.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60">
                <CheckCircle2 className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Safe & Monitored Campus</h4>
                  <p className="text-[11px] text-emerald-200/80">Round-the-clock security and pastoral hostel care.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60">
                <CheckCircle2 className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Integrated Islamic Values</h4>
                  <p className="text-[11px] text-emerald-200/80">Tahfeez, Arabic, Hadith & character grooming.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60">
                <CheckCircle2 className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Continuous Assessment</h4>
                  <p className="text-[11px] text-emerald-200/80">Transparent online results portal for parents.</p>
                </div>
              </div>
            </div>

            {/* Principal Signature Signoff */}
            <div className="pt-4 border-t border-emerald-800/60 flex items-center justify-between">
              <div>
                <p className="font-serif italic text-base text-white font-bold">Dr. Abdur-Rahman A. Al-Hassan</p>
                <p className="text-xs text-school-gold">Principal, Hammadur Rahman Academy Lafia</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-school-gold bg-emerald-950/80 px-3 py-1 rounded-full font-semibold border border-school-gold/30">
                  Motto: Knowledge, Character, Excellence
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Vision, Mission & Core Values Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Mission */}
          <div className="p-7 rounded-2xl bg-emerald-950/70 border border-emerald-800/70 hover:border-school-gold/40 hover:shadow-lg transition-all duration-300 text-white">
            <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center mb-5 shadow-md border border-school-gold/30">
              <BookMarked className="w-6 h-6 text-school-gold" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Our Mission</h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              To provide qualitative, comprehensive, and morally uplifting secondary education using modern technological tools and dedicated educators to cultivate globally competitive, God-fearing leaders.
            </p>
          </div>

          {/* Vision */}
          <div className="p-7 rounded-2xl bg-emerald-950/90 text-white shadow-xl relative border border-school-gold/40">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5 border border-white/20 shadow-md">
              <Compass className="w-6 h-6 text-school-gold" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Our Vision</h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              To stand as the foremost citadel of secondary academic excellence in Nasarawa State and Northern Nigeria, renowned for unmatched WAEC/NECO results and virtuous character.
            </p>
          </div>

          {/* Core Values */}
          <div className="p-7 rounded-2xl bg-emerald-950/70 border border-emerald-800/70 hover:border-school-gold/40 hover:shadow-lg transition-all duration-300 text-white">
            <div className="w-12 h-12 rounded-xl bg-school-gold text-emerald-950 flex items-center justify-center mb-5 shadow-md">
              <Shield className="w-6 h-6 text-emerald-950" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Our Core Values</h3>
            <ul className="text-sm text-emerald-100/90 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                <strong>Taqwa & Integrity:</strong> Reverence of Allah in all endeavors.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                <strong>Academic Distinction:</strong> Pursuit of supreme knowledge.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                <strong>Discipline & Respect:</strong> Moral decorum and punctuality.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-school-gold" />
                <strong>Community Leadership:</strong> Service to Nasarawa and humanity.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
