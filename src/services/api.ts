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

type ApiMethod = (...args: any[]) => Promise<any>;
type SchoolApi = Record<string, ApiMethod>;

const unavailable = async (): Promise<never> => {
  throw new Error('Student and administrative services are unavailable. Please contact the school office.');
};

export const api = new Proxy({} as SchoolApi, {
  get(_target, property) {
    if (typeof property !== 'string' || property === 'then') return undefined;
    return unavailable;
  },
});
