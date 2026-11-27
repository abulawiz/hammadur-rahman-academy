import React from 'react';
import { BookOpen, HeartHandshake, UsersRound } from 'lucide-react';

const commitments = [
  {
    icon: BookOpen,
    title: 'A strong academic foundation',
    description: 'Core learning, curiosity and steady study habits help students prepare for what comes next.',
  },
  {
    icon: HeartHandshake,
    title: 'Character and responsibility',
    description: 'Respect, integrity and care for others are part of a thoughtful school experience.',
  },
  {
    icon: UsersRound,
    title: 'A connected community',
    description: 'Students and families are encouraged to stay connected with the school community in Lafia.',
  },
];

export const PrincipalWelcome: React.FC = () => (
  <section id="about" className="border-t border-[#e1e6dc] bg-[#fbfaf6] py-20 text-[#173b2b] dark:border-emerald-900 dark:bg-[#102d20] dark:text-emerald-50">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="max-w-md">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b18]">About the school</p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Knowledge, character and a sense of purpose.
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-8 text-[#53665a] dark:text-emerald-100/80 sm:text-lg">
            Hammadur Rahman Academy Secondary School in Lafia brings academic learning, personal responsibility and respect for others together in a welcoming school community. Contact the office for current programs and school arrangements.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {commitments.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-lg border border-[#e2e6dd] bg-white p-5 dark:border-emerald-900 dark:bg-[#153a29]">
                <Icon className="mb-5 h-5 w-5 text-[#9a781d]" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-[#173b2b] dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#637267] dark:text-emerald-100/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
