import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  User, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Printer,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    gender: 'Male',
    dob: '',
    classApplied: 'Junior Secondary School 1 (JSS1)',
    enrollmentType: 'Boarding Student',
    stateOfOrigin: 'Nasarawa',
    lga: 'Lafia',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: 'Lafia, Nasarawa State',
    previousSchool: '',
    lastClassPassed: 'Primary 6',
    medicalNotes: 'None'
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Generate reference number
      const randomRef = `HRA-ADM-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefNumber(randomRef);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-school-dark via-school-navy to-school-dark text-white p-4 sm:p-5 flex items-center justify-between border-b border-school-gold/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-school-gold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                Online Admission Application (2026/2027)
              </h3>
              <p className="text-[11px] text-school-goldLight">
                Hammadur Rahman Academy Secondary School • Lafia
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
          
          {!isSuccess ? (
            <div>
              {/* Stepper Progress */}
              <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 1 ? 'bg-school-dark text-school-gold border-2 border-school-gold' : 'bg-slate-200 text-slate-500'
                  }`}>
                    1
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Student</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-school-gold' : 'bg-slate-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 2 ? 'bg-school-dark text-school-gold border-2 border-school-gold' : 'bg-slate-200 text-slate-500'
                  }`}>
                    2
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Guardian</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-school-gold' : 'bg-slate-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 3 ? 'bg-school-dark text-school-gold border-2 border-school-gold' : 'bg-slate-200 text-slate-500'
                  }`}>
                    3
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Academics</span>
                </div>
              </div>

              {/* Multi-step Form */}
              <form onSubmit={handleNext} className="space-y-4">
                
                {/* Step 1: Student Biodata */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                      Step 1: Student Information
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ibrahim"
                          value={formData.studentFirstName}
                          onChange={(e) => setFormData({ ...formData, studentFirstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-school-blue/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Surname / Last Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Abubakar"
                          value={formData.studentLastName}
                          onChange={(e) => setFormData({ ...formData, studentLastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-school-blue/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Boarding / Day *</label>
                        <select
                          value={formData.enrollmentType}
                          onChange={(e) => setFormData({ ...formData, enrollmentType: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                        >
                          <option>Boarding Student</option>
                          <option>Day Scholar</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Class Applied For *</label>
                      <select
                        value={formData.classApplied}
                        onChange={(e) => setFormData({ ...formData, classApplied: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                      >
                        <option>Junior Secondary School 1 (JSS1)</option>
                        <option>Junior Secondary School 2 (JSS2 - Transfer)</option>
                        <option>Senior Secondary School 1: Pure Sciences (SSS1)</option>
                        <option>Senior Secondary School 1: Arts & Humanities (SSS1)</option>
                        <option>Senior Secondary School 1: Commercial (SSS1)</option>
                        <option>Senior Secondary School 2: Transfer (SSS2)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">State of Origin</label>
                        <input
                          type="text"
                          value={formData.stateOfOrigin}
                          onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Local Govt Area (LGA)</label>
                        <input
                          type="text"
                          value={formData.lga}
                          onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Parent / Guardian Info */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                      Step 2: Parent / Guardian Details
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent/Guardian Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alhaji Mohammed Danladi"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-school-blue/40"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0803 000 0000"
                          value={formData.parentPhone}
                          onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Parent Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="parent@example.com"
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="e.g. Plot 15, GRA, Lafia, Nasarawa State"
                        value={formData.parentAddress}
                        onChange={(e) => setFormData({ ...formData, parentAddress: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Academic History & Medical */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                      Step 3: Academic Background & Health Notes
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary or Previous School Attended *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Al-Iman International School, Lafia"
                        value={formData.previousSchool}
                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Last Class Completed</label>
                      <input
                        type="text"
                        value={formData.lastClassPassed}
                        onChange={(e) => setFormData({ ...formData, lastClassPassed: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Known Allergies or Medical Conditions (if any)</label>
                      <input
                        type="text"
                        placeholder="e.g. None or Asthma, Peanuts allergy"
                        value={formData.medicalNotes}
                        onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                      <strong>Note:</strong> By submitting this form, you confirm that all information provided is accurate and agree to appear for the screening examination on Saturday, 8th August 2026 at Lafia campus.
                    </div>
                  </div>
                )}

                {/* Step Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-school-gold to-amber-500 hover:from-amber-400 hover:to-school-goldHover text-school-dark text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>{step === 3 ? 'Submit Online Application' : 'Continue to Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Submission Success & Registration Slip */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Welcome to Hammadur Rahman Academy, Lafia. Your provisional application dossier is registered.
                </p>
              </div>

              {/* Official Registration Slip Card */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-left space-y-3 font-mono text-xs max-w-lg mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-school-navy uppercase">Application Reference:</span>
                  <span className="text-sm font-black text-amber-700">{refNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Candidate Name:</span>
                    <strong>{formData.studentFirstName} {formData.studentLastName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Class Applied:</span>
                    <strong>{formData.classApplied}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Status:</span>
                    <strong className="text-emerald-700">{formData.enrollmentType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Parent Phone:</span>
                    <strong>{formData.parentPhone}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-sans">
                  <strong>Screening Exam Venue:</strong> School Examination Hall, HRA Lafia, Nasarawa State.<br />
                  <strong>Exam Date:</strong> Saturday, 8th August 2026 at 8:30 AM prompt.
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-school-navy" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-school-dark hover:bg-school-navy text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
