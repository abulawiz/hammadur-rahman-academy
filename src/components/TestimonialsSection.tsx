import React from 'react';
import { TESTIMONIALS } from '../data/schoolData';
import { Quote, Star, Award, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Voices of Trust & Pride</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            What Parents, Alumni & Scholars Say
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover why families across Lafia, Nasarawa State, and the Federal Capital Territory entrust their children's secondary education to Hammadur Rahman Academy.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-school-gold/40 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-school-gold/10 text-school-gold flex items-center justify-center">
                    <Quote className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <img 
                  src={item.avatar} 
                  alt={item.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-school-gold/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-medium text-school-blue">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {item.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Seal Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-school-dark via-school-navy to-school-dark text-white border border-school-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-school-gold text-school-dark flex items-center justify-center font-black text-lg">
              ✓
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Over 15 Years of Academic Distinction in Nasarawa State
              </h3>
              <p className="text-xs text-slate-300">
                Consistently ranked among the top secondary schools for WAEC & NECO examination results.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-school-goldLight font-bold">Lafia Campus</span>
          </div>
        </div>

      </div>
    </section>
  );
};
