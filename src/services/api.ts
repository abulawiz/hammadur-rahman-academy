// Frontend API Service Layer connecting to Express + SQLite backend

const API_BASE = '/api';

export interface CheckResultResponse {
  success: boolean;
  student: {
    admissionNo: string;
    studentName: string;
    classGrade: string;
    gender: string;
    guardianName?: string;
  };
  result: {
    term: string;
    session: string;
    attendance: string;
    position: string;
    averageScore: number;
    principalRemark: string;
    promotionStatus?: string;
    grades: Array<{
      subject: string;
      caScore: number;
      examScore: number;
      total: number;
      grade: string;
      remark: string;
    }>;
  };
}

export const api = {
  // 1. Results API
  async checkResult(admissionNo: string, pin: string, term?: string, session?: string): Promise<CheckResultResponse> {
    const res = await fetch(`${API_BASE}/results/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admissionNo, pin, term, session }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to check student result.');
    }
    return data;
  },

  async getAllResults() {
    const res = await fetch(`${API_BASE}/results/all`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch results.');
    return data;
  },

  async createResult(resultPayload: any) {
    const res = await fetch(`${API_BASE}/results/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultPayload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to publish result.');
    return data;
  },

  // 2. Students API
  async getStudents(search?: string, classGrade?: string, status?: string) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (classGrade && classGrade !== 'All') params.append('classGrade', classGrade);
    if (status && status !== 'All') params.append('status', status);

    const res = await fetch(`${API_BASE}/students?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch students.');
    return data.students;
  },

  async enrollStudent(studentData: any) {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to enroll student.');
    return data;
  },

  async regenerateStudentPin(id: number) {
    const res = await fetch(`${API_BASE}/students/${id}/regenerate-pin`, {
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to regenerate PIN.');
    return data;
  },

  async deleteStudent(id: number) {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete student.');
    return data;
  },

  // 3. Staff & Faculty API
  async getStaff(department?: string) {
    const params = new URLSearchParams();
    if (department && department !== 'All') params.append('department', department);

    const res = await fetch(`${API_BASE}/staff?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch staff.');
    return data.staff;
  },

  async addStaff(staffData: any) {
    const res = await fetch(`${API_BASE}/staff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add staff member.');
    return data;
  },

  // 4. Academics (Classes & Subjects) API
  async getClasses() {
    const res = await fetch(`${API_BASE}/academics/classes`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch classes.');
    return data.classes;
  },

  async getSubjects(department?: string) {
    const params = new URLSearchParams();
    if (department && department !== 'All') params.append('department', department);

    const res = await fetch(`${API_BASE}/academics/subjects?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch subjects.');
    return data.subjects;
  },

  // 5. Fees & Bursary API
  async getFeeSchedules() {
    const res = await fetch(`${API_BASE}/fees/schedules`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch fee schedules.');
    return data.schedules;
  },

  async getFeePayments(search?: string, status?: string) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status && status !== 'All') params.append('status', status);

    const res = await fetch(`${API_BASE}/fees/payments?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch payments.');
    return data;
  },

  async recordFeePayment(paymentData: any) {
    const res = await fetch(`${API_BASE}/fees/record-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to record payment.');
    return data;
  },

  // 6. Admissions API
  async submitApplication(applicationData: any) {
    const res = await fetch(`${API_BASE}/admissions/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit admission application.');
    }
    return data;
  },

  async getApplications(status?: string, classLevel?: string) {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (classLevel && classLevel !== 'All') params.append('classLevel', classLevel);

    const res = await fetch(`${API_BASE}/admissions/applications?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applications.');
    return data.applications;
  },

  async updateApplicationStatus(id: number, status: string) {
    const res = await fetch(`${API_BASE}/admissions/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status.');
    return data;
  },

  // 7. Announcements API
  async getAnnouncements(category?: string) {
    const url = category && category !== 'All' 
      ? `${API_BASE}/announcements?category=${encodeURIComponent(category)}`
      : `${API_BASE}/announcements`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch announcements.');
    return data.announcements;
  },

  async createAnnouncement(announcementData: any) {
    const res = await fetch(`${API_BASE}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcementData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to publish announcement.');
    return data;
  },

  async deleteAnnouncement(id: number) {
    const res = await fetch(`${API_BASE}/announcements/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete announcement.');
    return data;
  },

  // 8. Inquiries / Contact API
  async submitInquiry(inquiryData: any) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send inquiry.');
    return data;
  },

  async getInquiries() {
    const res = await fetch(`${API_BASE}/inquiries`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch inquiries.');
    return data.inquiries;
  },

  async updateInquiryStatus(id: number, status: string) {
    const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update inquiry status.');
    return data;
  },

  // 9. Admin API
  async adminLogin(username: string, password: string) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Authentication failed.');
    return data;
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch stats.');
    return data.stats;
  },
};
