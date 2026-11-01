import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'school.db');
export const db = new Database(dbPath);

// Enable foreign keys and WAL mode for high performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Helper to hash password with SHA-256
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function initDatabase() {
  // 1. Students Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admission_no TEXT UNIQUE NOT NULL,
      pin TEXT NOT NULL,
      full_name TEXT NOT NULL,
      class_grade TEXT NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT,
      state_of_origin TEXT DEFAULT 'Nasarawa',
      lga TEXT DEFAULT 'Lafia',
      guardian_name TEXT,
      guardian_phone TEXT,
      guardian_email TEXT,
      enrollment_type TEXT DEFAULT 'Boarding Student',
      status TEXT DEFAULT 'Enrolled',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safely auto-migrate any missing columns for students if table previously existed
  const studentCols = (db.prepare("PRAGMA table_info(students)").all() as any[]).map(c => c.name);
  if (!studentCols.includes('dob')) db.exec("ALTER TABLE students ADD COLUMN dob TEXT;");
  if (!studentCols.includes('state_of_origin')) db.exec("ALTER TABLE students ADD COLUMN state_of_origin TEXT DEFAULT 'Nasarawa';");
  if (!studentCols.includes('lga')) db.exec("ALTER TABLE students ADD COLUMN lga TEXT DEFAULT 'Lafia';");
  if (!studentCols.includes('guardian_phone')) db.exec("ALTER TABLE students ADD COLUMN guardian_phone TEXT;");
  if (!studentCols.includes('guardian_email')) db.exec("ALTER TABLE students ADD COLUMN guardian_email TEXT;");
  if (!studentCols.includes('enrollment_type')) db.exec("ALTER TABLE students ADD COLUMN enrollment_type TEXT DEFAULT 'Boarding Student';");
  if (!studentCols.includes('status')) db.exec("ALTER TABLE students ADD COLUMN status TEXT DEFAULT 'Enrolled';");
  db.exec("UPDATE students SET status = 'Enrolled' WHERE status IS NULL;");


  // 2. Student Results Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS student_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admission_no TEXT NOT NULL,
      term TEXT NOT NULL,
      session TEXT NOT NULL,
      attendance TEXT NOT NULL,
      position TEXT NOT NULL,
      average_score REAL NOT NULL,
      principal_remark TEXT NOT NULL,
      promotion_status TEXT DEFAULT 'PROMOTED',
      grades_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admission_no) REFERENCES students(admission_no) ON DELETE CASCADE
    );
  `);

  // 3. Admission Applications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admission_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref_number TEXT UNIQUE NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      class_applied TEXT NOT NULL,
      enrollment_type TEXT NOT NULL,
      state_of_origin TEXT NOT NULL,
      lga TEXT NOT NULL,
      parent_name TEXT NOT NULL,
      parent_phone TEXT NOT NULL,
      parent_email TEXT NOT NULL,
      parent_address TEXT NOT NULL,
      previous_school TEXT NOT NULL,
      last_class_passed TEXT,
      medical_notes TEXT,
      status TEXT DEFAULT 'Pending Review',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Staff & Teachers Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staff_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      qualification TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      date_joined TEXT DEFAULT '2020-09-01',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Academic Classes Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS academic_classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      arm TEXT NOT NULL,
      category TEXT NOT NULL,
      class_teacher TEXT,
      capacity INTEGER DEFAULT 45,
      enrolled_count INTEGER DEFAULT 0
    );
  `);

  // 6. Curriculum Subjects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      is_core INTEGER DEFAULT 1
    );
  `);

  // 7. Fee Schedules Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS fee_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_level TEXT NOT NULL,
      category TEXT NOT NULL,
      term TEXT NOT NULL,
      session TEXT NOT NULL,
      tuition REAL NOT NULL,
      boarding_fee REAL DEFAULT 0,
      ict_lab_fee REAL DEFAULT 0,
      development_levy REAL DEFAULT 0,
      total_amount REAL NOT NULL
    );
  `);

  // 8. Fee Payments & Invoices Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS fee_payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receipt_no TEXT UNIQUE NOT NULL,
      admission_no TEXT NOT NULL,
      student_name TEXT NOT NULL,
      class_level TEXT NOT NULL,
      term TEXT NOT NULL,
      session TEXT NOT NULL,
      amount_paid REAL NOT NULL,
      payment_method TEXT DEFAULT 'Bank Transfer',
      transaction_ref TEXT,
      status TEXT DEFAULT 'Verified',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 9. School Announcements & Bulletins Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date_text TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      badge TEXT,
      urgent INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 10. Contact Inquiries Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      inquiry_type TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 11. Admin Staff Accounts Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT DEFAULT 'Administrator',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 12. Student Attendance Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admission_no TEXT NOT NULL,
      class_name TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'Late', 'Excused')),
      remarks TEXT,
      marked_by TEXT DEFAULT 'Class Master',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admission_no) REFERENCES students(admission_no) ON DELETE CASCADE
    );
  `);

  // 13. Assignments & Homework Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      class_grade TEXT NOT NULL,
      teacher_name TEXT NOT NULL,
      due_date TEXT NOT NULL,
      max_score INTEGER DEFAULT 20,
      instructions TEXT NOT NULL,
      attachments_url TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 14. Assignment Submissions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS assignment_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignment_id INTEGER NOT NULL,
      admission_no TEXT NOT NULL,
      student_name TEXT NOT NULL,
      submission_text TEXT NOT NULL,
      submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      score REAL,
      teacher_feedback TEXT,
      status TEXT DEFAULT 'Submitted',
      FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (admission_no) REFERENCES students(admission_no) ON DELETE CASCADE
    );
  `);

  // 15. CBT Online Exams Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cbt_exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      target_class TEXT NOT NULL,
      duration_minutes INTEGER DEFAULT 30,
      total_questions INTEGER DEFAULT 10,
      pass_percentage REAL DEFAULT 50.0,
      is_active INTEGER DEFAULT 1,
      instructions TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 16. CBT Questions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cbt_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam_id INTEGER NOT NULL,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option TEXT NOT NULL,
      explanation TEXT,
      FOREIGN KEY (exam_id) REFERENCES cbt_exams(id) ON DELETE CASCADE
    );
  `);

  // 17. CBT Student Attempts Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cbt_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam_id INTEGER NOT NULL,
      admission_no TEXT NOT NULL,
      student_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage REAL NOT NULL,
      passed INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (exam_id) REFERENCES cbt_exams(id) ON DELETE CASCADE,
      FOREIGN KEY (admission_no) REFERENCES students(admission_no) ON DELETE CASCADE
    );
  `);

  // 18. Timetables (Daily Class Schedule) Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS timetables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_name TEXT NOT NULL,
      day_of_week TEXT NOT NULL,
      period_number INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      subject TEXT NOT NULL,
      teacher_name TEXT NOT NULL,
      room_venue TEXT NOT NULL DEFAULT 'Main Campus Classroom'
    );
  `);

  // 19. Exam Schedules (WAEC / NECO / Terminal Examination Timetable) Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session TEXT NOT NULL,
      term TEXT NOT NULL,
      exam_type TEXT NOT NULL,
      subject TEXT NOT NULL,
      class_grade TEXT NOT NULL,
      exam_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      venue TEXT NOT NULL
    );
  `);

  // 20. Hostels & Dormitories Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hostels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gender TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      house_master TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `);

  // 21. Hostel Bed Allocations Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hostel_allocations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hostel_id INTEGER NOT NULL,
      admission_no TEXT NOT NULL,
      student_name TEXT NOT NULL,
      room_no TEXT NOT NULL,
      bed_no TEXT NOT NULL,
      session TEXT NOT NULL,
      status TEXT DEFAULT 'Occupied',
      allocated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
      FOREIGN KEY (admission_no) REFERENCES students(admission_no) ON DELETE CASCADE
    );
  `);

  // 22. Audit & Activity Logs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      actor TEXT NOT NULL,
      module TEXT NOT NULL,
      details TEXT,
      ip_address TEXT DEFAULT '127.0.0.1',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDefaultData();
}

// Global Activity Logging Helper
export function logActivity(action: string, actor: string, module: string, details: string = '', ipAddress: string = '127.0.0.1') {
  try {
    const stmt = db.prepare(`
      INSERT INTO audit_logs (action, actor, module, details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(action, actor, module, details, ipAddress);
  } catch (err) {
    console.error('Audit log error:', err);
  }
}

function seedDefaultData() {
  // 1. Seed Initial Students & Results if empty
  const studentsCount = (db.prepare('SELECT COUNT(*) as count FROM students').get() as { count: number }).count;
  if (studentsCount === 0) {
    const insertStudent = db.prepare(`
      INSERT INTO students (
        admission_no, pin, full_name, class_grade, gender, dob, state_of_origin,
        lga, guardian_name, guardian_phone, guardian_email, enrollment_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStudent.run(
      'HRA/2024/048',
      '8842-1903-7521',
      'Mustapha Ibrahim Al-Hassan',
      'Senior Secondary School 2 (Science - Diamond)',
      'Male',
      '2009-04-15',
      'Nasarawa',
      'Lafia',
      'Alhaji Ibrahim M. Al-Hassan',
      '0803 892 4110',
      'alhassan.ibrahim@yahoo.com',
      'Boarding Student',
      'Enrolled'
    );

    insertStudent.run(
      'HRA/2024/015',
      '1122-3344-5566',
      'Amina Bello Suleiman',
      'Senior Secondary School 1 (Arts & Humanities)',
      'Female',
      '2010-09-22',
      'Nasarawa',
      'Keffi',
      'Dr. Suleiman Bello',
      '0802 334 5566',
      'bello.suleiman@gmail.com',
      'Boarding Student',
      'Enrolled'
    );

    insertStudent.run(
      'HRA/2025/102',
      '9988-7766-5544',
      'Farouq Usman Danladi',
      'Junior Secondary School 1 (Gold)',
      'Male',
      '2013-01-18',
      'Nasarawa',
      'Lafia',
      'Mallam Usman Danladi',
      '0815 674 2200',
      'danladi.usman@gmail.com',
      'Day Scholar',
      'Enrolled'
    );

    insertStudent.run(
      'HRA/2025/119',
      '4433-2211-7788',
      'Fatima Zahra Garba',
      'Senior Secondary School 1: Pure Sciences (SSS1)',
      'Female',
      '2011-06-05',
      'Nasarawa',
      'Akwanga',
      'Alhaji Garba Tanko',
      '0807 112 3344',
      'garba.tanko@gmail.com',
      'Boarding Student',
      'Enrolled'
    );

    // Insert Student Result for Mustapha
    const demoGrades = [
      { subject: "English Language & Oral Speech", caScore: 28, examScore: 61, total: 89, grade: "A1", remark: "Distinction" },
      { subject: "General Mathematics & Trigonometry", caScore: 29, examScore: 66, total: 95, grade: "A1", remark: "Exceptional" },
      { subject: "Physics & Applied Mechanics", caScore: 27, examScore: 63, total: 90, grade: "A1", remark: "Distinction" },
      { subject: "Chemistry & Laboratory Practice", caScore: 26, examScore: 60, total: 86, grade: "A1", remark: "Distinction" },
      { subject: "Biology & Cell Genetics", caScore: 28, examScore: 59, total: 87, grade: "A1", remark: "Distinction" },
      { subject: "Further Mathematics", caScore: 25, examScore: 58, total: 83, grade: "B2", remark: "Very Good" },
      { subject: "Islamic Religious Studies (IRS)", caScore: 30, examScore: 65, total: 95, grade: "A1", remark: "Outstanding" },
      { subject: "Civic & Moral Education", caScore: 28, examScore: 60, total: 88, grade: "A1", remark: "Distinction" },
      { subject: "Computer Studies & ICT", caScore: 29, examScore: 64, total: 93, grade: "A1", remark: "Outstanding" }
    ];

    const insertResult = db.prepare(`
      INSERT INTO student_results (
        admission_no, term, session, attendance, position, average_score,
        principal_remark, promotion_status, grades_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertResult.run(
      'HRA/2024/048',
      'Third Term',
      '2025/2026',
      '118 / 120 Days (98.3%)',
      '2nd out of 48 Students',
      89.2,
      'An exceptionally diligent, brilliant, and well-behaved young man. He shows tremendous aptitude in the Sciences and embodies the true spirit of Hammadur Rahman Academy.',
      'PROMOTED TO SSS3',
      JSON.stringify(demoGrades)
    );
  }

  // Ensure Fatima Zahra Garba exists
  const fatimaExists = db.prepare('SELECT id FROM students WHERE admission_no = ?').get('HRA/2025/119');
  if (!fatimaExists) {
    db.prepare(`
      INSERT INTO students (
        admission_no, pin, full_name, class_grade, gender, dob, state_of_origin,
        lga, guardian_name, guardian_phone, guardian_email, enrollment_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'HRA/2025/119',
      '4433-2211-7788',
      'Fatima Zahra Garba',
      'Senior Secondary School 1: Pure Sciences (SSS1)',
      'Female',
      '2011-06-05',
      'Nasarawa',
      'Akwanga',
      'Alhaji Garba Tanko',
      '0807 112 3344',
      'garba.tanko@gmail.com',
      'Boarding Student',
      'Enrolled'
    );
  }


  // 2. Seed Staff Members if empty
  const staffCount = (db.prepare('SELECT COUNT(*) as count FROM staff').get() as { count: number }).count;
  if (staffCount === 0) {
    const insertStaff = db.prepare(`
      INSERT INTO staff (staff_id, full_name, role, department, qualification, phone, email, status, date_joined)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStaff.run('HRA/ST/001', 'Dr. Abdur-Rahman A. Al-Hassan', 'Principal & Director of Studies', 'Executive', 'B.Ed, M.Sc, Ph.D (Curriculum Studies), TRCN', '0803 892 4110', 'principal@hammadurrahman.sch.ng', 'Active', '2011-08-01');
    insertStaff.run('HRA/ST/002', 'Mrs. Halima Gambo Umar', 'Vice Principal (Academic Affairs)', 'Science & Technology', 'B.Sc Chemistry, PGDE, M.Ed', '0815 674 2200', 'vp.academics@hammadurrahman.sch.ng', 'Active', '2014-01-15');
    insertStaff.run('HRA/ST/003', 'Mallam Suleiman Danladi', 'Vice Principal (Administration & Boarding)', 'Humanities', 'B.A. (Ed) English, MPA', '0803 112 9988', 'vp.admin@hammadurrahman.sch.ng', 'Active', '2015-09-01');
    insertStaff.run('HRA/ST/004', 'Ustadh Mukhtar Al-Misri', 'Head of Tahfeez & Islamic Studies', 'Islamic Heritage', 'B.A. Shariah & Arabic (Al-Azhar), Ijazah Hafiz', '0802 554 1122', 'tahfeez@hammadurrahman.sch.ng', 'Active', '2016-03-10');
    insertStaff.run('HRA/ST/005', 'Engr. David O. Emmanuel', 'Head of STEM & Computer CBT Lab', 'Sciences & ICT', 'B.Eng Computer Engr, Cisco CCNA, TRCN', '0809 332 7788', 'ict@hammadurrahman.sch.ng', 'Active', '2018-10-01');
  }

  // 3. Seed Academic Classes if empty
  const classesCount = (db.prepare('SELECT COUNT(*) as count FROM academic_classes').get() as { count: number }).count;
  if (classesCount === 0) {
    const insertClass = db.prepare(`
      INSERT INTO academic_classes (name, arm, category, class_teacher, capacity, enrolled_count)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertClass.run('JSS 1', 'Diamond', 'Junior Secondary', 'Mr. Samuel Kalu', 45, 42);
    insertClass.run('JSS 1', 'Gold', 'Junior Secondary', 'Mrs. Amina Yusuf', 45, 40);
    insertClass.run('JSS 2', 'Diamond', 'Junior Secondary', 'Mallam Yahaya Ahmed', 45, 44);
    insertClass.run('JSS 3', 'Diamond', 'Junior Secondary (BECE)', 'Mr. Victor Okafor', 45, 43);
    insertClass.run('SSS 1', 'Pure Science', 'Senior Secondary', 'Mrs. Halima Gambo', 45, 38);
    insertClass.run('SSS 1', 'Arts & Humanities', 'Senior Secondary', 'Mallam Idris Kassim', 45, 35);
    insertClass.run('SSS 1', 'Commercial', 'Senior Secondary', 'Mr. Joseph Danjuma', 45, 32);
    insertClass.run('SSS 2', 'Science - Diamond', 'Senior Secondary', 'Engr. David Emmanuel', 45, 48);
    insertClass.run('SSS 3', 'Graduating Class (WAEC/NECO)', 'Senior Secondary', 'Dr. Abdur-Rahman Al-Hassan', 45, 46);
  }

  // 4. Seed Curriculum Subjects if empty
  const subjectsCount = (db.prepare('SELECT COUNT(*) as count FROM subjects').get() as { count: number }).count;
  if (subjectsCount === 0) {
    const insertSubject = db.prepare(`
      INSERT INTO subjects (code, title, department, is_core)
      VALUES (?, ?, ?, ?)
    `);

    insertSubject.run('ENG-001', 'English Studies & Oral Speech', 'Languages', 1);
    insertSubject.run('MTH-001', 'General Mathematics & Trigonometry', 'Mathematical Sciences', 1);
    insertSubject.run('PHY-001', 'Physics & Practical Mechanics', 'Pure Sciences', 1);
    insertSubject.run('CHM-001', 'Chemistry & Laboratory Practice', 'Pure Sciences', 1);
    insertSubject.run('BIO-001', 'Biology & Environmental Studies', 'Pure Sciences', 1);
    insertSubject.run('FMT-001', 'Further Mathematics & Calculus', 'Mathematical Sciences', 0);
    insertSubject.run('IRS-001', 'Islamic Religious Studies & Jurisprudence (Fiqh)', 'Humanities', 1);
    insertSubject.run('ARB-001', 'Arabic Language & Classical Grammar (Nahw)', 'Languages', 0);
    insertSubject.run('CIV-001', 'Civic & Leadership Education', 'National Values', 1);
    insertSubject.run('ICT-001', 'Computer Studies, Coding & CBT Practice', 'Technology', 1);
    insertSubject.run('ACC-001', 'Financial Accounting & Bookkeeping', 'Commercial', 0);
    insertSubject.run('ECN-001', 'Economics & Market Dynamics', 'Commercial', 1);
    insertSubject.run('LIT-001', 'Literature-in-English & Creative Writing', 'Humanities', 0);
  }

  // 5. Seed Fee Schedules if empty
  const feesCount = (db.prepare('SELECT COUNT(*) as count FROM fee_schedules').get() as { count: number }).count;
  if (feesCount === 0) {
    const insertFee = db.prepare(`
      INSERT INTO fee_schedules (class_level, category, term, session, tuition, boarding_fee, ict_lab_fee, development_levy, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertFee.run('Junior Secondary (JSS 1 - 3)', 'Day Scholar', 'First Term', '2026/2027', 65000, 0, 15000, 10000, 90000);
    insertFee.run('Junior Secondary (JSS 1 - 3)', 'Boarding Student', 'First Term', '2026/2027', 65000, 110000, 15000, 10000, 200000);
    insertFee.run('Senior Secondary (SSS 1 - 3)', 'Day Scholar', 'First Term', '2026/2027', 75000, 0, 20000, 10000, 105000);
    insertFee.run('Senior Secondary (SSS 1 - 3)', 'Boarding Student', 'First Term', '2026/2027', 75000, 120000, 20000, 10000, 225000);
  }

  // 6. Seed Sample Fee Payment Records if empty
  const paymentsCount = (db.prepare('SELECT COUNT(*) as count FROM fee_payments').get() as { count: number }).count;
  if (paymentsCount === 0) {
    const insertPayment = db.prepare(`
      INSERT INTO fee_payments (receipt_no, admission_no, student_name, class_level, term, session, amount_paid, payment_method, transaction_ref, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPayment.run('HRA-REC-2026-0041', 'HRA/2024/048', 'Mustapha Ibrahim Al-Hassan', 'SSS 2 (Science)', 'Third Term', '2025/2026', 225000, 'Bank Transfer (Zenith Bank Lafia)', 'TXN-998822001', 'Verified');
    insertPayment.run('HRA-REC-2026-0089', 'HRA/2024/015', 'Amina Bello Suleiman', 'SSS 1 (Arts)', 'Third Term', '2025/2026', 225000, 'Online Paystack Direct', 'PSTK-441199332', 'Verified');
  }

  // 7. Seed Announcements if empty
  const announcementsCount = (db.prepare('SELECT COUNT(*) as count FROM announcements').get() as { count: number }).count;
  if (announcementsCount === 0) {
    const insertAnnouncement = db.prepare(`
      INSERT INTO announcements (title, date_text, category, content, badge, urgent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertAnnouncement.run(
      'Entrance Examination & Screening for 2026/2027 Academic Session',
      'July 28, 2026',
      'Admissions',
      'Screening exercise for prospective JSS1 & SSS1 transfer students holds at the Main Campus Auditorium, Lafia. Both Day and Boarding options are available.',
      'Registration Ongoing',
      1
    );

    insertAnnouncement.run(
      '100% Pass Rate Recorded in 2025/2026 WAEC & NECO Examinations',
      'July 15, 2026',
      'Academic',
      'HRA Secondary scholars achieved an outstanding 98.4% distinction rate in Mathematics, English Language, Physics, and Islamic Studies.',
      'Excellence',
      0
    );

    insertAnnouncement.run(
      'Inauguration of the New 120-Seat Solar-Powered Computer-Based Testing (CBT) Center',
      'June 20, 2026',
      'Events',
      'The modern CBT and Robotics laboratory was commissioned by state educational dignitaries to facilitate seamless JAMB/UTME and ICT masterclasses.',
      'Campus Facility',
      0
    );

    insertAnnouncement.run(
      'Annual Inter-House Athletics & Quranic Memorization Competition',
      'August 12, 2026',
      'Events',
      'Parents and guardians are cordially invited to witness sportsmanship and spiritual excellence at the School Sports Pavilion.',
      'Upcoming',
      0
    );
  }

  // 8. Seed Default Admins if empty
  const adminsCount = (db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number }).count;
  if (adminsCount === 0) {
    const insertAdmin = db.prepare(`
      INSERT INTO admins (username, password, full_name, role)
      VALUES (?, ?, ?, ?)
    `);

    insertAdmin.run(
      'admin',
      'admin123',
      'Dr. Abdur-Rahman A. Al-Hassan',
      'Principal & Director of Studies'
    );

    insertAdmin.run(
      'bursar',
      'bursar123',
      'Alhaji Garba Tanko',
      'School Bursar & Chief Accountant'
    );
  }

  // 9. Seed Sample Admission Applications if empty
  const appsCount = (db.prepare('SELECT COUNT(*) as count FROM admission_applications').get() as { count: number }).count;
  if (appsCount === 0) {
    const insertApplication = db.prepare(`
      INSERT INTO admission_applications (
        ref_number, first_name, last_name, gender, dob, class_applied, enrollment_type,
        state_of_origin, lga, parent_name, parent_phone, parent_email, parent_address,
        previous_school, last_class_passed, medical_notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertApplication.run(
      'HRA-ADM-2026-8819',
      'Zainab',
      'Gambo',
      'Female',
      '2014-05-12',
      'Junior Secondary School 1 (JSS1)',
      'Boarding Student',
      'Nasarawa',
      'Lafia',
      'Alhaji Gambo Umar',
      '0803 456 7890',
      'gambo.umar@gmail.com',
      'GRA, Lafia, Nasarawa State',
      'Al-Bayan Academy Lafia',
      'Primary 6',
      'None',
      'Interview Scheduled'
    );

    insertApplication.run(
      'HRA-ADM-2026-4402',
      'Abubakar',
      'Aliyu',
      'Male',
      '2012-08-20',
      'Senior Secondary School 1: Pure Sciences (SSS1)',
      'Day Scholar',
      'Nasarawa',
      'Awe',
      'Hon. Aliyu Tanko',
      '0812 998 1234',
      'tanko.aliyu@yahoo.com',
      'Shendam Road, Lafia',
      'Government Secondary School Lafia',
      'JSS 3 (BECE 9 Distinctions)',
      'None',
      'Pending Review'
    );
  }

  // 10. Seed Hostels if empty
  const hostelsCount = (db.prepare('SELECT COUNT(*) as count FROM hostels').get() as { count: number }).count;
  if (hostelsCount === 0) {
    const insertHostel = db.prepare(`
      INSERT INTO hostels (name, gender, capacity, house_master, contact_phone, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertHostel.run('Sultan Bello Hall', 'Boys', 120, 'Mallam Suleiman Danladi', '0803 112 9988', 'Senior Boys Boarding Hostel with solar-powered study rooms, water treatment, and 24/7 security.');
    insertHostel.run('Usman Dan Fodio Hall', 'Boys', 100, 'Ustadh Mukhtar Al-Misri', '0802 554 1122', 'Junior Boys Boarding Hostel featuring spacious dormitories, Quranic memorization lounge, and dedicated house warden.');
    insertHostel.run("Nana Asma'u Hall", 'Girls', 120, 'Mrs. Halima Gambo Umar', '0815 674 2200', 'Senior Girls Boarding Residence equipped with private courtyard, medical dispensary bay, and air-cooled study facilities.');
    insertHostel.run('Khadijah Bint Khuwaylid Hall', 'Girls', 100, 'Mrs. Amina Yusuf', '0803 777 6655', 'Junior Girls Boarding Hall offering pastoral care, modern sanitary utilities, and round-the-clock matron surveillance.');

    // Seed Sample Allocations
    const insertAlloc = db.prepare(`
      INSERT INTO hostel_allocations (hostel_id, admission_no, student_name, room_no, bed_no, session, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertAlloc.run(1, 'HRA/2024/048', 'Mustapha Ibrahim Al-Hassan', 'B-12', 'Bed 03 (Top)', '2025/2026', 'Occupied');
    insertAlloc.run(3, 'HRA/2024/015', 'Amina Bello Suleiman', 'A-04', 'Bed 01 (Lower)', '2025/2026', 'Occupied');
  }

  // 11. Seed CBT Exams and Questions if empty
  const cbtCount = (db.prepare('SELECT COUNT(*) as count FROM cbt_exams').get() as { count: number }).count;
  if (cbtCount === 0) {
    const insertExam = db.prepare(`
      INSERT INTO cbt_exams (title, subject, target_class, duration_minutes, total_questions, pass_percentage, is_active, instructions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const ex1 = insertExam.run(
      'WAEC/NECO Senior Physics & Mechanics Mock CBT',
      'Physics',
      'Senior Secondary School 2 (Science - Diamond)',
      25,
      5,
      60.0,
      1,
      'Answer all questions. Each correct question awards 20 marks. Time remaining is strictly enforced by the CBT engine.'
    ).lastInsertRowid;

    const insertQ = db.prepare(`
      INSERT INTO cbt_questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertQ.run(
      ex1,
      'Which of the following physical quantities is a scalar quantity?',
      'Velocity',
      'Displacement',
      'Electric Charge',
      'Gravitational Force',
      'C',
      'Electric charge possesses magnitude only with no specific vector direction, making it a scalar quantity.'
    );
    insertQ.run(
      ex1,
      'A body of mass 5kg moving with a velocity of 10m/s has a kinetic energy of:',
      '50 Joules',
      '100 Joules',
      '250 Joules',
      '500 Joules',
      'C',
      'Kinetic Energy = 1/2 * m * v^2 = 0.5 * 5 * (10)^2 = 250 Joules.'
    );
    insertQ.run(
      ex1,
      'The S.I unit of magnetic flux density is the:',
      'Henry',
      'Weber',
      'Tesla',
      'Coulomb',
      'C',
      'The SI unit of magnetic flux density (B) is the Tesla (T), equivalent to one Weber per square meter.'
    );
    insertQ.run(
      ex1,
      'Which law of physics states that energy can neither be created nor destroyed, only transformed?',
      "Newton's First Law",
      'Law of Conservation of Energy',
      "Hooke's Law",
      "Faraday's Law of Induction",
      'B',
      'The principle of conservation of energy establishes that the total energy of an isolated system remains constant.'
    );
    insertQ.run(
      ex1,
      'Through which of the following media do sound waves travel the fastest?',
      'Vacuum',
      'Ambient Air',
      'Fresh Water',
      'Solid Steel',
      'D',
      'Sound travels fastest in dense solids like steel (approx 5,960 m/s) because particles are closely packed.'
    );

    const ex2 = insertExam.run(
      'Islamic Religious Studies & Fiqh General CBT',
      'Islamic Religious Studies',
      'All Classes (JSS1 - SSS3)',
      20,
      5,
      50.0,
      1,
      'Standard Islamic knowledge assessment. Select the best Islamic historical and theological answer.'
    ).lastInsertRowid;

    insertQ.run(
      ex2,
      'How many chapters (Surahs) are compiled in the Holy Quran?',
      '110 Surahs',
      '114 Surahs',
      '120 Surahs',
      '124 Surahs',
      'B',
      'The Holy Quran consists of 114 Surahs, beginning with Surah Al-Fatihah and concluding with Surah An-Nas.'
    );
    insertQ.run(
      ex2,
      'The sacred pilgrimage to the Holy Kaaba in Makkah (Hajj) represents the _____ pillar of Islam.',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
      'D',
      'Hajj is the fifth fundamental pillar of Islam, mandatory once in a lifetime for those physically and financially able.'
    );
    insertQ.run(
      ex2,
      'Which revered companion was elected as the first Caliph (Khalifah) of Islam after the Prophet Muhammad (SAW)?',
      'Umar ibn al-Khattab (RA)',
      'Abu Bakr al-Siddiq (RA)',
      'Uthman ibn Affan (RA)',
      'Ali ibn Abi Talib (RA)',
      'B',
      'Abu Bakr al-Siddiq (RA) was chosen by consensus at Saqifah as the first Rightly Guided Caliph (632-634 CE).'
    );
    insertQ.run(
      ex2,
      'The customary pre-dawn blessing meal consumed before commencing Ramadan fasting is known as:',
      'Iftar',
      'Suhoor',
      'Walimah',
      'Tahajjud',
      'B',
      'Suhoor is the sunnah meal consumed prior to the break of dawn (Fajr) by fasting Muslims.'
    );
    insertQ.run(
      ex2,
      'Which decisive historical battle is explicitly designated in the Quran as Yawm al-Furqan (The Day of Criterion)?',
      'Battle of Badr',
      'Battle of Uhud',
      'Battle of the Trench (Khandaq)',
      'Conquest of Makkah',
      'A',
      'The Battle of Badr (17th Ramadan, 2 AH) is designated in Surah Al-Anfal (8:41) as Yawm al-Furqan.'
    );

    // Seed sample attempt
    const insertAttempt = db.prepare(`
      INSERT INTO cbt_attempts (exam_id, admission_no, student_name, score, total_questions, percentage, passed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertAttempt.run(ex1, 'HRA/2024/048', 'Mustapha Ibrahim Al-Hassan', 5, 5, 100.0, 1);
  }

  // 12. Seed Attendance if empty
  const attCount = (db.prepare('SELECT COUNT(*) as count FROM attendance').get() as { count: number }).count;
  if (attCount === 0) {
    const insertAtt = db.prepare(`
      INSERT INTO attendance (admission_no, class_name, date, status, remarks, marked_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const dates = ['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24'];
    const studentsToMark = [
      { adm: 'HRA/2024/048', cls: 'Senior Secondary School 2 (Science - Diamond)', teacher: 'Engr. David Emmanuel' },
      { adm: 'HRA/2024/015', cls: 'Senior Secondary School 1 (Arts & Humanities)', teacher: 'Mallam Idris Kassim' },
      { adm: 'HRA/2025/102', cls: 'Junior Secondary School 1 (Gold)', teacher: 'Mrs. Amina Yusuf' },
      { adm: 'HRA/2025/119', cls: 'Senior Secondary School 1: Pure Sciences (SSS1)', teacher: 'Mrs. Halima Gambo' },
    ];

    for (const d of dates) {
      for (const st of studentsToMark) {
        const exists = db.prepare('SELECT id FROM students WHERE admission_no = ?').get(st.adm);
        if (exists) {
          const isExcused = st.adm === 'HRA/2025/119' && d === '2026-10-22';
          insertAtt.run(
            st.adm,
            st.cls,
            d,
            isExcused ? 'Excused' : 'Present',
            isExcused ? 'Clinic medical rest check' : 'Regular punctual attendance',
            st.teacher
          );
        }
      }
    }

  }

  // 13. Seed Assignments and Submissions if empty
  const assignCount = (db.prepare('SELECT COUNT(*) as count FROM assignments').get() as { count: number }).count;
  if (assignCount === 0) {
    const insertAssign = db.prepare(`
      INSERT INTO assignments (title, subject, class_grade, teacher_name, due_date, max_score, instructions, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const asg1 = insertAssign.run(
      'Newtonian Mechanics & Harmonic Motion Lab Report',
      'Physics',
      'Senior Secondary School 2 (Science - Diamond)',
      'Engr. David O. Emmanuel',
      '2026-11-15',
      20,
      'Submit a typed or neatly written 3-page laboratory analysis documenting the relationship between pendulum length, period squared, and local acceleration due to gravity (g) measured at Lafia campus.',
      'Active'
    ).lastInsertRowid;

    insertAssign.run(
      'Comparative Analysis of Surah Al-Kahf Moral Lessons',
      'Islamic Religious Studies',
      'Senior Secondary School 2 (Science - Diamond)',
      'Ustadh Mukhtar Al-Misri',
      '2026-11-18',
      20,
      'Examine the four distinct trials presented in Surah Al-Kahf (Faith, Wealth, Knowledge, and Power) and write an essay illustrating their application to contemporary Muslim youth.',
      'Active'
    );

    insertAssign.run(
      'Differential Calculus & Optimization Problems',
      'Further Mathematics',
      'Senior Secondary School 2 (Science - Diamond)',
      'Mr. Victor Okafor',
      '2026-11-20',
      20,
      'Solve Exercises 4.1 to 4.5 in New General Further Mathematics. Show full step-by-step differentiation and identification of local turning points.',
      'Active'
    );

    // Seed sample student submission
    const insertSub = db.prepare(`
      INSERT INTO assignment_submissions (assignment_id, admission_no, student_name, submission_text, score, teacher_feedback, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertSub.run(
      asg1,
      'HRA/2024/048',
      'Mustapha Ibrahim Al-Hassan',
      'Lab Report: Investigation of Simple Harmonic Motion using a 100cm Inextensible String and Brass Bob at Lafia Campus Lab. Calculated g = 9.81 m/s^2 with a standard error of 0.4%. Full graph and tabular records attached.',
      19.5,
      'Exceptional lab execution, rigorous calculation of error margins, and neat graphical representation. Keep up the high standard!',
      'Graded'
    );
  }

  // 14. Seed Timetables if empty
  const timeCount = (db.prepare('SELECT COUNT(*) as count FROM timetables').get() as { count: number }).count;
  if (timeCount === 0) {
    const insertTime = db.prepare(`
      INSERT INTO timetables (class_name, day_of_week, period_number, start_time, end_time, subject, teacher_name, room_venue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const cls = 'Senior Secondary School 2 (Science - Diamond)';
    insertTime.run(cls, 'Monday', 1, '08:00 AM', '08:45 AM', 'General Mathematics', 'Mr. Samuel Kalu', 'Room 201 (Science Block)');
    insertTime.run(cls, 'Monday', 2, '08:45 AM', '09:30 AM', 'Physics & Mechanics', 'Engr. David Emmanuel', 'Physics Laboratory');
    insertTime.run(cls, 'Monday', 3, '09:30 AM', '10:15 AM', 'English Studies & Speech', 'Mallam Suleiman Danladi', 'Language Lab');
    insertTime.run(cls, 'Monday', 4, '10:45 AM', '11:30 AM', 'Chemistry & Lab Work', 'Mrs. Halima Gambo', 'Chemistry Laboratory');
    insertTime.run(cls, 'Monday', 5, '11:30 AM', '12:15 PM', 'Islamic Religious Studies', 'Ustadh Mukhtar Al-Misri', 'Room 201 (Science Block)');
    insertTime.run(cls, 'Monday', 6, '12:15 PM', '01:00 PM', 'Computer Studies & CBT', 'Engr. David Emmanuel', '120-Seat Solar CBT Lab');

    insertTime.run(cls, 'Tuesday', 1, '08:00 AM', '08:45 AM', 'Biology & Genetics', 'Mrs. Halima Gambo', 'Biology Laboratory');
    insertTime.run(cls, 'Tuesday', 2, '08:45 AM', '09:30 AM', 'Further Mathematics', 'Mr. Victor Okafor', 'Room 201 (Science Block)');
    insertTime.run(cls, 'Tuesday', 3, '09:30 AM', '10:15 AM', 'Civic & Leadership', 'Mallam Idris Kassim', 'Room 201 (Science Block)');
    insertTime.run(cls, 'Tuesday', 4, '10:45 AM', '11:30 AM', 'Arabic Grammar (Nahw)', 'Ustadh Mukhtar Al-Misri', 'Room 201 (Science Block)');
    insertTime.run(cls, 'Tuesday', 5, '11:30 AM', '12:15 PM', 'Physics Practical', 'Engr. David Emmanuel', 'Physics Laboratory');
  }

  // 15. Seed Exam Schedules if empty
  const examCount = (db.prepare('SELECT COUNT(*) as count FROM exam_schedules').get() as { count: number }).count;
  if (examCount === 0) {
    const insertExamSch = db.prepare(`
      INSERT INTO exam_schedules (session, term, exam_type, subject, class_grade, exam_date, start_time, end_time, venue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertExamSch.run('2026/2027', 'First Term', 'WAEC/NECO Joint Mock', 'General Mathematics (Paper 1 & 2)', 'SSS 3 (Graduating Class)', '2026-11-23', '08:30 AM', '11:30 AM', 'Main School Auditorium');
    insertExamSch.run('2026/2027', 'First Term', 'WAEC/NECO Joint Mock', 'English Language (Essay & Test of Orals)', 'SSS 3 (Graduating Class)', '2026-11-24', '08:30 AM', '11:30 AM', 'Main School Auditorium');
    insertExamSch.run('2026/2027', 'First Term', 'WAEC/NECO Joint Mock', 'Physics Practical & Alternative B', 'SSS 3 (Graduating Class)', '2026-11-25', '09:00 AM', '11:45 AM', 'Ultra-Modern Physics Lab');
    insertExamSch.run('2026/2027', 'First Term', 'Mid-Term CBT Assessment', 'Computer Studies & JAMB Practice', 'Senior Secondary (SSS 1 - 3)', '2026-11-26', '10:00 AM', '01:00 PM', '120-Seat Solar CBT Lab');
  }

  // 16. Seed Audit Logs if empty
  const logsCount = (db.prepare('SELECT COUNT(*) as count FROM audit_logs').get() as { count: number }).count;
  if (logsCount === 0) {
    logActivity('SYSTEM_INIT', 'System', 'Core', 'Hammadur Rahman Academy School Management Engine and SQLite database initialized successfully.');
    logActivity('RESULT_PUBLISHED', 'admin', 'Results', 'Published 2025/2026 Third Term terminal examination report cards for SSS 2 Science class.');
    logActivity('FEE_VERIFIED', 'bursar', 'Bursary', 'Verified tuition and boarding payment receipt HRA-REC-2026-0041 for student Mustapha Ibrahim Al-Hassan.');
  }
}


