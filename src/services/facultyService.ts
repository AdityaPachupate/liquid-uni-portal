import { Faculty } from './types';

export const MOCK_MODE = true;
const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_FACULTY: Faculty[] = [
  { id: 'f1', name: 'Dr. Robert Chen', department: 'Computer Science', courses: ['CS101', 'CS301', 'CS401'], email: 'r.chen@uni.edu', rating: 4.7, status: 'active' },
  { id: 'f2', name: 'Prof. Maria Santos', department: 'Mathematics', courses: ['MATH201', 'MATH301'], email: 'm.santos@uni.edu', rating: 4.5, status: 'active' },
  { id: 'f3', name: 'Dr. James Wright', department: 'Physics', courses: ['PHY101', 'PHY202'], email: 'j.wright@uni.edu', rating: 4.3, status: 'active' },
  { id: 'f4', name: 'Prof. Linda Park', department: 'Biology', courses: ['BIO101', 'BIO301', 'BIO401'], email: 'l.park@uni.edu', rating: 4.8, status: 'active' },
  { id: 'f5', name: 'Dr. Ahmed Patel', department: 'Chemistry', courses: ['CHEM101', 'CHEM202'], email: 'a.patel@uni.edu', rating: 4.2, status: 'active' },
  { id: 'f6', name: 'Prof. Emily Ross', department: 'English Literature', courses: ['ENG101', 'ENG201'], email: 'e.ross@uni.edu', rating: 4.6, status: 'active' },
  { id: 'f7', name: 'Dr. Michael Foster', department: 'Computer Science', courses: ['CS201', 'CS302'], email: 'm.foster@uni.edu', rating: 4.4, status: 'active' },
  { id: 'f8', name: 'Prof. Diana Kumar', department: 'Mathematics', courses: ['MATH101', 'MATH401'], email: 'd.kumar@uni.edu', rating: 4.1, status: 'active' },
];

export const facultyService = {
  async getAll(filters?: { department?: string; search?: string }): Promise<Faculty[]> {
    await delay();
    let result = [...MOCK_FACULTY];
    if (filters?.department && filters.department !== 'all') {
      result = result.filter(f => f.department === filters.department);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q));
    }
    return result;
  },

  async getById(id: string): Promise<Faculty | undefined> {
    await delay(300);
    return MOCK_FACULTY.find(f => f.id === id);
  },

  async getCount(): Promise<number> {
    await delay(200);
    return MOCK_FACULTY.length;
  },

  async getDepartments(): Promise<string[]> {
    await delay(200);
    return [...new Set(MOCK_FACULTY.map(f => f.department))];
  },
};
