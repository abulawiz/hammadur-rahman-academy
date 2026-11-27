import React from 'react';
import { ArrowRight, ClipboardList, MessageCircle, School } from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenApply: () => void;
}

const nextSteps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Speak with the school',
    description: 'Contact the admissions office for current intake information and entry requirements.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Confirm what to prepare',
    description: 'The office will let you know which documents are needed for your child’s year level.',
  },
  {
    number: '03',
    icon: School,
    title: 'Arrange a campus visit',
    description: 'Ask about visiting the Lafia campus and the next steps for an application.',
  },
];

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onOpenApply }) => (
  <section id="admissions" className="border-t border-emerald-700/40 bg-[#046a38] py-20 text-white transition-colors duration-300 dark:bg-[#03542c]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-school-gold">Admissions</p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">A clear path to joining our school</h2>
        <p className="mt-4 text-sm leading-7 text-emerald-100/90 sm:text-base">
          Intake dates and requirements can change. Please contact the school office for the latest information before preparing an application.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {nextSteps.map(({ number, icon: Icon, title, description }) => (
          <article key={number} className="rounded-xl border border-emerald-700/60 bg-[#034d28] p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-widest text-school-gold">{number}</span>
              <Icon className="h-5 w-5 text-school-gold" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-100/80">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-emerald-700/60 bg-[#023a1e] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="text-lg font-semibold text-white">Interested in joining Hammadur Rahman Academy?</h3>
          <p className="mt-1 text-sm text-emerald-100/80">Our team can answer questions about entry, school life and visits.</p>
        </div>
        <button
          type="button"
          onClick={onOpenApply}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-school-gold px-5 py-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#023a1e]"
        >
          Contact admissions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
);
