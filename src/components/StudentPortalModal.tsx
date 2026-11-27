import React from 'react';
import { Mail, X } from 'lucide-react';
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
        className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 text-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">Student services</p>
            <h2 className="mt-2 text-2xl font-bold" id="student-services-title">Online records are unavailable</h2>
          </div>
          <button aria-label="Close student services" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={onClose} type="button">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          For student records or fee questions, please contact the school office directly. No student information is requested on this page.
        </p>
        <a className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900" href={`mailto:${SCHOOL_INFO.infoEmail}`}>
          <Mail aria-hidden="true" className="h-4 w-4" />
          Contact the school office
        </a>
      </section>
    </div>
  );
};
