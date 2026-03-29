import { Student } from './types';

export const MOCK_MODE = true;
const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Alice Johnson', studentCode: 'STU-2024-001', course: 'Computer Science', status: 'active', type: 'full-time', year: 2, email: 'alice@uni.edu', gpa: 3.8, attendance: 96 },
  { id: 's2', name: 'Bob Williams', studentCode: 'STU-2024-002', course: 'Mathematics', status: 'active', type: 'full-time', year: 3, email: 'bob@uni.edu', gpa: 3.5, attendance: 91 },
  { id: 's3', name: 'Clara Davis', studentCode: 'STU-2024-003', course: 'Physics', status: 'probation', type: 'part-time', year: 1, email: 'clara@uni.edu', gpa: 2.1, attendance: 72 },
  { id: 's4', name: 'Daniel Brown', studentCode: 'STU-2024-004', course: 'Computer Science', status: 'active', type: 'full-time', year: 4, email: 'daniel@uni.edu', gpa: 3.9, attendance: 98 },
  { id: 's5', name: 'Elena Martinez', studentCode: 'STU-2024-005', course: 'Biology', status: 'active', type: 'exchange', year: 2, email: 'elena@uni.edu', gpa: 3.6, attendance: 94 },
  { id: 's6', name: 'Frank Taylor', studentCode: 'STU-2024-006', course: 'Chemistry', status: 'inactive', type: 'full-time', year: 3, email: 'frank@uni.edu', gpa: 2.8, attendance: 65 },
  { id: 's7', name: 'Grace Lee', studentCode: 'STU-2024-007', course: 'English Literature', status: 'active', type: 'full-time', year: 1, email: 'grace@uni.edu', gpa: 3.7, attendance: 93 },
  { id: 's8', name: 'Henry Wilson', studentCode: 'STU-2024-008', course: 'Computer Science', status: 'active', type: 'part-time', year: 2, email: 'henry@uni.edu', gpa: 3.3, attendance: 88 },
  { id: 's9', name: 'Isabella Clark', studentCode: 'STU-2024-009', course: 'Mathematics', status: 'probation', type: 'full-time', year: 4, email: 'isabella@uni.edu', gpa: 2.4, attendance: 75 },
  { id: 's10', name: 'James Anderson', studentCode: 'STU-2024-010', course: 'Physics', status: 'active', type: 'full-time', year: 1, email: 'james@uni.edu', gpa: 3.4, attendance: 90 },
  { id: 's11', name: 'Katherine Thomas', studentCode: 'STU-2024-011', course: 'Biology', status: 'active', type: 'exchange', year: 3, email: 'katherine@uni.edu', gpa: 3.2, attendance: 87 },
  { id: 's12', name: 'Liam Jackson', studentCode: 'STU-2024-012', course: 'Chemistry', status: 'active', type: 'full-time', year: 2, email: 'liam@uni.edu', gpa: 3.6, attendance: 92 },
  { id: 's13', name: 'Mia White', studentCode: 'STU-2024-013', course: 'English Literature', status: 'inactive', type: 'part-time', year: 4, email: 'mia@uni.edu', gpa: 2.9, attendance: 68 },
  { id: 's14', name: 'Noah Harris', studentCode: 'STU-2024-014', course: 'Computer Science', status: 'active', type: 'full-time', year: 1, email: 'noah@uni.edu', gpa: 3.1, attendance: 85 },
  { id: 's15', name: 'Olivia Martin', studentCode: 'STU-2024-015', course: 'Mathematics', status: 'active', type: 'full-time', year: 3, email: 'olivia@uni.edu', gpa: 3.8, attendance: 97 },
];

let students = [...MOCK_STUDENTS];

export const studentService = {
  async getAll(filters?: { status?: string; search?: string }): Promise<Student[]> {
    await delay();
    let result = [...students];
    if (filters?.status && filters.status !== 'all') {
      result = result.filter(s => s.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.studentCode.toLowerCase().includes(q));
    }
    return result;
  },

  async getById(id: string): Promise<Student | undefined> {
    await delay(300);
    return students.find(s => s.id === id);
  },

  async create(data: Omit<Student, 'id'>): Promise<Student> {
    await delay();
    const newStudent: Student = { ...data, id: `s${Date.now()}` };
    students.unshift(newStudent);
    return newStudent;
  },

  async update(id: string, data: Partial<Student>): Promise<Student> {
    await delay();
    const idx = students.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Student not found');
    students[idx] = { ...students[idx], ...data };
    return students[idx];
  },

  async remove(id: string): Promise<void> {
    await delay();
    students = students.filter(s => s.id !== id);
  },

  async getCount(): Promise<number> {
    await delay(200);
    return students.length;
  },
};
