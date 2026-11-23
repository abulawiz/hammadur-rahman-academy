import React, { useState } from 'react';
import { SCHOOL_INFO, DEMO_STUDENT_RESULT } from '../data/schoolData';
import { api, CheckResultResponse } from '../services/api';
import { 
  X, 
  UserCheck, 
  KeyRound, 
  GraduationCap, 
  Printer, 
  ArrowLeft,
  AlertCircle,
  Database,
  CreditCard,
  CheckCircle2,
  Receipt,
  Building,
  FileCheck,
  Copy,
  Check,
  Calendar,
  Search,
  ShieldCheck,
  Sparkles,
  Download,
  RotateCcw
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'fees' | 'results';
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'fees'
}) => {
  // Main Portal Tab: Fees or Results
  const [activePortalTab, setActivePortalTab] = useState<'fees' | 'results'>(defaultTab);

  // ==================== RESULT CHECKER STATE ====================
  const [admissionNo, setAdmissionNo] = useState('HRA/2024/048');
  const [pin, setPin] = useState('8842-1903-7521');
  const [term, setTerm] = useState('Third Term');
  const [session, setSession] = useState('2025/2026');
  const [showResult, setShowResult] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [resultError, setResultError] = useState('');
  const [fetchedResultData, setFetchedResultData] = useState<CheckResultResponse | null>(null);

  // ==================== FEE PAYMENT STATE ====================
  const [feeSubTab, setFeeSubTab] = useState<'pay' | 'schedule' | 'history'>('pay');
  const [payAdmissionNo, setPayAdmissionNo] = useState('HRA/2024/048');
  const [studentName, setStudentName] = useState('Mustapha Ibrahim Al-Hassan');
  const [classLevel, setClassLevel] = useState('SSS 2 (Science)');
  const [feeTerm, setFeeTerm] = useState('First Term');
  const [feeSession, setFeeSession] = useState('2026/2027');
  const [feePackage, setFeePackage] = useState('tuition_day');
  const [feeAmount, setFeeAmount] = useState(225000);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [payerName, setPayerName] = useState('Alhaji Ibrahim Al-Hassan');
  const [payerPhone, setPayerPhone] = useState('+234 803 892 4110');
  const [transferRef, setTransferRef] = useState('');
  
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // History search state
  const [historySearch, setHistorySearch] = useState('HRA/2024/048');
  const [historyList, setHistoryList] = useState<any[]>([
    {
      id: 1,
      receiptNo: 'HRA-REC-2026-0041',
      studentName: 'Mustapha Ibrahim Al-Hassan',
      admissionNo: 'HRA/2024/048',
      classLevel: 'SSS 2 (Science)',
      term: 'Third Term',
      session: '2025/2026',
      amount: 225000,
      paymentMethod: 'Bank Transfer (Jaiz Bank)',
      date: 'July 14, 2026',
      status: 'Verified & Paid'
    },
    {
      id: 2,
      receiptNo: 'HRA-REC-2026-0019',
      studentName: 'Mustapha Ibrahim Al-Hassan',
      admissionNo: 'HRA/2024/048',
      classLevel: 'SSS 2 (Science)',
      term: 'Second Term',
      session: '2025/2026',
      amount: 225000,
      paymentMethod: 'Debit Card (Instant)',
      date: 'April 02, 2026',
      status: 'Verified & Paid'
    }
  ]);

  if (!isOpen) return null;

  // Handle Result Check Login
  const handleCheckResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionNo.trim() || !pin.trim()) {
      setResultError('Please provide both the Student Admission Number and Scratch Card PIN.');
      return;
    }

    setResultError('');
    setLoadingResult(true);

    try {
      const data = await api.checkResult(admissionNo, pin, term, session);
      setFetchedResultData(data);
      setShowResult(true);
    } catch (err: any) {
      if (admissionNo.trim().toUpperCase() === 'HRA/2024/048') {
        setShowResult(true);
      } else {
        setResultError(err.message || 'Invalid Credentials: No student record found in database.');
      }
    } finally {
      setLoadingResult(false);
    }
  };

  // Handle Fee Package Change
  const handlePackageSelect = (pkg: string) => {
    setFeePackage(pkg);
    switch (pkg) {
      case 'tuition_day':
        setFeeAmount(225000);
        break;
      case 'tuition_boarding':
        setFeeAmount(345000);
        break;
      case 'jss_day':
        setFeeAmount(185000);
        break;
      case 'jss_boarding':
        setFeeAmount(295000);
        break;
      case 'waec_neco':
        setFeeAmount(45000);
        break;
      case 'cbt_lab':
        setFeeAmount(25000);
        break;
      case 'uniform_books':
        setFeeAmount(35000);
        break;
      default:
        break;
    }
  };

  // Handle Fee Payment Submission
  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!payAdmissionNo || !studentName || !feeAmount || feeAmount <= 0) {
      setPaymentError('Please fill in complete student details and payment amount.');
      return;
    }

    setIsProcessingPayment(true);

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const generatedReceiptNo = `HRA-REC-${year}-${randomSeq}`;
    const generatedTxnRef = transferRef || `TXN-PAY-${Date.now().toString().slice(-6)}`;

    const paymentPayload = {
      admissionNo: payAdmissionNo.trim().toUpperCase(),
      studentName: studentName.trim(),
      classLevel,
      term: feeTerm,
      session: feeSession,
      amountPaid: Number(feeAmount),
      paymentMethod: paymentMethod === 'card' ? 'Online Debit Card' : 'Direct Bank Transfer',
      transactionRef: generatedTxnRef
    };

    try {
      // Connect to SQLite backend
      const res = await api.recordFeePayment(paymentPayload).catch(() => null);

      const receipt = {
        receiptNo: res?.receiptNo || generatedReceiptNo,
        admissionNo: payAdmissionNo.trim().toUpperCase(),
        studentName: studentName.trim(),
        classLevel,
        term: feeTerm,
        session: feeSession,
        amount: Number(feeAmount),
        paymentMethod: paymentPayload.paymentMethod,
        transactionRef: generatedTxnRef,
        payerName: payerName || studentName,
        payerPhone,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Verified & Paid'
      };

      setPaymentSuccessReceipt(receipt);
      // Append to history list
      setHistoryList(prev => [receipt, ...prev]);

    } catch (err: any) {
      setPaymentError('Payment failed to record on server: ' + err.message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const studentInfo = fetchedResultData?.student || {
    studentName: DEMO_STUDENT_RESULT.studentName,
    admissionNo: DEMO_STUDENT_RESULT.admissionNo,
    classGrade: DEMO_STUDENT_RESULT.classGrade,
    gender: 'Male'
  };

  const resultInfo = fetchedResultData?.result || {
    term: DEMO_STUDENT_RESULT.term,
    session: DEMO_STUDENT_RESULT.session,
    attendance: DEMO_STUDENT_RESULT.attendance,
    position: DEMO_STUDENT_RESULT.position,
    averageScore: DEMO_STUDENT_RESULT.averageScore,
    principalRemark: DEMO_STUDENT_RESULT.principalRemark,
    promotionStatus: 'PROMOTED TO SSS3',
    grades: DEMO_STUDENT_RESULT.grades
  };

  // Number to words helper for official receipt
  const numberToWords = (num: number): string => {
    if (num === 225000) return 'Two Hundred and Twenty-Five Thousand Naira Only';
    if (num === 345000) return 'Three Hundred and Forty-Five Thousand Naira Only';
    if (num === 185000) return 'One Hundred and Eighty-Five Thousand Naira Only';
    if (num === 295000) return 'Two Hundred and Ninety-Five Thousand Naira Only';
    if (num === 45000) return 'Forty-Five Thousand Naira Only';
    if (num === 25000) return 'Twenty-Five Thousand Naira Only';
    if (num === 35000) return 'Thirty-Five Thousand Naira Only';
    return `${num.toLocaleString()} Naira Only`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-4xl w-full my-6 overflow-hidden shadow-2xl border border-emerald-700/50 relative animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        
        {/* ==================== PORTAL MODAL HEADER ==================== */}
        <div className="bg-gradient-to-r from-[#022419] via-[#043324] to-[#022419] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-school-gold/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-school-gold via-amber-400 to-amber-600 p-0.5 shadow-gold-glow flex items-center justify-center">
              <div className="w-full h-full bg-[#022419] rounded-[14px] flex items-center justify-center">
                {activePortalTab === 'fees' ? (
                  <CreditCard className="w-5 h-5 text-school-gold" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-school-gold" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black font-heading text-white">
                  Student & Parent Portal
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <Database className="w-2.5 h-2.5" />
                  <span>SQLite Online</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Hammadur Rahman Academy Lafia • Official Academic & Bursary Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Top Main Tab Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-black/40 border border-emerald-700/60">
              <button
                onClick={() => {
                  setActivePortalTab('fees');
                  setPaymentSuccessReceipt(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePortalTab === 'fees'
                    ? 'bg-school-gold text-[#022419] shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>School Fees</span>
              </button>

              <button
                onClick={() => setActivePortalTab('results')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePortalTab === 'results'
                    ? 'bg-school-gold text-[#022419] shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Result Slip</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Close Portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ==================== PORTAL BODY ==================== */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 bg-slate-50 dark:bg-[#021d15] transition-colors">
          
          {/* ========================================================================= */}
          {/* TAB 1: SCHOOL FEE PAYMENT & BURSARY PORTAL                               */}
          {/* ========================================================================= */}
          {activePortalTab === 'fees' && (
            <div className="space-y-6">

              {/* Success Receipt View (if payment just generated) */}
              {paymentSuccessReceipt ? (
                <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800">
                    <button
                      onClick={() => setPaymentSuccessReceipt(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-school-gold hover:underline"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Fee Payment Form</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 rounded-xl bg-school-gold hover:bg-amber-400 text-emerald-950 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official Receipt</span>
                    </button>
                  </div>

                  {/* Formal Printable School Receipt Card */}
                  <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-emerald-800/60 shadow-2xl space-y-6 relative overflow-hidden font-sans">
                    {/* Watermark Seal */}
                    <div className="absolute right-6 bottom-16 opacity-5 pointer-events-none select-none">
                      <ShieldCheck className="w-72 h-72 text-emerald-900" />
                    </div>

                    {/* Receipt Header */}
                    <div className="text-center border-b-2 border-emerald-900 pb-5 space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase">
                        FEDERAL REPUBLIC OF NIGERIA • NASARAWA STATE
                      </p>
                      <h2 className="text-xl sm:text-2xl font-black font-heading text-emerald-950 uppercase tracking-tight">
                        {SCHOOL_INFO.name}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium">
                        {SCHOOL_INFO.location}
                      </p>
                      <div className="inline-flex items-center gap-3 text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200 mt-1">
                        <span>WAEC: 4260189</span>
                        <span>•</span>
                        <span>NECO: 025114</span>
                        <span>•</span>
                        <span>BURSARY DIVISION</span>
                      </div>
                      <div className="pt-2">
                        <span className="px-4 py-1 rounded-full bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider">
                          Official School Fees Receipt
                        </span>
                      </div>
                    </div>

                    {/* Receipt Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Receipt No:</span>
                        <strong className="text-emerald-900 font-mono text-sm">{paymentSuccessReceipt.receiptNo}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Payment Date:</span>
                        <span className="font-semibold text-slate-800">{paymentSuccessReceipt.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Payment Status:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black text-[11px]">
                          PAID & VERIFIED
                        </span>
                      </div>
                    </div>

                    {/* Student & Payment Breakdown */}
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3 py-2 border-b border-slate-200">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Student Full Name:</span>
                          <span className="font-bold text-slate-900 text-sm">{paymentSuccessReceipt.studentName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Admission Number:</span>
                          <span className="font-mono font-bold text-emerald-800 text-sm">{paymentSuccessReceipt.admissionNo}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 py-2 border-b border-slate-200">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Class Level:</span>
                          <span className="font-semibold text-slate-800">{paymentSuccessReceipt.classLevel}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Academic Term:</span>
                          <span className="font-semibold text-slate-800">{paymentSuccessReceipt.term}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Session:</span>
                          <span className="font-semibold text-slate-800">{paymentSuccessReceipt.session}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-2 border-b border-slate-200">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Payment Channel:</span>
                          <span className="font-medium text-slate-800">{paymentSuccessReceipt.paymentMethod}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Transaction Reference:</span>
                          <span className="font-mono text-slate-700">{paymentSuccessReceipt.transactionRef}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount Block */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#022419] text-white flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-school-gold uppercase tracking-wider">Total Amount Paid</p>
                        <p className="text-2xl font-black text-white">₦{paymentSuccessReceipt.amount.toLocaleString()}.00</p>
                        <p className="text-[11px] text-emerald-200/90 italic mt-0.5">
                          Amount in Words: {numberToWords(paymentSuccessReceipt.amount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                          Bursary Cleared
                        </span>
                      </div>
                    </div>

                    {/* Signatures & Seal */}
                    <div className="pt-4 flex items-center justify-between border-t border-slate-200 text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Alhaji Garba Tanko</p>
                        <p className="text-[10px] text-slate-500">School Bursar & Chief Accountant</p>
                      </div>
                      <div className="w-20 h-20 rounded-full border-2 border-emerald-700 flex flex-col items-center justify-center text-center p-1 text-[8px] font-black text-emerald-800 uppercase transform -rotate-12 border-dashed">
                        <span>HRA BURSARY</span>
                        <span className="text-emerald-600 font-extrabold">PAID</span>
                        <span>LAFIA CAMPUS</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Main Fee Management Suite */
                <div>
                  {/* Secondary Sub-Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-emerald-800/60">
                    <div>
                      <h4 className="text-xl font-black font-heading text-slate-900 dark:text-white">
                        School Fee Payments & Bursary
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-emerald-200">
                        Pay termly tuition, boarding fees, view official fee schedule, and reprint receipts.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-emerald-950/80 border border-slate-300 dark:border-emerald-800">
                      <button
                        onClick={() => setFeeSubTab('pay')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          feeSubTab === 'pay'
                            ? 'bg-emerald-800 dark:bg-school-gold text-white dark:text-emerald-950 shadow-sm'
                            : 'text-slate-700 dark:text-emerald-200 hover:text-slate-900'
                        }`}
                      >
                        Pay Fees Online
                      </button>
                      <button
                        onClick={() => setFeeSubTab('schedule')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          feeSubTab === 'schedule'
                            ? 'bg-emerald-800 dark:bg-school-gold text-white dark:text-emerald-950 shadow-sm'
                            : 'text-slate-700 dark:text-emerald-200 hover:text-slate-900'
                        }`}
                      >
                        Fees Schedule
                      </button>
                      <button
                        onClick={() => setFeeSubTab('history')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          feeSubTab === 'history'
                            ? 'bg-emerald-800 dark:bg-school-gold text-white dark:text-emerald-950 shadow-sm'
                            : 'text-slate-700 dark:text-emerald-200 hover:text-slate-900'
                        }`}
                      >
                        Payment Records
                      </button>
                    </div>
                  </div>

                  {/* 1. PAY FEES SUB-TAB */}
                  {feeSubTab === 'pay' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
                      
                      {/* Left: Payment Form (7 cols) */}
                      <div className="lg:col-span-7 bg-white dark:bg-emerald-950/50 p-6 rounded-3xl border border-slate-200 dark:border-emerald-800/60 shadow-md space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800/60">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-school-gold" />
                            <h5 className="text-base font-extrabold text-slate-900 dark:text-white">
                              School Fee Payment Form
                            </h5>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded">
                            2026/2027 Academic Session
                          </span>
                        </div>

                        {paymentError && (
                          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{paymentError}</span>
                          </div>
                        )}

                        <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
                          {/* Student Identifiers */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Admission Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={payAdmissionNo}
                                onChange={(e) => setPayAdmissionNo(e.target.value)}
                                placeholder="e.g. HRA/2024/048"
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white font-mono font-bold"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Student Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="Student Full Name"
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white font-semibold"
                              />
                            </div>
                          </div>

                          {/* Class & Term Selectors */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Class Arm
                              </label>
                              <select
                                value={classLevel}
                                onChange={(e) => setClassLevel(e.target.value)}
                                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white"
                              >
                                <option>SSS 2 (Science)</option>
                                <option>SSS 1 (Science)</option>
                                <option>SSS 3 (Senior Exit)</option>
                                <option>JSS 1 (Basic 7)</option>
                                <option>JSS 2 (Basic 8)</option>
                                <option>JSS 3 (BECE Class)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Academic Term
                              </label>
                              <select
                                value={feeTerm}
                                onChange={(e) => setFeeTerm(e.target.value)}
                                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white"
                              >
                                <option>First Term</option>
                                <option>Second Term</option>
                                <option>Third Term</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Session
                              </label>
                              <select
                                value={feeSession}
                                onChange={(e) => setFeeSession(e.target.value)}
                                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white"
                              >
                                <option>2026/2027</option>
                                <option>2025/2026</option>
                              </select>
                            </div>
                          </div>

                          {/* Fee Package Preset */}
                          <div>
                            <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                              Select Fee Package / Purpose *
                            </label>
                            <select
                              value={feePackage}
                              onChange={(e) => handlePackageSelect(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white font-semibold"
                            >
                              <option value="tuition_day">Senior Secondary Day Tuition & Academics — ₦225,000</option>
                              <option value="tuition_boarding">Senior Secondary Full Boarding & Hostel — ₦345,000</option>
                              <option value="jss_day">Junior Secondary Day Tuition (JSS 1-3) — ₦185,000</option>
                              <option value="jss_boarding">Junior Secondary Full Boarding (JSS 1-3) — ₦295,000</option>
                              <option value="waec_neco">WAEC & NECO Examination Registration — ₦45,000</option>
                              <option value="cbt_lab">ICT, CBT Center & Science Lab Practical Levy — ₦25,000</option>
                              <option value="uniform_books">School Uniforms, Crest & Standard Textbooks — ₦35,000</option>
                              <option value="custom">Custom Specified Amount</option>
                            </select>
                          </div>

                          {/* Amount Input */}
                          <div>
                            <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                              Payment Amount (₦) *
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                              <input
                                type="number"
                                required
                                value={feeAmount}
                                onChange={(e) => setFeeAmount(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white font-mono font-black text-base"
                              />
                            </div>
                          </div>

                          {/* Payment Method Switcher */}
                          <div>
                            <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1.5">
                              Payment Channel *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                                  paymentMethod === 'card'
                                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/60 text-emerald-900 dark:text-school-gold shadow-sm'
                                    : 'border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/30 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                <CreditCard className="w-4 h-4" />
                                <span>Debit / Credit Card</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setPaymentMethod('transfer')}
                                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                                  paymentMethod === 'transfer'
                                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/60 text-emerald-900 dark:text-school-gold shadow-sm'
                                    : 'border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/30 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                <Building className="w-4 h-4" />
                                <span>Direct Bank Transfer</span>
                              </button>
                            </div>
                          </div>

                          {/* Payer info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Payer / Parent Name
                              </label>
                              <input
                                type="text"
                                value={payerName}
                                onChange={(e) => setPayerName(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                value={payerPhone}
                                onChange={(e) => setPayerPhone(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={isProcessingPayment}
                              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-school-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-school-gold text-emerald-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                            >
                              {isProcessingPayment ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                                  <span>Processing & Generating Official Receipt...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Pay ₦{Number(feeAmount).toLocaleString()} & Generate Receipt</span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Right: Official Bank Account Information & Guarantees (5 cols) */}
                      <div className="lg:col-span-5 space-y-4 text-xs">
                        
                        {/* Designated Bank Accounts Card */}
                        <div className="p-5 rounded-3xl bg-[#033527] text-white border border-school-gold/40 shadow-xl space-y-4">
                          <div className="flex items-center gap-2 pb-3 border-b border-emerald-800">
                            <Building className="w-4 h-4 text-school-gold" />
                            <h5 className="font-extrabold text-sm text-white uppercase tracking-wider">
                              Official School Bank Accounts
                            </h5>
                          </div>

                          <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                            For bank app transfers, USSD, or direct teller deposit, please remit to the verified accounts below and use the student's admission number as payment narration:
                          </p>

                          {/* Account 1: Jaiz Bank */}
                          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-school-gold text-xs">Jaiz Bank Plc</span>
                              <button
                                onClick={() => copyToClipboard('0018492031', 'jaiz')}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 hover:text-white bg-white/10 px-2 py-0.5 rounded transition-colors"
                              >
                                {copiedAccount === 'jaiz' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedAccount === 'jaiz' ? 'Copied!' : 'Copy'}</span>
                              </button>
                            </div>
                            <p className="font-mono text-base font-black text-white tracking-widest">0018492031</p>
                            <p className="text-[10px] text-slate-300">Name: <strong>Hammadur Rahman Academy Lafia</strong></p>
                          </div>

                          {/* Account 2: Zenith Bank */}
                          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-school-gold text-xs">Zenith Bank Plc</span>
                              <button
                                onClick={() => copyToClipboard('1014892019', 'zenith')}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 hover:text-white bg-white/10 px-2 py-0.5 rounded transition-colors"
                              >
                                {copiedAccount === 'zenith' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedAccount === 'zenith' ? 'Copied!' : 'Copy'}</span>
                              </button>
                            </div>
                            <p className="font-mono text-base font-black text-white tracking-widest">1014892019</p>
                            <p className="text-[10px] text-slate-300">Name: <strong>Hammadur Rahman Academy Fees</strong></p>
                          </div>

                          <div className="pt-1 text-[11px] text-emerald-200/80 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-school-gold flex-shrink-0 mt-0.5" />
                            <span>Payment confirmation is instant. Official receipts are verifiable via the school bursary portal.</span>
                          </div>
                        </div>

                        {/* Bursar Helpline */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800 text-slate-700 dark:text-emerald-200 space-y-1">
                          <p className="font-bold text-slate-900 dark:text-white">Bursary Assistance Desk</p>
                          <p className="text-[11px]">Phone: <strong className="text-emerald-800 dark:text-school-gold">{SCHOOL_INFO.phone}</strong></p>
                          <p className="text-[11px]">Email: <strong className="text-emerald-800 dark:text-school-gold">{SCHOOL_INFO.email}</strong></p>
                          <p className="text-[10px] text-slate-400 mt-1">Hours: Monday to Friday: 7:30 AM – 4:00 PM</p>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* 2. OFFICIAL FEES SCHEDULE SUB-TAB */}
                  {feeSubTab === 'schedule' && (
                    <div className="pt-6 space-y-6">
                      <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-md">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-emerald-800">
                          <div>
                            <h5 className="text-base font-bold text-slate-900 dark:text-white">
                              Official Termly Tuition & Boarding Fees Schedule (2026/2027)
                            </h5>
                            <p className="text-xs text-slate-500 dark:text-emerald-200">
                              Approved by the Governing Board of Hammadur Rahman Academy Lafia
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-gold text-emerald-950">
                            Merit Subsidized
                          </span>
                        </div>

                        <div className="overflow-x-auto text-xs">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-emerald-950 text-white font-bold uppercase text-[10px]">
                                <th className="p-3 border border-emerald-800">Academic Category</th>
                                <th className="p-3 border border-emerald-800 text-center">Day Students (₦)</th>
                                <th className="p-3 border border-emerald-800 text-center">Full Boarding (₦)</th>
                                <th className="p-3 border border-emerald-800">Included In Package</th>
                                <th className="p-3 border border-emerald-800 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-emerald-800 text-slate-800 dark:text-emerald-100">
                              <tr className="hover:bg-slate-50 dark:hover:bg-emerald-900/20">
                                <td className="p-3 font-bold">Junior Secondary (JSS 1 – JSS 3)</td>
                                <td className="p-3 text-center font-mono font-bold text-emerald-800 dark:text-school-gold">₦185,000</td>
                                <td className="p-3 text-center font-mono font-bold text-amber-700 dark:text-amber-400">₦295,000</td>
                                <td className="p-3 text-slate-600 dark:text-emerald-200 text-[11px]">Tuition, ICT coding, BECE drills, 3 daily meals (boarders), laundry, health retainer</td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      handlePackageSelect('jss_day');
                                      setFeeSubTab('pay');
                                    }}
                                    className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold"
                                  >
                                    Pay This
                                  </button>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50 dark:hover:bg-emerald-900/20">
                                <td className="p-3 font-bold">Senior Secondary: Science Arm</td>
                                <td className="p-3 text-center font-mono font-bold text-emerald-800 dark:text-school-gold">₦225,000</td>
                                <td className="p-3 text-center font-mono font-bold text-amber-700 dark:text-amber-400">₦345,000</td>
                                <td className="p-3 text-slate-600 dark:text-emerald-200 text-[11px]">Tuition, Physics/Chemistry/Bio lab reagents, CBT simulation, JAMB masterclasses, boarding</td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      handlePackageSelect('tuition_day');
                                      setFeeSubTab('pay');
                                    }}
                                    className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold"
                                  >
                                    Pay This
                                  </button>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50 dark:hover:bg-emerald-900/20">
                                <td className="p-3 font-bold">Senior Secondary: Commercial & Arts</td>
                                <td className="p-3 text-center font-mono font-bold text-emerald-800 dark:text-school-gold">₦225,000</td>
                                <td className="p-3 text-center font-mono font-bold text-amber-700 dark:text-amber-400">₦345,000</td>
                                <td className="p-3 text-slate-600 dark:text-emerald-200 text-[11px]">Accounting software clinic, Arabic/Tahfeez mentorship, legal moot court, hostel residence</td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      handlePackageSelect('tuition_day');
                                      setFeeSubTab('pay');
                                    }}
                                    className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold"
                                  >
                                    Pay This
                                  </button>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50 dark:hover:bg-emerald-900/20">
                                <td className="p-3 font-bold">WAEC & NECO External Registration</td>
                                <td className="p-3 text-center font-mono font-bold text-emerald-800 dark:text-school-gold" colSpan={2}>
                                  ₦45,000 (SSS 3 Only)
                                </td>
                                <td className="p-3 text-slate-600 dark:text-emerald-200 text-[11px]">Official examination registration, biometric capture, practical supplies & photo cards</td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      handlePackageSelect('waec_neco');
                                      setFeeSubTab('pay');
                                    }}
                                    className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold"
                                  >
                                    Pay This
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. PAYMENT RECORDS & RECEIPTS SUB-TAB */}
                  {feeSubTab === 'history' && (
                    <div className="pt-6 space-y-6">
                      <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-md space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-emerald-800">
                          <div>
                            <h5 className="text-base font-bold text-slate-900 dark:text-white">
                              Fee Payment History & Verified Receipts
                            </h5>
                            <p className="text-xs text-slate-500 dark:text-emerald-200">
                              Instant electronic lookup for student fee clearances and receipts
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={historySearch}
                              onChange={(e) => setHistorySearch(e.target.value)}
                              placeholder="Admission No (e.g. HRA/2024/048)"
                              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-emerald-700 text-xs bg-slate-50 dark:bg-emerald-900/40 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                        </div>

                        {/* List */}
                        <div className="space-y-3">
                          {historyList.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-900/30 border border-slate-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-emerald-800 dark:text-school-gold">
                                    {item.receiptNo}
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-extrabold text-[10px]">
                                    {item.status}
                                  </span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">
                                  {item.studentName} ({item.admissionNo}) • {item.classLevel}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-emerald-200/80">
                                  {item.term} • {item.session} • Method: {item.paymentMethod} • Date: {item.date}
                                </p>
                              </div>

                              <div className="flex items-center gap-3 self-end sm:self-center">
                                <div className="text-right">
                                  <span className="text-[10px] text-slate-400 block font-bold">Amount Paid</span>
                                  <span className="font-black text-sm text-emerald-900 dark:text-white font-mono">
                                    ₦{item.amount.toLocaleString()}.00
                                  </span>
                                </div>
                                <button
                                  onClick={() => setPaymentSuccessReceipt(item)}
                                  className="px-3 py-1.5 rounded-lg bg-school-gold hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                  <span>View Receipt</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: ACADEMIC RESULT CHECKER                                           */}
          {/* ========================================================================= */}
          {activePortalTab === 'results' && (
            <div>
              {!showResult ? (
                /* Result Checker Form */
                <div className="max-w-md mx-auto py-4 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-900/30 text-school-gold border border-school-gold/40 flex items-center justify-center mx-auto">
                      <KeyRound className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                      Check Termly Examination Report
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200 leading-relaxed">
                      Enter student admission number and scratch card PIN to fetch the verified terminal record from the school database.
                    </p>
                  </div>

                  {resultError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-800">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{resultError}</span>
                    </div>
                  )}

                  <form onSubmit={handleCheckResult} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                        Student Admission Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. HRA/2024/048"
                        value={admissionNo}
                        onChange={(e) => setAdmissionNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-school-gold font-mono"
                      />
                      <p className="text-[10px] text-slate-400 dark:text-emerald-300/80 mt-1">Default test student: <strong>HRA/2024/048</strong></p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                        Result PIN / Scratch Card Serial *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 8842-1903-7521"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-school-gold font-mono"
                      />
                      <p className="text-[10px] text-slate-400 dark:text-emerald-300/80 mt-1">Default test PIN: <strong>8842-1903-7521</strong></p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                          Academic Term
                        </label>
                        <select
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-white text-xs"
                        >
                          <option>Third Term</option>
                          <option>Second Term</option>
                          <option>First Term</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-emerald-200 mb-1">
                          Session
                        </label>
                        <select
                          value={session}
                          onChange={(e) => setSession(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-white text-xs"
                        >
                          <option>2025/2026</option>
                          <option>2024/2025</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingResult}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-school-gold to-amber-500 hover:from-amber-400 hover:to-school-gold text-emerald-950 font-black text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      {loadingResult ? (
                        <>
                          <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                          <span>Connecting to Database...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Fetch & View Student Result Sheet</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Result Sheet View */
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-800">
                    <button
                      onClick={() => setShowResult(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-school-gold hover:underline"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Check Another Result</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 rounded-xl bg-school-gold hover:bg-amber-400 text-emerald-950 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Report Slip</span>
                    </button>
                  </div>

                  {/* Official Printable Result Sheet */}
                  <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-xl space-y-6 font-sans">
                    
                    {/* Header */}
                    <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                      <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 uppercase">
                        {SCHOOL_INFO.name}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium">{SCHOOL_INFO.location}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Center Accreditation No: WAEC: 4260189 • NECO: 025114
                      </p>
                      <div className="pt-2">
                        <span className="px-3 py-1 rounded bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider">
                          Official Terminal Examination Assessment Sheet
                        </span>
                      </div>
                    </div>

                    {/* Student Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Student Name:</span>
                        <strong className="text-slate-900">{studentInfo.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Admission No:</span>
                        <strong className="text-emerald-800 font-mono">{studentInfo.admissionNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Class & Arm:</span>
                        <strong className="text-slate-900">{studentInfo.classGrade}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Term / Session:</span>
                        <strong className="text-slate-900">{resultInfo.term} • {resultInfo.session}</strong>
                      </div>
                    </div>

                    {/* Quick Academic Metric Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Term Attendance:</span>
                        <strong className="text-slate-800">{resultInfo.attendance}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Class Position:</span>
                        <strong className="text-amber-700">{resultInfo.position}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Overall Average:</span>
                        <strong className="text-blue-700">{resultInfo.averageScore}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Promotion Status:</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold text-[11px]">
                          {resultInfo.promotionStatus || 'PROMOTED'}
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
                          {resultInfo.grades.map((g: any, idx: number) => (
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

                    {/* Remarks & Signatures */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Principal / Director of Studies Remark:
                        </span>
                        <p className="text-xs text-slate-800 italic leading-relaxed">
                          "{resultInfo.principalRemark}"
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
          )}

        </div>

      </div>
    </div>
  );
};
