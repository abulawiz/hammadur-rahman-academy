import React, { useState } from 'react';
import { ANNOUNCEMENTS, UPCOMING_EVENTS } from '../data/schoolData';
import { 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const NewsEventsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Admissions', 'Academic', 'Events'];

  const filteredAnnouncements = selectedFilter === 'All'
    ? ANNOUNCEMENTS
    : ANNOUNCEMENTS.filter(a => a.category === selectedFilter);

  return (
    <section id="news" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-navy/10 dark:bg-white/10 text-school-navy dark:text-school-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Bell className="w-4 h-4 text-school-gold" />
            <span>School Bulletin & Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Latest News & Upcoming Events
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Stay informed on academic milestones, term calendar highlights, examination dates, and official announcements from our Lafia campus.
          </p>
        </div>

        {/* 2-Column Layout: Left Announcements, Right Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Announcements (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-school-blue dark:text-school-gold" />
                <span>Notice Board & Bulletins</span>
              </h3>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedFilter === cat
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-school-navy/30 dark:hover:border-school-gold/40 hover:shadow-md transition-all duration-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-school-navy text-white">
                        {item.category}
                      </span>
                      {item.urgent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Urgent</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white hover:text-school-blue dark:hover:text-school-gold transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>Upcoming Calendar Events</span>
              </h3>
            </div>

            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div 
                  key={event.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-school-gold/50 transition-all duration-200 flex gap-4"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-b from-school-dark to-school-navy text-white flex flex-col items-center justify-center border border-school-gold/30">
                    <span className="text-[10px] font-bold uppercase text-school-goldLight">DATE</span>
                    <span className="text-sm font-extrabold text-white text-center leading-tight">
                      {event.date.split(',')[0].slice(0, 3)}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                      {event.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {event.title}
                    </h4>
                    <div className="flex flex-col gap-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-school-navy dark:text-school-gold" />
                        <span>{event.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-school-navy dark:text-school-gold" />
                        <span>{event.venue}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Term Calendar Box */}
            <div className="p-5 rounded-2xl bg-school-dark dark:bg-black text-white border border-school-gold/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-school-gold">2026/2027 Academic Calendar</h4>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">Official</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the complete three-term academic schedule covering examinations, visiting days, mid-term breaks, and graduation festivities.
              </p>
              <button 
                onClick={() => alert("Hammadur Rahman Academy 2026/2027 Academic Calendar PDF will download shortly.")}
                className="w-full py-2.5 px-3 rounded-xl bg-school-navy hover:bg-school-blue text-xs font-bold text-white flex items-center justify-center gap-2 border border-school-gold/20 transition-colors"
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
