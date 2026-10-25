import type { Announcement, AcademicProgram, Facility, Testimonial, StaffMember, EventItem, StudentResultDemo } from '../types';

export const SCHOOL_INFO = {
  name: "Hammadur Rahman Academy Secondary School",
  shortName: "HRA Secondary",
  arabicName: "أكاديمية حمّاد الرحمن الثانوية",
  motto: "Knowledge, Character and Excellence",
  arabicMotto: "العلم والأخلاق والتميز",
  location: "Plot 14-18, Education Layout, Off Shendam Express Road, Lafia, Nasarawa State, Nigeria",
  poBox: "P.M.B. 104, Lafia, Nasarawa State",
  phone: "+234 (0) 803 892 4110",
  secondaryPhone: "+234 (0) 815 674 2200",
  email: "admissions@hammadurrahman.sch.ng",
  infoEmail: "info@hammadurrahman.sch.ng",
  hours: "Monday – Friday: 7:30 AM – 4:00 PM",
  accreditation: "Approved by Nasarawa State Ministry of Education & Full WAEC, NECO & BECE Accreditation",
  established: "2011",
  examCenterNo: "WAEC: 4260189 / NECO: 025114",
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Entrance Examination & Screening for 2026/2027 Academic Session",
    date: "July 28, 2026",
    category: "Admissions",
    content: "Screening exercise for prospective JSS1 & SSS1 transfer students holds at the Main Campus Auditorium, Lafia. Both Day and Boarding options are available.",
    badge: "Registration Ongoing",
    urgent: true
  },
  {
    id: "ann-2",
    title: "100% Pass Rate Recorded in 2025/2026 WAEC & NECO Examinations",
    date: "July 15, 2026",
    category: "Academic",
    content: "HRA Secondary scholars achieved an outstanding 98.4% distinction rate in Mathematics, English Language, Physics, and Islamic Studies.",
    badge: "Excellence"
  },
  {
    id: "ann-3",
    title: "Inauguration of the New 120-Seat Solar-Powered Computer-Based Testing (CBT) Center",
    date: "June 20, 2026",
    category: "Events",
    content: "The modern CBT and Robotics laboratory was commissioned by state educational dignitaries to facilitate seamless JAMB/UTME and ICT masterclasses.",
    badge: "Campus Facility"
  },
  {
    id: "ann-4",
    title: "Annual Inter-House Athletics & Quranic Memorization Competition",
    date: "August 12, 2026",
    category: "Events",
    content: "Parents and guardians are cordially invited to witness sportsmanship and spiritual excellence at the School Sports Pavilion.",
    badge: "Upcoming"
  }
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: "junior-sec",
    title: "Junior Secondary School (JSS 1 – JSS 3)",
    level: "Basic 7 to Basic 9 (BECE / ERC)",
    description: "A solid preparatory foundation blending the Nigerian Universal Basic Education (UBE) curriculum with contemporary digital literacy and moral character development.",
    iconName: "BookOpen",
    subjects: [
      "English Studies & Literature",
      "Mathematics & Logic",
      "Basic Science & Technology",
      "Information Technology (ICT)",
      "National Values & Civic Education",
      "Pre-Vocational Studies (Agric & Home Eco)",
      "Islamic Religious Studies & Arabic Language",
      "Cultural & Creative Arts",
      "French & Hausa Language"
    ],
    features: [
      "Preparation for State BECE and National NECO BECE",
      "Weekly STEM Hands-on practical lab sessions",
      "Structured Quranic recitation and ethics circle",
      "Continuous student performance monitoring"
    ]
  },
  {
    id: "senior-science",
    title: "Senior Secondary: Pure & Applied Sciences",
    level: "SSS 1 – SSS 3 (WAEC, NECO, JAMB/UTME)",
    description: "Rigorous science program designed to produce future doctors, software engineers, biomedical researchers, and agricultural innovators.",
    iconName: "Atom",
    subjects: [
      "Physics & Practical Mechanics",
      "Chemistry (Inorganic, Organic & Analytical)",
      "Biology & Environmental Ecology",
      "Further Mathematics & Calculus",
      "Technical Drawing (AutoCAD foundation)",
      "Agricultural Science & Practical Farm",
      "Computer Studies & Coding",
      "General Mathematics & English Language"
    ],
    features: [
      "Dedicated state-of-the-art Physics, Chemistry & Biology Labs",
      "Olympiad & STAN competition coaching track",
      "CBT JAMB drill with 30,000+ past questions bank",
      "Field visits and scientific exhibitions"
    ]
  },
  {
    id: "senior-arts",
    title: "Senior Secondary: Arts, Humanities & Islamic Studies",
    level: "SSS 1 – SSS 3 (WAEC, NECO, JAMB/UTME)",
    description: "Cultivating critical thinkers, future diplomats, legal scholars, journalists, and ethical leaders grounded in human heritage and societal stewardship.",
    iconName: "Scroll",
    subjects: [
      "Literature-in-English & Creative Writing",
      "Government & Political Science",
      "History of Nigeria & World Civilizations",
      "Islamic Religious Studies & Jurisprudence (Fiqh)",
      "Classical Arabic Language & Grammar (Nahw)",
      "Civic & Human Rights Education",
      "Economics & Sociological Studies"
    ],
    features: [
      "Press Club, Moot Court & Debating Society",
      "Advanced Arabic morphology & classical poetry",
      "Comprehensive essay and public speaking training",
      "Character mentorship under respected Islamic scholars"
    ]
  },
  {
    id: "senior-commercial",
    title: "Senior Secondary: Commercial & Business Studies",
    level: "SSS 1 – SSS 3 (WAEC, NECO, JAMB/UTME)",
    description: "Preparing tomorrow’s chartered accountants, financial analysts, tech entrepreneurs, and ethical corporate executives.",
    iconName: "TrendingUp",
    subjects: [
      "Financial Accounting & Bookkeeping",
      "Commerce & Global Trade",
      "Economics & Market Dynamics",
      "Marketing & Sales Strategies",
      "Data Processing & Spreadsheets",
      "Office Practice & Business Communication",
      "Mathematics & English Language"
    ],
    features: [
      "Simulation of business ledgers & modern accounting software",
      "Young Entrepreneurs Club & trade fair",
      "Mentorship from certified accountants and bankers",
      "High distinction track record in WAEC financial accounting"
    ]
  },
  {
    id: "tahfeez-program",
    title: "Integrated Tahfeez & Character Mentorship",
    level: "All Levels (Integrated Track)",
    description: "Specialized, optional enrichment curriculum for Quranic memorization, Tajweed mastery, prophetic morals, and leadership ethics.",
    iconName: "HeartHandshake",
    subjects: [
      "Holy Quran Memorization (Hifz)",
      "Tajweed Rules & Phonetics",
      "Hadith Studies (Arba'oon An-Nawawiyyah)",
      "Adab & Islamic Akhlaq (Character building)",
      "Seerah (Prophetic Biography) & Islamic History"
    ],
    features: [
      "Certified Huffadh and Islamic scholars on faculty",
      "Flexible schedule integrated with core academic timetable",
      "Annual Quranic Recitation & Award Banquet",
      "Instilling modesty, honesty, and high civic discipline"
    ]
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "cbt-center",
    name: "120-Seat Digital CBT & ICT Complex",
    category: "Technology",
    description: "Fully air-conditioned, solar-backed computer laboratory configured for online examinations, JAMB simulations, coding lessons, and digital research.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    features: ["120 high-spec networked workstations", "High-speed optical fiber internet", "Dedicated uninterrupted solar inverter system", "Smart interactive projector boards"]
  },
  {
    id: "science-labs",
    name: "Specialized Science Laboratories",
    category: "Academics",
    description: "Three independent, standard laboratories for Physics, Chemistry, and Biology stocked with modern reagent stores, microscopes, and apparatus.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    features: ["Safety fume cupboards & emergency wash stations", "Digital microscopes and analytical balances", "Certified WAEC & NECO inspection rating", "Strict adherence to lab safety protocols"]
  },
  {
    id: "modern-library",
    name: "e-Library & Research Resource Center",
    category: "Academics",
    description: "A serene academic sanctuary combining over 12,000 physical volumes with a subscribed digital repository of international journals and study guides.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    features: ["12,000+ curriculum books & past question archives", "Quiet cubicles for independent scholarship", "e-Reader tablets loaded with encyclopedias", "Dedicated reading coach and research assistant"]
  },
  {
    id: "hostel-facilities",
    name: "Secure Boarding Hostels (Boys & Girls)",
    category: "Student Life",
    description: "Separate, comfortable, and well-supervised residential houses with clean dormitories, study halls, hygienic dining halls, and 24/7 security surveillance.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    features: ["24/7 CCTV surveillance & perimeter security", "Resident house masters and matrons", "Nutritious three-course hygienic meals daily", "Treated borehole water supply and power backup"]
  },
  {
    id: "sports-complex",
    name: "Multi-Purpose Sports Arena",
    category: "Recreation",
    description: "Promoting physical fitness and team spirit through a full football pitch, basketball court, volleyball court, table tennis court, and track athletics.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    features: ["Standard football turf and spectator stands", "Paved basketball and volleyball courts", "Qualified physical & health education coaches", "Annual Inter-House Sports championship"]
  },
  {
    id: "medical-clinic",
    name: "Registered Campus Clinic & Sickbay",
    category: "Health & Welfare",
    description: "Well-equipped healthcare station staffed with registered nurses and an on-call physician for primary medical care and routine health screenings.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    features: ["First aid & emergency response equipment", "Licensed resident nursing personnel", "Partnership with Dalhatu Araf Specialist Hospital (DASH) Lafia", "Routine health and wellness assessments"]
  }
];

export const LEADERSHIP: StaffMember[] = [
  {
    name: "Dr. Abdur-Rahman A. Al-Hassan",
    role: "Principal & Director of Studies",
    qualification: "B.Ed, M.Sc (Educ. Admin), Ph.D (Curriculum Studies), TRCN Certified",
    message: "At Hammadur Rahman Academy Lafia, we do not merely teach subjects; we mold noble character, inspire scientific curiosity, and raise dignified future leaders who can stand shoulder-to-shoulder with their peers globally.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Mrs. Halima Gambo Umar",
    role: "Vice Principal (Academic Affairs)",
    qualification: "B.Sc (Hons) Chemistry, PGDE, M.Ed (Science Education)",
    message: "Our pedagogical approach prioritizes hands-on mastery over rote memorization. Every child is guided by passionate teachers to unlock their highest intellectual potential.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Mallam Suleiman Danladi",
    role: "Vice Principal (Administration & Boarding)",
    qualification: "B.A. (Ed) English, MPA (Public Admin)",
    message: "We maintain a pristine, safe, and disciplined environment where pastoral care ensures every student feels cherished, protected, and motivated to thrive.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Alhaji Garba Tanko",
    role: "Parent of SS3 Scholar (Head Boy 2025)",
    location: "GRA, Lafia, Nasarawa State",
    comment: "The transformation in my son since he joined Hammadur Rahman Academy has been extraordinary. Not only did he clear his WAEC with 7 distinctions, but his respectfulness and daily prayer commitment are a joy to behold.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test-2",
    author: "Dr. (Mrs.) Zainab Mohammed",
    role: "Consultant Physician & Parent",
    location: "Keffi / Abuja Road, Nasarawa State",
    comment: "As a parent in the medical profession, the standard of science laboratories and ICT facilities at HRA Lafia convinced me immediately. The teachers are genuinely dedicated and accessible.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test-3",
    author: "Barrister Kabir S. Aliyu",
    role: "Alumnus (Class of 2018)",
    location: "Currently State Counsel, Ministry of Justice",
    comment: "The debating sessions, mock trials, and Islamic ethics instilled in me at Hammadur Rahman Academy provided the bedrock for my first-class journey in Law school. HRA is a citadel of real champions.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "1st Batch Entrance Examination 2026/2027",
    date: "Saturday, August 8, 2026",
    time: "8:30 AM – 1:00 PM",
    venue: "School Examination Hall, Main Campus, Lafia",
    category: "Admissions",
    description: "Written paper tests in Mathematics, English Studies, and General Aptitude for JSS1, JSS2, and SSS1 entrants."
  },
  {
    id: "ev-2",
    title: "Valedictory Service & Speech and Prize-Giving Day",
    date: "Thursday, September 10, 2026",
    time: "10:00 AM – 3:00 PM",
    venue: "Academy Convocation Ground, Lafia",
    category: "Celebration",
    description: "Honoring the graduating Class of 2026 and rewarding outstanding academic scholars, best teachers, and sport stars."
  },
  {
    id: "ev-3",
    title: "PTA General Assembly & Academic Review Meeting",
    date: "Saturday, September 26, 2026",
    time: "9:00 AM Prompt",
    venue: "Multipurpose Hall, Lafia Campus",
    category: "Parent Relations",
    description: "Interactive session between school management, parents, and guardians on student progress and welfare initiatives."
  }
];

export const DEMO_STUDENT_RESULT: StudentResultDemo = {
  studentName: "Mustapha Ibrahim Al-Hassan",
  admissionNo: "HRA/2024/048",
  classGrade: "Senior Secondary School 2 (Science - Diamond)",
  term: "Third Term (Promotion Assessment)",
  session: "2025 / 2026 Academic Session",
  attendance: "118 / 120 Days (98.3%)",
  position: "2nd out of 48 Students",
  averageScore: 89.2,
  principalRemark: "An exceptionally diligent, brilliant, and well-behaved young man. He shows tremendous aptitude in the Sciences and embodies the true spirit of Hammadur Rahman Academy.",
  grades: [
    { subject: "English Language & Oral Speech", caScore: 28, examScore: 61, total: 89, grade: "A1", remark: "Distinction" },
    { subject: "General Mathematics & Trigonometry", caScore: 29, examScore: 66, total: 95, grade: "A1", remark: "Exceptional" },
    { subject: "Physics & Applied Mechanics", caScore: 27, examScore: 63, total: 90, grade: "A1", remark: "Distinction" },
    { subject: "Chemistry & Laboratory Practice", caScore: 26, examScore: 60, total: 86, grade: "A1", remark: "Distinction" },
    { subject: "Biology & Cell Genetics", caScore: 28, examScore: 59, total: 87, grade: "A1", remark: "Distinction" },
    { subject: "Further Mathematics", caScore: 25, examScore: 58, total: 83, grade: "B2", remark: "Very Good" },
    { subject: "Islamic Religious Studies (IRS)", caScore: 30, examScore: 65, total: 95, grade: "A1", remark: "Outstanding" },
    { subject: "Civic & Moral Education", caScore: 28, examScore: 60, total: 88, grade: "A1", remark: "Distinction" },
    { subject: "Computer Studies & ICT", caScore: 29, examScore: 64, total: 93, grade: "A1", remark: "Outstanding" }
  ]
};

export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Obtain Application Form",
    description: "Complete the online application form here on this website or purchase an application pack at the school admissions office in Lafia."
  },
  {
    step: "02",
    title: "Entrance Examination",
    description: "Sit for the comprehensive entrance test assessing numeracy, literacy, and logical reasoning at the school CBT center or designated centers."
  },
  {
    step: "03",
    title: "Student & Parent Interview",
    description: "An informal interactive session with school counselors to understand the candidate's learning aspirations, values, and boarding preferences."
  },
  {
    step: "04",
    title: "Provisional Admission & Enrollment",
    description: "Successful candidates receive a formal Admission Letter, orientation pack, uniform fitting schedule, and enrollment dossier."
  }
];
