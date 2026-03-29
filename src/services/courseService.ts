import { Course } from './types';

export const MOCK_MODE = true;
const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_COURSES: Course[] = [
  { id: 'c1', code: 'CS101', title: 'Introduction to Programming', facultyName: 'Dr. Robert Chen', enrolled: 45, capacity: 60, semester: 'Fall 2024', credits: 3, status: 'active', type: 'core', startDate: '2024-09-02' },
  { id: 'c2', code: 'CS201', title: 'Data Structures & Algorithms', facultyName: 'Dr. Michael Foster', enrolled: 38, capacity: 40, semester: 'Fall 2024', credits: 4, status: 'active', type: 'core', startDate: '2024-09-02' },
  { id: 'c3', code: 'CS301', title: 'Database Systems', facultyName: 'Dr. Robert Chen', enrolled: 28, capacity: 35, semester: 'Fall 2024', credits: 3, status: 'active', type: 'elective', startDate: '2024-09-02' },
  { id: 'c4', code: 'MATH101', title: 'Calculus I', facultyName: 'Prof. Diana Kumar', enrolled: 55, capacity: 60, semester: 'Fall 2024', credits: 4, status: 'active', type: 'core', startDate: '2024-09-02' },
  { id: 'c5', code: 'MATH201', title: 'Linear Algebra', facultyName: 'Prof. Maria Santos', enrolled: 30, capacity: 40, semester: 'Fall 2024', credits: 3, status: 'active', type: 'core', startDate: '2024-09-02' },
  { id: 'c6', code: 'PHY101', title: 'Mechanics', facultyName: 'Dr. James Wright', enrolled: 42, capacity: 50, semester: 'Fall 2024', credits: 4, status: 'active', type: 'core', startDate: '2024-09-02' },
  { id: 'c7', code: 'BIO101', title: 'Cell Biology', facultyName: 'Prof. Linda Park', enrolled: 48, capacity: 55, semester: 'Spring 2025', credits: 3, status: 'upcoming', type: 'core', startDate: '2025-01-13' },
  { id: 'c8', code: 'CHEM101', title: 'General Chemistry', facultyName: 'Dr. Ahmed Patel', enrolled: 36, capacity: 45, semester: 'Spring 2025', credits: 4, status: 'upcoming', type: 'core', startDate: '2025-01-13' },
  { id: 'c9', code: 'ENG101', title: 'English Composition', facultyName: 'Prof. Emily Ross', enrolled: 25, capacity: 30, semester: 'Spring 2025', credits: 3, status: 'upcoming', type: 'elective', startDate: '2025-01-13' },
  { id: 'c10', code: 'CS401', title: 'Machine Learning', facultyName: 'Dr. Robert Chen', enrolled: 22, capacity: 30, semester: 'Spring 2025', credits: 4, status: 'upcoming', type: 'elective', startDate: '2025-01-13' },
  { id: 'c11', code: 'MATH301', title: 'Abstract Algebra', facultyName: 'Prof. Maria Santos', enrolled: 18, capacity: 25, semester: 'Spring 2024', credits: 3, status: 'archived', type: 'elective', startDate: '2024-01-15' },
  { id: 'c12', code: 'PHY202', title: 'Electromagnetism', facultyName: 'Dr. James Wright', enrolled: 32, capacity: 40, semester: 'Spring 2024', credits: 4, status: 'archived', type: 'core', startDate: '2024-01-15' },
];

let courses = [...MOCK_COURSES];

export const courseService = {
  async getAll(filters?: { search?: string; semester?: string; status?: string }): Promise<Course[]> {
    await delay();
    let result = [...courses];
    if (filters?.semester && filters.semester !== 'all') {
      result = result.filter(c => c.semester === filters.semester);
    }
    if (filters?.status && filters.status !== 'all') {
      result = result.filter(c => c.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
    }
    return result;
  },

  async create(data: Omit<Course, 'id'>): Promise<Course> {
    await delay();
    const newCourse: Course = { ...data, id: `c${Date.now()}` };
    courses.unshift(newCourse);
    return newCourse;
  },

  async update(id: string, data: Partial<Course>): Promise<Course> {
    await delay();
    const idx = courses.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Course not found');
    courses[idx] = { ...courses[idx], ...data };
    return courses[idx];
  },

  async remove(id: string): Promise<void> {
    await delay();
    courses = courses.filter(c => c.id !== id);
  },

  async getActiveCount(): Promise<number> {
    await delay(200);
    return courses.filter(c => c.status === 'active').length;
  },

  async getSemesters(): Promise<string[]> {
    await delay(200);
    return [...new Set(courses.map(c => c.semester))];
  },
};
