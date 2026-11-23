import React from 'react';
import { TESTIMONIALS } from '../data/schoolData';
import { Quote, Star, Award, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .replace(/Dr\.|Mrs\.|Alhaji|\(|\)/gi, '')
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getGradientForIdx = (idx: number) => {
    const gradients = [
      'from-emerald-700 to-green-900',
      'from-amber-600 to-yellow-800',
      'from-teal-700 to-cyan-900',
      'from-blue-700 to-indigo-900'
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#021d15] text-slate-800 dark:text-white transition-colors duration-300 relative overflow-hidden border-t border-slate-200 dark:border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-white/10 text-emerald-800 dark:text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-school-gold/30">
            <Award className="w-4 h-4 text-emerald-700 dark:text-school-gold" />
            <span>Voices of Trust & Pride</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            What Parents, Alumni & Scholars Say
          </h2>
          <p className="mt-4 text-slate-600 dark:text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Discover why families across Lafia, Nasarawa State, and the Federal Capital Territory entrust their children's secondary education to Hammadur Rahman Academy.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-emerald-950/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-emerald-800/60 shadow-sm hover:shadow-xl hover:border-school-gold/50 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-school-gold/10 text-school-gold flex items-center justify-center">
                    <Quote className="w-5 h-5 text-amber-600 dark:text-school-gold" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 dark:text-emerald-100/90 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info with Authentic Monogram Badge */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-emerald-800/60 flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${getGradientForIdx(idx)} text-white font-extrabold text-sm flex items-center justify-center shadow-md border-2 border-school-gold/40 flex-shrink-0 relative`}>
                  <span>{getInitials(item.author)}</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[9px] border border-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{item.author}</span>
                  </h4>
                  <p className="text-[11px] font-medium text-emerald-700 dark:text-school-gold">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-emerald-300/70">
                    {item.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Seal Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#033527] to-emerald-950 text-white border border-school-gold/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-school-gold text-emerald-950 flex items-center justify-center font-black text-lg shadow">
              <CheckCircle2 className="w-7 h-7 text-emerald-950" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Over 15 Years of Academic Distinction in Nasarawa State
              </h3>
              <p className="text-xs text-emerald-200">
                Consistently ranked among the top secondary schools for WAEC & NECO examination results.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-school-gold font-bold px-3 py-1.5 rounded-lg bg-emerald-900/80 border border-school-gold/30">
              Lafia Campus Center
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
