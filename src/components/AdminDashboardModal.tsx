import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  X, 
  ShieldCheck, 
  Users, 
  FileText, 
  Bell, 
  Mail, 
  Lock, 
  LogOut, 
  CheckCircle, 
  Trash2, 
  Plus, 
  AlertCircle,
  Check,
  GraduationCap,
  Briefcase,
  CreditCard,
  KeyRound,
  RotateCw,
  Search,
  BookOpen
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'applications' | 'staff' | 'fees' | 'announcements' | 'inquiries'>('overview');

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [feeSchedules, setFeeSchedules] = useState<any[]>([]);
  const [feePayments, setFeePayments] = useState<any[]>([]);

  // Modals & sub-forms
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    classGrade: 'Junior Secondary School 1 (JSS1)',
    gender: 'Male',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    enrollmentType: 'Boarding Student'
  });

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({
    fullName: '',
    role: 'Subject Teacher',
    department: 'Pure Sciences',
    qualification: 'B.Sc (Ed) Physics, TRCN',
    phone: '',
    email: ''
  });

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Admissions',
    content: '',
    badge: 'Official',
    urgent: false
  });
  const [noticeSuccess, setNoticeSuccess] = useState('');

  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    admissionNo: 'HRA/2024/048',
    studentName: 'Mustapha Ibrahim Al-Hassan',
    classLevel: 'SSS 2 (Science)',
    term: 'First Term',
    session: '2026/2027',
    amountPaid: 225000,
    paymentMethod: 'Bank Transfer'
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const data = await api.adminLogin(username, password);
      setIsAuthenticated(true);
      setAdminUser(data.admin);
      loadDashboardData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator login.');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [statsData, studentsData, appsData, staffData, noticesData, inqsData, feeSchedData, paymentsData] = await Promise.all([
        api.getAdminStats(),
        api.getStudents(studentSearch),
        api.getApplications(),
        api.getStaff(),
        api.getAnnouncements(),
        api.getInquiries(),
        api.getFeeSchedules(),
        api.getFeePayments()
      ]);
      setStats(statsData);
      setStudents(studentsData);
      setApplications(appsData);
      setStaffList(staffData);
      setAnnouncements(noticesData);
      setInquiries(inqsData);
      setFeeSchedules(feeSchedData);
      setFeePayments(paymentsData.payments || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  // Student Actions
  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.enrollStudent(newStudent);
      setShowAddStudent(false);
      setNewStudent({
        fullName: '',
        classGrade: 'Junior Secondary School 1 (JSS1)',
        gender: 'Male',
        guardianName: '',
        guardianPhone: '',
        guardianEmail: '',
        enrollmentType: 'Boarding Student'
      });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRegeneratePin = async (id: number) => {
    try {
      const res = await api.regenerateStudentPin(id);
      alert(`Success: New scratch card PIN issued: ${res.newPin}`);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;
    try {
      await api.deleteStudent(id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Staff Actions
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addStaff(newStaff);
      setShowAddStaff(false);
      setNewStaff({
        fullName: '',
        role: 'Subject Teacher',
        department: 'Pure Sciences',
        qualification: 'B.Sc (Ed) Physics, TRCN',
        phone: '',
        email: ''
      });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Application Actions
  const handleUpdateAppStatus = async (id: number, newStatus: string) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Inquiry Actions
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      await api.updateInquiryStatus(id, status);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Announcement Actions
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    try {
      await api.createAnnouncement(newNotice);
      setNoticeSuccess('Announcement published to live database!');
      setNewNotice({ title: '', category: 'Admissions', content: '', badge: 'Official', urgent: false });
      loadDashboardData();
      setTimeout(() => setNoticeSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await api.deleteAnnouncement(id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Payment Actions
  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.recordFeePayment(newPayment);
      setShowAddPayment(false);
      loadDashboardData();
      alert('Fee payment recorded and official receipt generated!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-5xl w-full my-6 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-school-dark via-school-navy to-school-dark text-white p-4 sm:p-5 flex items-center justify-between border-b border-school-gold/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-school-gold/20 border border-school-gold/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-school-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  HRA School Administrative Portal
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                  SQLite Live Backend
                </span>
              </div>
              <p className="text-[11px] text-school-goldLight">
                Hammadur Rahman Academy • Lafia, Nasarawa State
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-red-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Login View */
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-school-navy/10 dark:bg-white/10 text-school-navy dark:text-school-gold flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                  Staff & Administrative Sign In
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage students, results, admissions, faculty, fees ledger, and bulletins.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-school-blue/40"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Default demo: <strong>admin</strong> or <strong>bursar</strong></p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-school-blue/40"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Default password: <strong>admin123</strong> or <strong>bursar123</strong></p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:text-school-dark text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Complete Dashboard View */
            <div className="space-y-6">
              
              {/* Top Admin Info & Navigation Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Welcome, {adminUser?.fullName}
                  </h4>
                  <p className="text-xs text-school-blue dark:text-school-gold font-semibold">
                    {adminUser?.role} • Lafia Campus Headquarters
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'overview'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'students'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Students ({stats?.enrolledStudents || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'applications'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <span>Admissions</span>
                    {stats?.pendingApplications > 0 && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('staff')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'staff'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Staff ({stats?.activeStaff || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('fees')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'fees'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Bursary & Fees
                  </button>
                  <button
                    onClick={() => setActiveTab('announcements')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'announcements'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Bulletins
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-school-dark dark:bg-school-gold text-white dark:text-school-dark shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <span>Inquiries</span>
                    {stats?.unreadInquiries > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px]">
                        {stats.unreadInquiries}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-bold uppercase">Enrolled Students</span>
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {stats?.enrolledStudents || 0}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Active in SQLite Database
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-bold uppercase">Applicants</span>
                        <Users className="w-4 h-4 text-school-blue" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {stats?.totalApplications || 0}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-school-gold font-semibold mt-1">
                        {stats?.pendingApplications || 0} Pending Review
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-bold uppercase">Faculty & Staff</span>
                        <Briefcase className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {stats?.activeStaff || 0}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        TRCN Qualified Teachers
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-bold uppercase">Fee Collections</span>
                        <CreditCard className="w-4 h-4 text-school-gold" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        ₦{(stats?.totalFeesCollected || 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        Verified Bank Receipts
                      </div>
                    </div>
                  </div>

                  {/* Quick Shortcut Buttons */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Quick Administrative Workflows
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => { setActiveTab('students'); setShowAddStudent(true); }}
                        className="px-3.5 py-2 rounded-xl bg-school-dark hover:bg-school-navy text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-school-gold" />
                        <span>Enroll New Student</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('announcements'); }}
                        className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Post Bulletin Notice</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('fees'); setShowAddPayment(true); }}
                        className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Record Bank Fee Receipt</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('staff'); setShowAddStaff(true); }}
                        className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-school-gold" />
                        <span>Add Teacher</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STUDENTS MANAGEMENT */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search student by name, admission no..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && loadDashboardData()}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>
                      <button
                        onClick={loadDashboardData}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                      >
                        Search
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAddStudent(!showAddStudent)}
                      className="px-3 py-1.5 rounded-xl bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:text-school-dark text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Enroll Student</span>
                    </button>
                  </div>

                  {/* Add Student Sub-Form */}
                  {showAddStudent && (
                    <form onSubmit={handleEnrollStudent} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                      <h6 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                        Enroll New Student into SQLite Database
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Full Name (e.g. Aliyu Danjuma)"
                          value={newStudent.fullName}
                          onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <select
                          value={newStudent.classGrade}
                          onChange={(e) => setNewStudent({ ...newStudent, classGrade: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option>Junior Secondary School 1 (JSS1)</option>
                          <option>Junior Secondary School 2 (JSS2)</option>
                          <option>Junior Secondary School 3 (JSS3)</option>
                          <option>Senior Secondary School 1: Pure Sciences (SSS1)</option>
                          <option>Senior Secondary School 1: Arts & Humanities (SSS1)</option>
                          <option>Senior Secondary School 1: Commercial (SSS1)</option>
                          <option>Senior Secondary School 2 (Science - Diamond)</option>
                          <option>Senior Secondary School 3 (WAEC/NECO)</option>
                        </select>
                        <select
                          value={newStudent.gender}
                          onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Parent / Guardian Name"
                          value={newStudent.guardianName}
                          onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="tel"
                          placeholder="Guardian Phone Number"
                          value={newStudent.guardianPhone}
                          onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <select
                          value={newStudent.enrollmentType}
                          onChange={(e) => setNewStudent({ ...newStudent, enrollmentType: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option>Boarding Student</option>
                          <option>Day Scholar</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddStudent(false)}
                          className="px-3 py-1.5 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                        >
                          Save & Issue Scratch Card PIN
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Students Table */}
                  <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-3">Admission No</th>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Class Grade</th>
                          <th className="p-3">Scratch Card PIN</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {students.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="p-3 font-mono font-bold text-school-navy dark:text-school-gold">
                              {st.admission_no}
                            </td>
                            <td className="p-3 font-semibold text-slate-900 dark:text-white">
                              {st.full_name}
                              <p className="text-[10px] text-slate-400">{st.gender} • {st.enrollment_type}</p>
                            </td>
                            <td className="p-3 text-slate-700 dark:text-slate-300">
                              {st.class_grade}
                            </td>
                            <td className="p-3 font-mono text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                              {st.pin}
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {st.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleRegeneratePin(st.id)}
                                  className="p-1 rounded text-school-blue dark:text-school-gold hover:bg-slate-100 dark:hover:bg-slate-800"
                                  title="Issue New PIN"
                                >
                                  <RotateCw className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(st.id)}
                                  className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                  title="Delete Student"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: ADMISSIONS APPLICATIONS */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      All Admission Dossiers ({applications.length})
                    </h5>
                    <button
                      onClick={loadDashboardData}
                      className="text-xs text-school-blue dark:text-school-gold hover:underline font-semibold"
                    >
                      Refresh Data
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-3">Ref Code</th>
                          <th className="p-3">Candidate</th>
                          <th className="p-3">Class</th>
                          <th className="p-3">Guardian & Phone</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Change Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="p-3 font-mono font-bold text-school-navy dark:text-school-gold">
                              {app.ref_number}
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-slate-900 dark:text-white">
                                {app.first_name} {app.last_name}
                              </p>
                              <p className="text-[10px] text-slate-400">{app.gender} • {app.lga}, {app.state_of_origin}</p>
                            </td>
                            <td className="p-3 text-slate-700 dark:text-slate-300">
                              {app.class_applied}
                            </td>
                            <td className="p-3">
                              <p className="font-semibold text-slate-900 dark:text-white">{app.parent_name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{app.parent_phone}</p>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                                app.status === 'Interview Scheduled' ? 'bg-sky-100 text-sky-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                              >
                                <option>Pending Review</option>
                                <option>Interview Scheduled</option>
                                <option>Approved</option>
                                <option>Declined</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: STAFF DIRECTORY */}
              {activeTab === 'staff' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Teaching & Administrative Faculty ({staffList.length})
                    </h5>
                    <button
                      onClick={() => setShowAddStaff(!showAddStaff)}
                      className="px-3 py-1.5 rounded-xl bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:text-school-dark text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Staff Member</span>
                    </button>
                  </div>

                  {showAddStaff && (
                    <form onSubmit={handleAddStaff} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                      <h6 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                        Add New Faculty Member
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Staff Full Name"
                          value={newStaff.fullName}
                          onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Role (e.g. Head of Sciences)"
                          value={newStaff.role}
                          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <select
                          value={newStaff.department}
                          onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option>Pure Sciences</option>
                          <option>Humanities & Arts</option>
                          <option>Islamic Heritage</option>
                          <option>Commercial</option>
                          <option>Technology & CBT</option>
                          <option>Executive</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Qualifications (e.g. B.Sc, TRCN)"
                          value={newStaff.qualification}
                          onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddStaff(false)}
                          className="px-3 py-1.5 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                        >
                          Save Staff Record
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-3">Staff ID</th>
                          <th className="p-3">Name & Role</th>
                          <th className="p-3">Department</th>
                          <th className="p-3">Qualifications</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {staffList.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="p-3 font-mono font-bold text-school-navy dark:text-school-gold">
                              {st.staff_id}
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-slate-900 dark:text-white">{st.full_name}</p>
                              <p className="text-[10px] text-school-blue dark:text-school-gold">{st.role}</p>
                            </td>
                            <td className="p-3 text-slate-700 dark:text-slate-300">{st.department}</td>
                            <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[10px]">{st.qualification}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {st.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: BURSARY & FEES */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  {/* Fee Schedules Card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        Approved 2026/2027 Termly Fee Schedules
                      </h5>
                      <button
                        onClick={() => setShowAddPayment(!showAddPayment)}
                        className="px-3 py-1.5 rounded-xl bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:text-school-dark text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Record Bank Payment</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {feeSchedules.map((fee) => (
                        <div key={fee.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{fee.class_level}</p>
                          <span className="text-[10px] font-semibold text-school-blue dark:text-school-gold">{fee.category}</span>
                          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                            <p className="text-slate-500">Tuition: ₦{fee.tuition.toLocaleString()}</p>
                            {fee.boarding_fee > 0 && <p className="text-slate-500">Boarding: ₦{fee.boarding_fee.toLocaleString()}</p>}
                            <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-1">Total: ₦{fee.total_amount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Payment Form */}
                  {showAddPayment && (
                    <form onSubmit={handleRecordPayment} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                      <h6 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                        Record Bank Fee Deposit / Receipt
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Admission No (e.g. HRA/2024/048)"
                          value={newPayment.admissionNo}
                          onChange={(e) => setNewPayment({ ...newPayment, admissionNo: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Student Full Name"
                          value={newPayment.studentName}
                          onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Amount Paid (₦)"
                          value={newPayment.amountPaid}
                          onChange={(e) => setNewPayment({ ...newPayment, amountPaid: Number(e.target.value) })}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddPayment(false)}
                          className="px-3 py-1.5 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                        >
                          Generate Official Receipt
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Payment Ledger Table */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Verified Fee Payments Ledger ({feePayments.length})
                    </h5>

                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="p-3">Receipt No</th>
                            <th className="p-3">Admission No</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Amount Paid</th>
                            <th className="p-3">Method</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {feePayments.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                              <td className="p-3 font-mono font-bold text-school-navy dark:text-school-gold">
                                {p.receipt_no}
                              </td>
                              <td className="p-3 font-mono">{p.admission_no}</td>
                              <td className="p-3 font-semibold text-slate-900 dark:text-white">{p.student_name}</td>
                              <td className="p-3 font-black text-emerald-700 dark:text-emerald-400">
                                ₦{Number(p.amount_paid).toLocaleString()}
                              </td>
                              <td className="p-3 text-slate-500">{p.payment_method}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Create Notice Form (5 cols) */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-school-gold" />
                      <span>Publish New Announcement</span>
                    </h5>

                    {noticeSuccess && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>{noticeSuccess}</span>
                      </div>
                    )}

                    <form onSubmit={handleCreateNotice} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Notice Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Resumption Date Confirmed"
                          value={newNotice.title}
                          onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Category
                          </label>
                          <select
                            value={newNotice.category}
                            onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                            className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                          >
                            <option>Admissions</option>
                            <option>Academic</option>
                            <option>Events</option>
                            <option>Examination</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Badge Label
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Official / Urgent"
                            value={newNotice.badge}
                            onChange={(e) => setNewNotice({ ...newNotice, badge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Bulletin Body / Content *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Enter details for students, parents, and visitors..."
                          value={newNotice.content}
                          onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="urgentCheck"
                          checked={newNotice.urgent}
                          onChange={(e) => setNewNotice({ ...newNotice, urgent: e.target.checked })}
                          className="rounded text-school-navy"
                        />
                        <label htmlFor="urgentCheck" className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                          Mark as Urgent Announcement
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-school-dark hover:bg-school-navy dark:bg-school-gold dark:text-school-dark text-white text-xs font-bold transition-colors"
                      >
                        Publish to School Bulletin
                      </button>
                    </form>
                  </div>

                  {/* List of Active Notices (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Live Bulletins in Database ({announcements.length})
                    </h5>

                    <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                      {announcements.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-school-navy text-white">
                                {item.category}
                              </span>
                              {item.urgent === 1 && (
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-100 text-red-700">
                                  Urgent
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">{item.date_text}</span>
                            </div>
                            <h6 className="text-xs font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </h6>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                              {item.content}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteNotice(item.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Inquiries from Contact Form ({inquiries.length})
                    </h5>
                  </div>

                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white">{inq.full_name}</span>
                            <span className="text-[11px] text-slate-500 ml-2">({inq.email} • {inq.phone})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inq.status === 'Replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {inq.status}
                            </span>
                            {inq.status !== 'Replied' && (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, 'Replied')}
                                className="text-[11px] font-bold text-school-blue dark:text-school-gold hover:underline"
                              >
                                Mark Replied
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl">
                          "{inq.message}"
                        </p>
                      </div>
                    ))}
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
