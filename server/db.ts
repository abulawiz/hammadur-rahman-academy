import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'school.db');
export const db = new Database(dbPath);

// Enable foreign keys and WAL mode for high performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

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
      guardian_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

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

  // 4. School Announcements & Bulletins Table
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

  // 5. Contact Inquiries Table
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

  // 6. Admin Staff Table
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
  // Check if students already exist
  const count = db.prepare('SELECT COUNT(*) as count FROM students').get() as { count: number };
  if (count.count === 0) {
    // Insert Demo Student 1
    const insertStudent = db.prepare(`
      INSERT INTO students (admission_no, pin, full_name, class_grade, gender, guardian_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertStudent.run(
      'HRA/2024/048',
      '8842-1903-7521',
      'Mustapha Ibrahim Al-Hassan',
      'Senior Secondary School 2 (Science - Diamond)',
      'Male',
      'Alhaji Ibrahim M. Al-Hassan'
    );

    insertStudent.run(
      'HRA/2024/015',
      '1122-3344-5566',
      'Amina Bello Suleiman',
      'Senior Secondary School 1 (Arts & Humanities)',
      'Female',
      'Dr. Suleiman Bello'
    );

    insertStudent.run(
      'HRA/2025/102',
      '9988-7766-5544',
      'Farouq Usman Danladi',
      'Junior Secondary School 1 (Gold)',
      'Male',
      'Mallam Usman Danladi'
    );

    // Insert Demo Result for Mustapha
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
        admission_no, term, session, attendance, position, average_score, principal_remark, promotion_status, grades_json
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

    // Seed Announcements
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

    // Seed Default Admin
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

    // Seed Sample Admission Applications
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
