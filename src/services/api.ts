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

  // 2. Admissions API
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

  // 3. Announcements API
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

  // 4. Inquiries / Contact API
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

  // 5. Admin API
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
