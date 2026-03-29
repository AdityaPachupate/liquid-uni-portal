import { ActivityItem, EnrollmentTrend } from './types';

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'a1', type: 'student', message: 'Alice Johnson enrolled in CS301', timestamp: '2024-12-20T14:30:00Z' },
  { id: 'a2', type: 'billing', message: 'Payment received from Bob Williams — $4,200', timestamp: '2024-12-20T11:15:00Z' },
  { id: 'a3', type: 'course', message: 'CS401 Machine Learning capacity increased to 30', timestamp: '2024-12-19T16:45:00Z' },
  { id: 'a4', type: 'faculty', message: 'Dr. Ahmed Patel added CHEM202 to schedule', timestamp: '2024-12-19T09:00:00Z' },
  { id: 'a5', type: 'student', message: 'Clara Davis placed on academic probation', timestamp: '2024-12-18T13:20:00Z' },
  { id: 'a6', type: 'billing', message: 'Overdue notice sent to Frank Taylor', timestamp: '2024-12-18T10:00:00Z' },
  { id: 'a7', type: 'course', message: 'New course ENG201 created for Spring 2025', timestamp: '2024-12-17T15:30:00Z' },
];

const ENROLLMENT_TRENDS: EnrollmentTrend[] = [
  { month: 'Sep', cs: 120, math: 85, physics: 62, biology: 78, chemistry: 55 },
  { month: 'Oct', cs: 128, math: 88, physics: 65, biology: 80, chemistry: 58 },
  { month: 'Nov', cs: 135, math: 90, physics: 68, biology: 82, chemistry: 60 },
  { month: 'Dec', cs: 140, math: 92, physics: 70, biology: 85, chemistry: 62 },
  { month: 'Jan', cs: 148, math: 95, physics: 72, biology: 88, chemistry: 65 },
  { month: 'Feb', cs: 155, math: 98, physics: 75, biology: 90, chemistry: 68 },
];

export const activityService = {
  async getRecent(limit = 7): Promise<ActivityItem[]> {
    await delay();
    return MOCK_ACTIVITY.slice(0, limit);
  },

  async getEnrollmentTrends(): Promise<EnrollmentTrend[]> {
    await delay(400);
    return ENROLLMENT_TRENDS;
  },
};
