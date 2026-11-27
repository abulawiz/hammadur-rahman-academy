import React, { useState } from 'react';
import { BookOpen, HeartHandshake, Lightbulb, UsersRound } from 'lucide-react';

const opportunities = [
  {
    icon: Lightbulb,
    category: 'Curiosity',
    title: 'Explore new ideas',
    description: 'Encourage questions, problem-solving and learning that extends beyond a single subject.',
  },
  {
    icon: BookOpen,
    category: 'Expression',
    title: 'Share a point of view',
    description: 'Reading, writing and discussion help students communicate with clarity and confidence.',
  },
  {
    icon: HeartHandshake,
    category: 'Character',
    title: 'Learn with consideration',
    description: 'Personal responsibility and respect for others are part of a positive school community.',
  },
  {
    icon: UsersRound,
    category: 'Participation',
    title: 'Take part in school life',
    description: 'Students can grow through shared interests, collaboration and community involvement.',
  },
];

type StudentLifeView = 'activities' | 'support';

export const StudentLifeSection: React.FC = () => {
  const [activeView, setActiveView] = useState<StudentLifeView>('activities');

  return (
    <section id="student-life" className="border-t border-emerald-700/40 bg-[#046a38] py-20 text-white dark:bg-[#03542c]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Student life</p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Learning continues beyond the classroom.</h2>
          <p className="mt-4 text-sm leading-7 text-emerald-100/85">
            A balanced school experience makes room for curiosity, personal growth and positive relationships.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Student life information">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'activities'}
            aria-controls="student-life-activities"
            id="student-life-activities-tab"
            onClick={() => setActiveView('activities')}
            className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${activeView === 'activities' ? 'bg-amber-400 text-emerald-950' : 'border border-emerald-400/40 text-emerald-100 hover:bg-emerald-900/50'}`}
          >
            Enrichment
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'support'}
            aria-controls="student-life-support"
            id="student-life-support-tab"
            onClick={() => setActiveView('support')}
            className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${activeView === 'support' ? 'bg-amber-400 text-emerald-950' : 'border border-emerald-400/40 text-emerald-100 hover:bg-emerald-900/50'}`}
          >
            Student support
          </button>
        </div>

        {activeView === 'activities' ? (
          <div id="student-life-activities" role="tabpanel" aria-labelledby="student-life-activities-tab" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {opportunities.map(({ icon: Icon, category, title, description }) => (
              <article key={title} className="rounded-lg border border-emerald-500/35 bg-[#034d28] p-6 dark:bg-[#023a1e]">
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">{category}</span>
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-100/75">{description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div id="student-life-support" role="tabpanel" aria-labelledby="student-life-support-tab" className="grid gap-8 rounded-lg border border-emerald-500/35 bg-[#034d28] p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center dark:bg-[#023a1e]">
            <div>
              <h3 className="text-xl font-semibold">Questions about student support?</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-100/80">
                Details about boarding, student services and current school arrangements are best confirmed directly with the office.
              </p>
            </div>
            <a href="#contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Contact the school
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
