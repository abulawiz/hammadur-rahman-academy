import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  ShieldCheck, 
  Send, 
  CheckCircle
} from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenApply }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#034a27] text-emerald-100 pt-16 pb-12 border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/40">
          
          {/* Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-school-gold to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#034a27] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-school-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Hammadur Rahman Academy
                </h3>
                <p className="text-xs text-school-goldLight">
                  Secondary School | Lafia, Nasarawa State
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed">
              A premier citadel of learning dedicated to cultivating academic brilliance, moral excellence, and Islamic ethos in the heart of Lafia, Nasarawa State, Nigeria.
            </p>

            <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">Full Examination Center Accreditation:</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 pl-6">
                WAEC Center No: <strong>4260189</strong> | NECO Center No: <strong>025114</strong>
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-school-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-school-gold transition-colors">About Us</a></li>
              <li><a href="#academics" className="hover:text-school-gold transition-colors">Academic Programs</a></li>
              <li><a href="#admissions" className="hover:text-school-gold transition-colors">Admissions 2026/27</a></li>
              <li><a href="#facilities" className="hover:text-school-gold transition-colors">Campus Facilities</a></li>
              <li><a href="#student-life" className="hover:text-school-gold transition-colors">Boarding & Student Life</a></li>
              <li><a href="#news" className="hover:text-school-gold transition-colors">School News & Calendar</a></li>
              <li><a href="#contact" className="hover:text-school-gold transition-colors">Contact & Directions</a></li>
            </ul>
          </div>

          {/* Academic Portals (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Portals & Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenPortal}
                  className="text-left text-slate-300 hover:text-school-gold transition-colors flex items-center gap-1.5"
                >
                  <span>→ Student Fees & Result Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApply}
                  className="text-left text-slate-300 hover:text-school-gold transition-colors flex items-center gap-1.5"
                >
                  <span>→ 2026/2027 Online Admission Form</span>
                </button>
              </li>
              <li>
                <a href="#academics" className="hover:text-school-gold transition-colors">
                  → Pure & Applied Science Track
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-school-gold transition-colors">
                  → Integrated Tahfeez & Moral Program
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-school-gold transition-colors">
                  → 120-Seat Solar CBT Computer Center
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">School Newsletter</h4>
            <p className="text-xs text-slate-400">
              Subscribe for termly academic newsletters, entrance examination results, and event announcements.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-emerald-950/80 border border-emerald-800/60 text-xs text-white px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-school-gold flex-1 placeholder:text-emerald-300/40"
                />
                <button
                  type="submit"
                  className="bg-school-gold hover:bg-amber-500 text-school-dark px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-school-gold" />
                <span>Lafia, Nasarawa State, Nigeria</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-school-gold" />
                <span>{SCHOOL_INFO.phone}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Motto: {SCHOOL_INFO.motto} • {SCHOOL_INFO.arabicMotto}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/60"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
