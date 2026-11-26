import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENTS, UPCOMING_EVENTS } from '../data/schoolData';
import { api } from '../services/api';
import { 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText,
  AlertCircle,
  Database
} from 'lucide-react';

export const NewsEventsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [liveAnnouncements, setLiveAnnouncements] = useState<any[]>(ANNOUNCEMENTS);

  const categories = ['All', 'Admissions', 'Academic', 'Events'];

  useEffect(() => {
    loadAnnouncements();
  }, [selectedFilter]);

  const loadAnnouncements = async () => {
    try {
      const data = await api.getAnnouncements(selectedFilter);
      if (data && data.length > 0) {
        setLiveAnnouncements(data);
      }
    } catch {
      // Keep static defaults on error
    }
  };

  const filteredAnnouncements = selectedFilter === 'All'
    ? liveAnnouncements
    : liveAnnouncements.filter(a => a.category === selectedFilter);

  return (
    <section id="news" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white transition-colors duration-300 relative border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <Bell className="w-4 h-4 text-school-gold" />
            <span>School Bulletin & Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Latest News & Upcoming Events
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Stay informed on academic milestones, term calendar highlights, examination dates, and official announcements from our Lafia campus.
          </p>
        </div>

        {/* 2-Column Layout: Left Announcements, Right Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Announcements (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-700/50 pb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
                  <FileText className="w-5 h-5 text-school-gold" />
                  <span>Notice Board & Bulletins</span>
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline-flex items-center gap-1">
                  <Database className="w-2.5 h-2.5" />
                  <span>Live DB</span>
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                      selectedFilter === cat
                        ? 'bg-amber-400 text-emerald-950 font-extrabold border-amber-300'
                        : 'bg-[#034d28] text-emerald-100 hover:text-white border-emerald-600/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Announcement Items */}
            <div className="space-y-4">
              {filteredAnnouncements.map((item) => (
                <div 
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#034d28] dark:bg-[#023a1e] border border-emerald-500/30 hover:border-school-gold/60 shadow-md transition-all duration-200 space-y-2.5 text-white"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-900/90 text-school-gold border border-emerald-700/50">
                        {item.category}
                      </span>
                      {(item.urgent === true || item.urgent === 1) && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-950/80 text-red-300 border border-red-500/40 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Urgent</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-emerald-300 font-medium">
                      {item.date_text || item.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white hover:text-school-gold transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-emerald-700/50 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
                <Calendar className="w-5 h-5 text-school-gold" />
                <span>Upcoming Calendar Events</span>
              </h3>
            </div>

            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div 
                  key={event.id}
                  className="p-5 rounded-2xl bg-[#034d28] dark:bg-[#023a1e] border border-emerald-500/30 shadow-md hover:border-school-gold/60 transition-all duration-200 flex gap-4 text-white"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-emerald-950 text-white flex flex-col items-center justify-center border border-school-gold/40">
                    <span className="text-[10px] font-bold uppercase text-school-goldLight">DATE</span>
                    <span className="text-sm font-extrabold text-white text-center leading-tight">
                      {event.date.split(',')[0].slice(0, 3)}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                      {event.category}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {event.title}
                    </h4>
                    <div className="flex flex-col gap-1 text-[11px] text-emerald-200/90 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-school-gold" />
                        <span>{event.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-school-gold" />
                        <span>{event.venue}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Term Calendar Box */}
            <div className="p-5 rounded-2xl bg-[#022c1f] text-white border border-school-gold/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-school-gold">2026/2027 Academic Calendar</h4>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700/50">Official</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Download the complete three-term academic schedule covering examinations, visiting days, mid-term breaks, and graduation festivities.
              </p>
              <button 
                onClick={() => alert("Hammadur Rahman Academy 2026/2027 Academic Calendar PDF will download shortly.")}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>Download Term Calendar (PDF)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
