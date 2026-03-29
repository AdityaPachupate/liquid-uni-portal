import { User } from './types';

export const MOCK_MODE = true;

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

const MOCK_USER: User = {
  id: 'usr-001',
  name: 'Dr. Sarah Mitchell',
  email: 'sarah.mitchell@uniportal.edu',
  role: 'Administrator',
  avatarUrl: undefined,
};

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    await delay();
    if (!email) throw new Error('Email is required');
    return { ...MOCK_USER, email };
  },

  async logout(): Promise<void> {
    await delay(300);
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    return null;
  },
};
