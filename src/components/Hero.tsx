import React from 'react';
import { ArrowDown, ArrowRight, BookOpen, HeartHandshake, Landmark } from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
  onOpenPortal: () => void;
  onExploreAcademics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply, onExploreAcademics }) => (
  <section id="home" className="relative overflow-hidden bg-[#f6f5ef] pb-16 pt-36 text-[#173b2b] sm:pt-40 lg:pb-24 lg:pt-44">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
      <div className="max-w-2xl">
        <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#17633f]">
          <span className="h-px w-8 bg-[#bd982b]" />
          Secondary education in Lafia, Nasarawa State
        </p>
        <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-[#123b29] sm:text-5xl lg:text-[3.6rem]">
          Knowledge and character, for the <span className="text-[#a7801a]">world ahead.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#54665b] sm:text-lg">
          Hammadur Rahman Academy brings academic learning, personal responsibility and strong values together in a welcoming school community.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenApply}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#145b3a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0e482d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd982b] focus-visible:ring-offset-2"
          >
            Ask about admissions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onExploreAcademics}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#c9d4c9] bg-white px-5 py-3 text-sm font-semibold text-[#173b2b] transition-colors hover:border-[#145b3a] hover:bg-[#f0f4ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd982b] focus-visible:ring-offset-2"
          >
            Explore academics <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid gap-4 border-t border-[#dce2d8] pt-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#9a781d]" aria-hidden="true" />
            <span className="text-sm leading-5 text-[#465a4c]">A broad secondary curriculum</span>
          </div>
          <div className="flex items-start gap-3">
            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[#9a781d]" aria-hidden="true" />
            <span className="text-sm leading-5 text-[#465a4c]">Learning grounded in character</span>
          </div>
          <div className="flex items-start gap-3">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#9a781d]" aria-hidden="true" />
            <span className="text-sm leading-5 text-[#465a4c]">A community rooted in Lafia</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
        <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-[#d8c477]/70 sm:-left-7 sm:-top-7 sm:h-36 sm:w-36" aria-hidden="true" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#d9e1d6] shadow-[0_24px_70px_-36px_rgba(19,57,39,0.55)]">
          <img
            src="/images/campus-hero.png"
            alt="Illustration of a school courtyard"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#103b29]/55 via-transparent to-transparent" aria-hidden="true" />
          <p className="absolute bottom-5 left-5 max-w-xs text-sm font-medium leading-6 text-white drop-shadow sm:bottom-7 sm:left-7">
            A place to learn with purpose and grow with confidence.
          </p>
        </div>
        <div className="absolute -bottom-5 right-3 rounded-sm border border-[#e3e5dc] bg-white px-4 py-3 shadow-lg sm:-bottom-6 sm:right-7 sm:px-5 sm:py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a8177]">Illustrative image</p>
          <p className="mt-1 text-sm font-semibold text-[#173b2b]">A school courtyard</p>
        </div>
      </div>
    </div>
  </section>
);
