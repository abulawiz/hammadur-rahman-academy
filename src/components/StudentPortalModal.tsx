import React, { useState } from 'react';
import { SCHOOL_INFO, DEMO_STUDENT_RESULT } from '../data/schoolData';
import { 
  X, 
  UserCheck, 
  KeyRound, 
  GraduationCap, 
  Award, 
  Printer, 
  CheckCircle, 
  ArrowLeft,
  Calendar,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  const [admissionNo, setAdmissionNo] = useState('HRA/2024/048');
  const [pin, setPin] = useState('8842-1903-7521');
  const [term, setTerm] = useState('Third Term');
  const [session, setSession] = useState('2025/2026');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionNo.trim() || !pin.trim()) {
      setError('Please provide both the Student Admission Number and Scratch Card PIN.');
      return;
    }

    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-school-dark via-school-navy to-school-dark text-white p-4 sm:p-5 flex items-center justify-between border-b border-school-gold/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-school-gold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                Student & Parent Academic Portal
              </h3>
              <p className="text-[11px] text-school-goldLight">
                Hammadur Rahman Academy • Continuous Assessment & Result Checking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          {!showResult ? (
            /* Portal Login View */
            <div className="max-w-md mx-auto py-4 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-school-navy/10 text-school-navy flex items-center justify-center mx-auto">
                  <KeyRound className="w-7 h-7 text-school-blue" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                  Check Termly Examination Report
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter the student's admission number and online result pin. A demo account is pre-populated for instant testing.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Admission Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HRA/2024/048"
                    value={admissionNo}
                    onChange={(e) => setAdmissionNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/40 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Default demo: HRA/2024/048</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Result PIN / Scratch Card Serial
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8842-1903-7521"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/40 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Academic Term
                    </label>
                    <select
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    >
                      <option>Third Term</option>
                      <option>Second Term</option>
                      <option>First Term</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Academic Session
                    </label>
                    <select
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    >
                      <option>2025/2026</option>
                      <option>2024/2025</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-school-dark hover:bg-school-navy text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Fetching Student Record...</span>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 text-school-gold" />
                        <span>Verify & View Report Card</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    Need a scratch card or misplaced PIN? Contact the school bursary at Lafia campus.
                  </span>
                </div>
              </form>

            </div>
          ) : (
            /* Authentic Termly Report Card View */
            <div className="space-y-6">
              
              {/* Report Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 print:hidden">
                <button
                  onClick={() => setShowResult(false)}
                  className="flex items-center gap-1.5 text-xs font-bold text-school-navy hover:text-school-blue transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Check Another Student Result</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Printer className="w-4 h-4 text-school-navy" />
                    <span>Print Report Card</span>
                  </button>
                </div>
              </div>

              {/* Printable Result Document Canvas */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-sm space-y-6 font-sans">
                
                {/* Official School Header */}
                <div className="text-center border-b-2 border-slate-900 pb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <GraduationCap className="w-8 h-8 text-school-navy" />
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading uppercase tracking-wide">
                      {SCHOOL_INFO.name}
                    </h2>
                  </div>
                  <p className="text-xs font-serif italic text-slate-600">
                    {SCHOOL_INFO.arabicName} • Motto: {SCHOOL_INFO.motto}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {SCHOOL_INFO.location}
                  </p>
                  <p className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">
                    {SCHOOL_INFO.accreditation} • Exam Center No: {SCHOOL_INFO.examCenterNo}
                  </p>
                  <div className="inline-block mt-2 px-4 py-1 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
                    Official Student Continuous Assessment & Termly Dossier
                  </div>
                </div>

                {/* Student Profile Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Student Name:</span>
                    <strong className="text-slate-900">{DEMO_STUDENT_RESULT.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Admission Number:</span>
                    <strong className="font-mono text-school-navy">{DEMO_STUDENT_RESULT.admissionNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Class / Stream:</span>
                    <strong className="text-slate-900">{DEMO_STUDENT_RESULT.classGrade}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Term & Session:</span>
                    <strong className="text-slate-900">{DEMO_STUDENT_RESULT.term} ({DEMO_STUDENT_RESULT.session})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Attendance:</span>
                    <strong className="text-emerald-700">{DEMO_STUDENT_RESULT.attendance}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Class Position:</span>
                    <strong className="text-amber-700">{DEMO_STUDENT_RESULT.position}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Overall Average:</span>
                    <strong className="text-blue-700">{DEMO_STUDENT_RESULT.averageScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Promotion Status:</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold text-[11px]">
                      PROMOTED TO SSS3
                    </span>
                  </div>
                </div>

                {/* Grades Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 border-r border-slate-700">Subject Name</th>
                        <th className="p-2.5 text-center border-r border-slate-700">CA (30)</th>
                        <th className="p-2.5 text-center border-r border-slate-700">Exam (70)</th>
                        <th className="p-2.5 text-center border-r border-slate-700">Total (100)</th>
                        <th className="p-2.5 text-center border-r border-slate-700">Grade</th>
                        <th className="p-2.5">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {DEMO_STUDENT_RESULT.grades.map((g, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-2.5 font-medium text-slate-800 border-r border-slate-200">
                            {g.subject}
                          </td>
                          <td className="p-2.5 text-center font-mono border-r border-slate-200">
                            {g.caScore}
                          </td>
                          <td className="p-2.5 text-center font-mono border-r border-slate-200">
                            {g.examScore}
                          </td>
                          <td className="p-2.5 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                            {g.total}
                          </td>
                          <td className="p-2.5 text-center font-black border-r border-slate-200">
                            <span className={`px-2 py-0.5 rounded text-[11px] ${
                              g.grade === 'A1' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {g.grade}
                            </span>
                          </td>
                          <td className="p-2.5 text-slate-600 font-medium">
                            {g.remark}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Principal Remark & Official Signatures */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Principal / Director of Studies Remark:
                    </span>
                    <p className="text-xs text-slate-800 italic leading-relaxed">
                      "{DEMO_STUDENT_RESULT.principalRemark}"
                    </p>
                  </div>

                  <div className="flex flex-col justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Dr. Abdur-Rahman A. Al-Hassan</p>
                        <p className="text-[10px] text-slate-500">Principal & Director of Studies</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center text-[8px] font-black text-emerald-700 uppercase transform -rotate-12">
                        SEAL APPROVED
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-2">
                      Verified electronically via Hammadur Rahman Academy Portal • Lafia
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
