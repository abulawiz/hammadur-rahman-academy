import React, { useState } from 'react';
import { FACILITIES } from '../data/schoolData';
import { Facility } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  X,
  ShieldCheck
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFacilityModal, setActiveFacilityModal] = useState<Facility | null>(null);

  const categories = ['All', 'Technology', 'Academics', 'Student Life', 'Recreation', 'Health & Welfare'];

  const filteredFacilities = selectedCategory === 'All' 
    ? FACILITIES 
    : FACILITIES.filter(f => f.category === selectedCategory);

  return (
    <section id="facilities" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-navy/10 text-school-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4 text-school-gold" />
            <span>World-Class Infrastructure in Lafia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Designed for 21st-Century Learning & Student Welfare
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            From our solar-powered digital CBT lab to fully fitted science laboratories and serene boarding hostels, our Lafia campus offers everything students need to flourish.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-school-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-school-gold/40 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setActiveFacilityModal(facility)}
            >
              {/* Facility Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img 
                  src={facility.image} 
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-school-dark/90 text-school-goldLight backdrop-blur-sm border border-school-gold/30">
                    {facility.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-school-dark text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Facility Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-school-blue transition-colors">
                    {facility.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Highlights</p>
                  <div className="space-y-1.5">
                    {facility.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Facility View */}
        {activeFacilityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setActiveFacilityModal(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-video w-full relative">
                <img 
                  src={activeFacilityModal.image} 
                  alt={activeFacilityModal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-dark text-school-gold">
                    {activeFacilityModal.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                  {activeFacilityModal.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeFacilityModal.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Facility Specifications & Equipment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFacilityModal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Lafia Campus, Nasarawa State</span>
                  </div>
                  <button
                    onClick={() => setActiveFacilityModal(null)}
                    className="px-5 py-2 rounded-xl bg-school-dark hover:bg-school-navy text-white text-xs font-bold transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
