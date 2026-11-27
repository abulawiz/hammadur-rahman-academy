import React from 'react';
import { CreditCard, Mail, ShieldCheck, X } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'fees' | 'results';
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4" role="presentation" onClick={onClose}>
      <section
        aria-labelledby="student-services-title"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-emerald-100 bg-white p-6 text-slate-900 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">Student services</p>
            <h2 className="mt-2 text-2xl font-bold" id="student-services-title">School fee payments</h2>
          </div>
          <button aria-label="Close student services" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={onClose} type="button">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <CreditCard aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" />
            <div>
              <h3 className="font-semibold text-amber-950">Online checkout is not active yet</h3>
              <p className="mt-1 text-sm leading-6 text-amber-900">
                We can&apos;t securely accept or confirm card payments until the school connects a payment provider. No payment details should be entered on this page.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-900">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            <h3 className="font-semibold">Need to pay or confirm your balance?</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Contact the school office for the current fee schedule and approved payment instructions. Please do not send money to account details from unofficial sources.
          </p>
        </div>

        <a className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2" href={`mailto:${SCHOOL_INFO.infoEmail}?subject=School%20fees%20and%20payment%20instructions`}>
          <Mail aria-hidden="true" className="h-4 w-4" />
          Ask the school office
        </a>
      </section>
    </div>
  );
};
