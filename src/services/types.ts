export interface Student {
  id: string;
  name: string;
  avatarUrl?: string;
  studentCode: string;
  course: string;
  status: 'active' | 'probation' | 'inactive';
  type: 'full-time' | 'part-time' | 'exchange';
  year: number;
  email: string;
  gpa: number;
  attendance: number;
}

export interface Faculty {
  id: string;
  name: string;
  avatarUrl?: string;
  department: string;
  courses: string[];
  email: string;
  rating: number;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  facultyName: string;
  enrolled: number;
  capacity: number;
  semester: string;
  credits: number;
  status: 'active' | 'archived' | 'upcoming';
  type: 'core' | 'elective' | 'lab';
  startDate: string;
}

export interface BillingItem {
  id: string;
  studentId: string;
  studentName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface ActivityItem {
  id: string;
  type: 'student' | 'course' | 'billing' | 'faculty';
  message: string;
  timestamp: string;
}

export interface EnrollmentTrend {
  month: string;
  cs: number;
  math: number;
  physics: number;
  biology: number;
  chemistry: number;
}
