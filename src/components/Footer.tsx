import React from 'react';
import { ArrowUp, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenApply: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenApply }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-emerald-800 bg-[#073c28] py-12 text-emerald-100 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-emerald-800/80 pb-10 md:grid-cols-3">
          <div>
            <a href="#home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd43]">
              <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#d9b548]/60 bg-[#0d5135] text-[#efcc62]">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-heading text-base font-bold text-white">Hammadur Rahman Academy</span>
                <span className="mt-0.5 block text-xs text-emerald-200">Secondary School · Lafia</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-100/75">
              A school community focused on learning, responsibility and character in Lafia, Nasarawa State.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-emerald-100/75">
              <li><a className="transition-colors hover:text-white" href="#about">About</a></li>
              <li><a className="transition-colors hover:text-white" href="#academics">Academics</a></li>
              <li><a className="transition-colors hover:text-white" href="#admissions">Admissions</a></li>
              <li><a className="transition-colors hover:text-white" href="#facilities">Facilities</a></li>
              <li><a className="transition-colors hover:text-white" href="#student-life">Student life</a></li>
              <li><a className="transition-colors hover:text-white" href="#contact">Contact</a></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={onOpenApply} className="text-sm font-semibold text-[#efcc62] underline-offset-4 hover:underline">Admissions enquiry</button>
              <button onClick={onOpenPortal} className="text-sm font-semibold text-[#efcc62] underline-offset-4 hover:underline">Student support</button>
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact the school</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-emerald-100/75">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#efcc62]" aria-hidden="true" />
                <span>Lafia, Nasarawa State, Nigeria</span>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#efcc62]" aria-hidden="true" />
                <a className="transition-colors hover:text-white" href={`tel:${SCHOOL_INFO.phone.replace(/[^+\d]/g, '')}`}>{SCHOOL_INFO.phone}</a>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#efcc62]" aria-hidden="true" />
                <a className="break-all transition-colors hover:text-white" href={`mailto:${SCHOOL_INFO.email}`}>{SCHOOL_INFO.email}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-emerald-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} {SCHOOL_INFO.name}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-sm text-emerald-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd43] sm:self-auto"
          >
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
