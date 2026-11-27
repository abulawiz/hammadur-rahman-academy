import React from 'react';
import { ArrowRight, BookOpen, FlaskConical, HeartHandshake, Laptop } from 'lucide-react';

const learningSpaces = [
  {
    icon: BookOpen,
    category: 'Learning',
    title: 'Space to focus',
    description: 'A calm, structured setting gives students room to build knowledge and good study habits.',
  },
  {
    icon: FlaskConical,
    category: 'Practical learning',
    title: 'Curiosity in practice',
    description: 'Science and technology encourage students to ask questions and explore ideas beyond the page.',
  },
  {
    icon: Laptop,
    category: 'Digital skills',
    title: 'Learning for a changing world',
    description: 'Digital literacy helps students research, communicate and approach new challenges with confidence.',
  },
  {
    icon: HeartHandshake,
    category: 'Student wellbeing',
    title: 'A supportive community',
    description: 'Respect, responsibility and positive relationships are an important part of school life.',
  },
];

export const FacilitiesSection: React.FC = () => (
  <section id="facilities" className="border-t border-[#e1e6dc] bg-[#fbfaf6] py-20 text-[#173b2b] dark:border-emerald-900 dark:bg-[#102d20] dark:text-emerald-50">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b18]">Learning environment</p>
        <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">A setting for learning and growth.</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d6b61] dark:text-emerald-100/75">
          Every school day is shaped by the spaces, resources and relationships around students. For current campus information or to arrange a visit, contact the school office.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {learningSpaces.map(({ icon: Icon, category, title, description }) => (
          <article key={title} className="rounded-lg border border-[#e2e6dd] bg-white p-6 dark:border-emerald-900 dark:bg-[#153a29]">
            <div className="mb-9 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#edf3ed] text-[#17633f] dark:bg-[#1a4a33] dark:text-emerald-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a6b18]">{category}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#637267] dark:text-emerald-100/70">{description}</p>
          </article>
        ))}
      </div>

      <a href="#contact" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#145b3a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0e482d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd982b] focus-visible:ring-offset-2">
        Ask about campus visits <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </section>
);
