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

  seedDefaultData();
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
}

