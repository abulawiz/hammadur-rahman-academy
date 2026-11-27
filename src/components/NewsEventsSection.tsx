import React from 'react';
import { ArrowRight, CalendarDays, Megaphone } from 'lucide-react';

export const NewsEventsSection: React.FC = () => (
  <section id="news" className="border-t border-emerald-700/40 bg-[#046a38] py-20 text-white transition-colors duration-300 dark:bg-[#03542c]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-school-gold">
          <Megaphone className="h-4 w-4" aria-hidden="true" /> School notices
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">News & term dates</h2>
        <p className="mt-4 text-sm leading-7 text-emerald-100/90 sm:text-base">
          School dates and announcements are confirmed by the office. Contact the school for the current term calendar, upcoming events and admissions updates.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-emerald-700/60 bg-[#034d28] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-school-gold">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-white">Looking for the latest school information?</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-100/80">
              Please check directly with the school office so you receive accurate dates and arrangements.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-school-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold"
            >
              Contact the school <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
