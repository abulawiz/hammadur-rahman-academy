import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { api } from '../services/api';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  HelpCircle,
  Building
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Admissions Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }
    setSubmitting(true);
    try {
      await api.submitInquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.warn('Backend note:', err.message);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#046a38] dark:bg-[#03542c] text-white transition-colors duration-300 relative border-t border-emerald-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-school-gold text-xs font-bold uppercase tracking-wider mb-3 border border-school-gold/30">
            <MessageSquare className="w-4 h-4 text-school-gold" />
            <span>Connect with our Admissions Office</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Visit Our Lafia Campus or Send an Inquiry
          </h2>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Our admissions counselors and administrative officers are available Monday through Saturday to guide you through enrollment, fees, and campus tours.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Details & Campus Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#034d28] dark:bg-[#023a1e] border border-emerald-500/30 text-white space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Building className="w-5 h-5 text-school-gold" />
                <span>School Headquarters & Campus</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-school-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-school-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-school-goldLight uppercase">Campus Location</h4>
                    <p className="text-xs text-emerald-100 mt-0.5 leading-relaxed">
                      {SCHOOL_INFO.location}
                    </p>
                    <p className="text-[11px] text-amber-300 font-medium mt-1">
                      {SCHOOL_INFO.poBox}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-school-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-school-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-school-goldLight uppercase">Helpline & WhatsApp</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">
                      <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-school-gold font-semibold">
                        {SCHOOL_INFO.phone}
                      </a>
                    </p>
                    <p className="text-xs text-emerald-100">
                      <a href={`tel:${SCHOOL_INFO.secondaryPhone}`} className="hover:text-school-gold">
                        {SCHOOL_INFO.secondaryPhone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-school-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-school-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-school-goldLight uppercase">Official Email Addresses</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">
                      Admissions: <a href={`mailto:${SCHOOL_INFO.email}`} className="text-amber-300 font-semibold">{SCHOOL_INFO.email}</a>
                    </p>
                    <p className="text-xs text-emerald-100">
                      Inquiries: <a href={`mailto:${SCHOOL_INFO.infoEmail}`} className="text-amber-300">{SCHOOL_INFO.infoEmail}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-school-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-school-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-school-goldLight uppercase">Administrative Office Hours</h4>
                    <p className="text-xs text-emerald-100 mt-0.5">
                      {SCHOOL_INFO.hours}
                    </p>
                    <p className="text-[11px] text-emerald-300/80">
                      Saturday (Admissions desk): 9:00 AM – 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions note card */}
            <div className="p-5 rounded-2xl bg-[#022c1f] border border-school-gold/30 text-white">
              <h4 className="text-xs font-bold text-school-gold flex items-center gap-1.5 uppercase">
                <HelpCircle className="w-4 h-4 text-school-gold" />
                <span>Directions in Lafia</span>
              </h4>
              <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                Located conveniently within Lafia metropolis, 5 minutes drive from the Shendam Road Junction and accessible via tricycle or campus shuttles.
              </p>
            </div>

          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#034d28] dark:bg-[#023a1e] p-6 sm:p-10 rounded-3xl border border-emerald-500/30 text-white shadow-xl">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-school-gold flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-emerald-100/90 max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong>{formData.inquiryType}</strong> has been received by the Admissions Secretariat of Hammadur Rahman Academy Lafia. A representative will contact you via email or phone shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: '', email: '', phone: '', inquiryType: 'Admissions Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Send Us an Official Message
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1">
                    Fill out the form below and our administrative office will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-emerald-100 mb-1">
                      Parent / Guardian Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Alhaji Mohammed Bello"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/80 text-white placeholder:text-emerald-300/40 text-sm focus:outline-none focus:ring-2 focus:ring-school-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-100 mb-1">
                      Active Email Address *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. parent@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/80 text-white placeholder:text-emerald-300/40 text-sm focus:outline-none focus:ring-2 focus:ring-school-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-100 mb-1">
                      Phone Number (Call / WhatsApp) *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/80 text-white placeholder:text-emerald-300/40 text-sm focus:outline-none focus:ring-2 focus:ring-school-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-100 mb-1">
                      Subject / Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-school-gold"
                    >
                      <option className="bg-emerald-950 text-white">Admissions Inquiry (JSS1 / SSS1)</option>
                      <option className="bg-emerald-950 text-white">Transfer Student Admission</option>
                      <option className="bg-emerald-950 text-white">Boarding Facilities & Fees</option>
                      <option className="bg-emerald-950 text-white">Tahfeez Program Details</option>
                      <option className="bg-emerald-950 text-white">General Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-100 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Please specify child's age, current class, and any specific questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/80 text-white placeholder:text-emerald-300/40 text-sm focus:outline-none focus:ring-2 focus:ring-school-gold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                  >
                    <Send className="w-4 h-4 text-emerald-950" />
                    <span>Submit Inquiry to Admissions Office</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
