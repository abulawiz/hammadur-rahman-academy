import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

const contactMethods = [
  {
    label: 'Admissions',
    value: SCHOOL_INFO.email,
    href: `mailto:${SCHOOL_INFO.email}`,
    icon: Mail,
  },
  {
    label: 'School office',
    value: SCHOOL_INFO.phone,
    href: `tel:${SCHOOL_INFO.phone.replace(/[^+\d]/g, '')}`,
    icon: Phone,
  },
];

export const ContactSection: React.FC = () => (
  <section id="contact" className="border-t border-emerald-700/40 bg-[#034d28] py-20 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-school-gold">Get in touch</p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">We’re here to help.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-emerald-100/85 sm:text-base">
            Contact the school office for admissions, campus visits, term dates or general questions. For student records and account matters, please speak with the school directly.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactMethods.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex min-h-32 items-start gap-4 rounded-xl border border-emerald-700/60 bg-[#023a1e] p-5 transition-colors hover:border-school-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-school-gold">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-emerald-200/75">{label}</span>
                <span className="mt-2 block break-words text-sm font-semibold text-white group-hover:text-school-gold">{value}</span>
              </span>
            </a>
          ))}

          <div className="flex min-h-32 items-start gap-4 rounded-xl border border-emerald-700/60 bg-[#023a1e] p-5 sm:col-span-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-school-gold">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-200/75">Visit the campus</h3>
              <p className="mt-2 text-sm leading-6 text-white">{SCHOOL_INFO.location}</p>
              <p className="mt-1 text-xs text-emerald-200/75">{SCHOOL_INFO.poBox}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-emerald-700/60 bg-[#023a1e] p-5 sm:col-span-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-school-gold">
              <Clock3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-200/75">Office hours</h3>
              <p className="mt-2 text-sm text-white">{SCHOOL_INFO.hours}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-10 border-t border-emerald-700/50 pt-5 text-xs leading-5 text-emerald-200/70">
        This website does not ask visitors to submit student records, payment details or other sensitive information.
      </p>
    </div>
  </section>
);
