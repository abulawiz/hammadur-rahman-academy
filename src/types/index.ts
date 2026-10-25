export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Academic' | 'Events' | 'Examination';
  content: string;
  badge?: string;
  urgent?: boolean;
}

export interface AcademicProgram {
  id: string;
  title: string;
  level: string;
  description: string;
  iconName: string;
  subjects: string[];
  features: string[];
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface StaffMember {
  name: string;
  role: string;
  qualification: string;
  message: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  description: string;
}

export interface SubjectGrade {
  subject: string;
  caScore: number;
  examScore: number;
  total: number;
  grade: string;
  remark: string;
}

export interface StudentResultDemo {
  studentName: string;
  admissionNo: string;
  classGrade: string;
  term: string;
  session: string;
  attendance: string;
  position: string;
  averageScore: number;
  principalRemark: string;
  grades: SubjectGrade[];
}
