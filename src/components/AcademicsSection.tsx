import React from 'react';
import { ArrowRight, BookOpen, Calculator, FlaskConical, Landmark } from 'lucide-react';

const pathways = [
  {
    icon: BookOpen,
    title: 'Junior secondary',
    description: 'Build a strong foundation across core subjects, study habits and personal responsibility.',
    subjects: 'Core learning · Literacy · Numeracy',
  },
  {
    icon: FlaskConical,
    title: 'Science and technology',
    description: 'Explore scientific ideas, mathematics and digital literacy through a curious, practical approach.',
    subjects: 'Science · Mathematics · Digital skills',
  },
  {
    icon: Landmark,
    title: 'Arts and humanities',
    description: 'Develop clear communication and a wider understanding of society, history and culture.',
    subjects: 'Languages · Humanities · Civic learning',
  },
  {
    icon: Calculator,
    title: 'Commercial studies',
    description: 'Build confidence with business concepts, numeracy and everyday financial understanding.',
    subjects: 'Commerce · Economics · Accounting',
  },
];

interface AcademicsSectionProps {
  onOpenApply: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenApply }) => (
  <section id="academics" className="border-t border-emerald-700/40 bg-[#046a38] py-20 text-white dark:bg-[#03542c]">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Academic pathways</p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">A considered path through secondary school.</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-emerald-100/85">
          Learning areas are presented as a guide. Contact the school for current subject combinations and curriculum details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pathways.map(({ icon: Icon, title, description, subjects }) => (
          <article key={title} className="rounded-lg border border-emerald-500/35 bg-[#034d28] p-6 dark:bg-[#023a1e]">
            <Icon className="mb-8 h-6 w-6 text-amber-300" aria-hidden="true" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-3 min-h-20 text-sm leading-6 text-emerald-100/80">{description}</p>
            <p className="mt-5 border-t border-emerald-700/70 pt-4 text-xs font-medium text-emerald-200">{subjects}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg border border-emerald-500/35 bg-[#034d28] p-6 sm:flex-row sm:items-center dark:bg-[#023a1e]">
        <p className="max-w-2xl text-sm leading-6 text-emerald-100/85">Need details about a particular class or subject? The school office can confirm the current options.</p>
        <button type="button" onClick={onOpenApply} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          Ask the school <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
);
