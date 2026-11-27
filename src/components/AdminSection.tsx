import React from 'react';
import { Mail } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface AdminSectionProps {
  adminUser: unknown;
  onLogin: (user: unknown) => void;
  onLogout: () => void;
  onOpenDashboard: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = () => (
  <section aria-labelledby="staff-access-title" className="rounded-2xl border border-emerald-100 bg-white p-6 text-slate-900 shadow-sm">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">Staff services</p>
    <h2 className="mt-2 text-2xl font-bold" id="staff-access-title">Staff access is unavailable</h2>
    <p className="mt-3 leading-7 text-slate-600">
      Administrative tools are offline until secure staff authentication is configured. Please contact the school office for assistance.
    </p>
    <a className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900" href={`mailto:${SCHOOL_INFO.infoEmail}`}>
      <Mail aria-hidden="true" className="h-4 w-4" />
      Contact the school office
    </a>
  </section>
);
