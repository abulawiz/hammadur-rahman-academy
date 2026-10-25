import React, { useState } from 'react';
import { 
  Users2, 
  Trophy, 
  Cpu, 
  Mic2, 
  Heart, 
  Sprout, 
  BookOpenCheck, 
  Activity, 
  Home, 
  Clock, 
  Utensils, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clubs' | 'boarding' | 'routine'>('clubs');

  const clubs = [
    {
      title: "JETS & STEM Club",
      category: "Science & Innovation",
      icon: <Cpu className="w-5 h-5 text-amber-500" />,
      description: "Junior Engineers, Technicians, and Scientists club engaging in robotics, electronics, chemical reactions, and STAN competitions."
    },
    {
      title: "Press & Literary Debating Club",
      category: "Communications",
      icon: <Mic2 className="w-5 h-5 text-blue-500" />,
      description: "Sharpening public speaking, journalistic reporting, editorial writing, and state championship inter-school debates."
    },
    {
      title: "Quranic & Islamic Heritage Society",
      category: "Spiritual & Ethics",
      icon: <BookOpenCheck className="w-5 h-5 text-emerald-500" />,
      description: "Weekly circles for Tajweed, Hadith memorization, spiritual reflections, and moral character counseling."
    },
    {
      title: "Red Cross & First Aid Cadet",
      category: "Humanitarian",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      description: "Practical lifesaving first-aid training, disaster safety consciousness, and community hygiene initiatives in Lafia."
    },
    {
      title: "Young Farmers & Agri-Tech Club",
      category: "Vocational",
      icon: <Sprout className="w-5 h-5 text-green-600" />,
      description: "Hands-on poultry and crop farming on the school demonstration farm, learning modern agricultural science."
    },
    {
      title: "Sports & Athletics Guild",
      category: "Athletics",
      icon: <Activity className="w-5 h-5 text-indigo-500" />,
      description: "Football, basketball, volleyball, table tennis, and track athletics with dedicated training under professional physical educators."
    }
  ];

  const routine = [
    { time: "5:00 AM – 6:00 AM", event: "Fajr Prayer, Dawn Quranic Recitation & Hostel Inspection" },
    { time: "6:00 AM – 7:15 AM", event: "Morning Chores, Personal Grooming & Nutritious Breakfast" },
    { time: "7:30 AM – 8:00 AM", event: "School Morning Assembly & Moral Exhortation" },
    { time: "8:00 AM – 11:20 AM", event: "Academic Lessons (Periods 1 to 4)" },
    { time: "11:20 AM – 12:00 PM", event: "Mid-Day Snack & Refreshment Break" },
    { time: "12:00 PM – 2:00 PM", event: "Academic Lessons & Science Practicals (Periods 5 to 7)" },
    { time: "2:00 PM – 2:40 PM", event: "Dhuhr Congregational Prayer & Lunch" },
    { time: "2:40 PM – 4:00 PM", event: "Co-curricular Clubs, ICT Coding & Prep Study" },
    { time: "4:00 PM – 5:45 PM", event: "Sports, Athletics & Recreation / Day Students Dismissal" },
    { time: "6:30 PM – 7:30 PM", event: "Maghrib Prayer, Evening Dinner & Isha Prayer" },
    { time: "7:45 PM – 9:30 PM", event: "Supervised Evening Prep (Night Study in Classrooms)" },
    { time: "10:00 PM", event: "Hostel Lights Out & Rest" }
  ];

  return (
    <section id="student-life" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-navy/10 text-school-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Users2 className="w-4 h-4 text-school-gold" />
            <span>Vibrant Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Nurturing Well-Rounded, Confident Scholars
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Education at Hammadur Rahman Academy extends far beyond textbooks. We balance academic rigor with creative clubs, physical fitness, and disciplined boarding life.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'clubs'
                  ? 'bg-school-dark text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Clubs & Societies
            </button>
            <button
              onClick={() => setActiveTab('boarding')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'boarding'
                  ? 'bg-school-dark text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Boarding Experience
            </button>
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'routine'
                  ? 'bg-school-dark text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Daily Schedule
            </button>
          </div>
        </div>

        {/* Tab 1: Clubs & Societies */}
        {activeTab === 'clubs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {clubs.map((club, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-school-navy/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {club.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                      {club.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {club.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {club.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-school-blue">
                  <span>Weekly Wednesday Meetings</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Boarding Experience */}
        {activeTab === 'boarding' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-school-navy font-bold text-xs uppercase tracking-wider">
                  <Home className="w-4 h-4 text-school-gold" />
                  <span>A Safe Home Away From Home</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Nurturing Pastoral Care in Lafia, Nasarawa State
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our boarding system is designed to inculcate self-reliance, camaraderie, and rigorous time management. Supervised by seasoned house masters and matrons, boarders enjoy a warm, structured, and spiritually uplifting community.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Perimeter Security & CCTV</h4>
                    <p className="text-[11px] text-slate-500 mt-1">24/7 armed security personnel and surveillance system.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <Utensils className="w-5 h-5 text-amber-600 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Hygienic Dining Hall</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Three hot, wholesome, dietitian-approved meals daily.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <BookOpenCheck className="w-5 h-5 text-blue-600 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Supervised Prep Studies</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Two hours of guided night prep every weekday evening.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <Activity className="w-5 h-5 text-purple-600 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Healthcare on Standby</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Resident nurses and rapid medical referral protocols.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                    alt="Boarding students at Hammadur Rahman Academy Lafia" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-school-dark text-white p-4 rounded-2xl shadow-xl border border-school-gold/40">
                  <p className="text-xs font-bold text-school-gold">Separate Boys & Girls Hostels</p>
                  <p className="text-[11px] text-slate-300">Spacious, well-ventilated rooms with private storage lockers</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Daily Routine Schedule */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Clock className="w-6 h-6 text-school-gold" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Official Daily Timetable & Routine</h3>
                <p className="text-xs text-slate-500">Structured discipline ensuring balance between studies, worship, and rest</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {routine.map((item, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 px-3 rounded-lg transition-colors">
                  <span className="text-xs font-mono font-bold text-school-navy sm:w-44 flex-shrink-0">
                    {item.time}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 flex-1 font-medium">
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
