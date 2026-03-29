import { BillingItem } from './types';

export const MOCK_MODE = true;
const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_BILLING: BillingItem[] = [
  { id: 'b1', studentId: 's1', studentName: 'Alice Johnson', description: 'Tuition Fee — Fall 2024', amount: 4500, dueDate: '2024-09-01', status: 'paid' },
  { id: 'b2', studentId: 's1', studentName: 'Alice Johnson', description: 'Lab Equipment Fee', amount: 350, dueDate: '2024-09-15', status: 'paid' },
  { id: 'b3', studentId: 's1', studentName: 'Alice Johnson', description: 'Tuition Fee — Spring 2025', amount: 4500, dueDate: '2025-01-15', status: 'pending' },
  { id: 'b4', studentId: 's2', studentName: 'Bob Williams', description: 'Tuition Fee — Fall 2024', amount: 4200, dueDate: '2024-09-01', status: 'paid' },
  { id: 'b5', studentId: 's2', studentName: 'Bob Williams', description: 'Library Fine', amount: 25, dueDate: '2024-11-10', status: 'overdue' },
  { id: 'b6', studentId: 's3', studentName: 'Clara Davis', description: 'Tuition Fee — Fall 2024', amount: 4500, dueDate: '2024-09-01', status: 'overdue' },
  { id: 'b7', studentId: 's3', studentName: 'Clara Davis', description: 'Student Activity Fee', amount: 150, dueDate: '2024-09-15', status: 'overdue' },
  { id: 'b8', studentId: 's4', studentName: 'Daniel Brown', description: 'Tuition Fee — Fall 2024', amount: 4500, dueDate: '2024-09-01', status: 'paid' },
  { id: 'b9', studentId: 's5', studentName: 'Elena Martinez', description: 'Tuition Fee — Fall 2024', amount: 4500, dueDate: '2024-09-01', status: 'paid' },
  { id: 'b10', studentId: 's5', studentName: 'Elena Martinez', description: 'Tuition Fee — Spring 2025', amount: 4500, dueDate: '2025-01-15', status: 'pending' },
  { id: 'b11', studentId: 's6', studentName: 'Frank Taylor', description: 'Tuition Fee — Fall 2024', amount: 4200, dueDate: '2024-09-01', status: 'overdue' },
  { id: 'b12', studentId: 's7', studentName: 'Grace Lee', description: 'Tuition Fee — Fall 2024', amount: 4500, dueDate: '2024-09-01', status: 'paid' },
];

export const billingService = {
  async getByStudent(studentId: string): Promise<BillingItem[]> {
    await delay();
    return MOCK_BILLING.filter(b => b.studentId === studentId);
  },

  async getOverdueCount(): Promise<number> {
    await delay(200);
    return MOCK_BILLING.filter(b => b.status === 'overdue').length;
  },

  async getAll(): Promise<BillingItem[]> {
    await delay();
    return [...MOCK_BILLING];
  },

  async getTotalRevenue(): Promise<number> {
    await delay(200);
    return MOCK_BILLING.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0);
  },

  async getTotalOutstanding(): Promise<number> {
    await delay(200);
    return MOCK_BILLING.filter(b => b.status !== 'paid').reduce((s, b) => s + b.amount, 0);
  },

  async getPaidThisMonth(): Promise<number> {
    await delay(200);
    return MOCK_BILLING.filter(b => b.status === 'paid').slice(0, 3).reduce((s, b) => s + b.amount, 0);
  },
};
