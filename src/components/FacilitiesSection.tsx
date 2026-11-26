import React, { useState } from 'react';
import { FACILITIES } from '../data/schoolData';
import type { Facility } from '../types';
import { SchoolImageSlot } from './SchoolImageSlot';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  X
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFacilityModal, setActiveFacilityModal] = useState<Facility | null>(null);

  const categories = ['All', 'Technology', 'Academics', 'Student Life', 'Recreation', 'Health & Welfare'];

  const filteredFacilities = selectedCategory === 'All' 
    ? FACILITIES 
    : FACILITIES.filter(f => f.category === selectedCategory);

  return (
    <section id="facilities" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white transition-colors duration-300 relative border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <Building2 className="w-4 h-4 text-school-gold" />
            <span>World-Class Infrastructure in Lafia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Designed for 21st-Century Learning & Student Welfare
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            From our solar-powered digital CBT lab to fully fitted science laboratories and serene boarding hostels, our Lafia campus offers everything students need to flourish.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-extrabold'
                  : 'bg-[#034d28] hover:bg-[#023a1e] text-emerald-100 border-emerald-600/40'
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
              className="bg-[#034d28] dark:bg-[#023a1e] rounded-2xl border border-emerald-500/30 shadow-md hover:shadow-xl hover:border-school-gold/60 transition-all duration-300 overflow-hidden flex flex-col group text-white"
            >
              {/* Facility Image Slot */}
              <div className="relative">
                <SchoolImageSlot
                  id={`facility_${facility.id}`}
                  title={facility.name}
                  category={facility.category}
                  aspectRatio="aspect-[16/10]"
                  recommendedDimensions="1200 × 750 px"
                  altText={facility.name}
                  overlayBadge={facility.category}
                  overlayCaption={facility.name}
                />
              </div>

              {/* Facility Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-school-gold transition-colors">
                    {facility.name}
                  </h3>
                  <p className="mt-2 text-xs text-emerald-100/90 line-clamp-2 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Key Highlights</p>
                    <button
                      onClick={() => setActiveFacilityModal(facility)}
                      className="text-[11px] font-bold text-school-gold hover:underline flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {facility.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-emerald-100">
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
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setActiveFacilityModal(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full relative">
                <SchoolImageSlot
                  id={`facility_${activeFacilityModal.id}`}
                  title={activeFacilityModal.name}
                  category={activeFacilityModal.category}
                  aspectRatio="aspect-video"
                  recommendedDimensions="1200 × 750 px"
                  altText={activeFacilityModal.name}
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                  {activeFacilityModal.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeFacilityModal.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Facility Specifications & Equipment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFacilityModal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Category: <strong className="text-slate-800 dark:text-slate-200">{activeFacilityModal.category}</strong>
                  </span>
                  <button
                    onClick={() => setActiveFacilityModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    Close
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
