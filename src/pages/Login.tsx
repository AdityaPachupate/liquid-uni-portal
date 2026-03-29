import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FloatingLabelInput } from '@/components/shared/FloatingLabelInput';
import { GraduationCap, Loader2 } from 'lucide-react';

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@uniportal.edu');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)]">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-orange)] text-white">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)]">Sign in to UniPortal</h1>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">University management portal</p>
        </div>

        {/* Card */}
        <div className="card-surface p-6">
          {error && (
            <div className="mb-4 rounded-lg border-l-4 border-[var(--accent-red)] bg-[var(--tag-red-bg)] px-3 py-2.5 text-[13px] text-[var(--accent-red)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingLabelInput
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <FloatingLabelInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-[14px]"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-[var(--text-muted)]">
            Demo: any email + password works
          </p>
        </div>

        <p className="mt-4 text-center text-[12px] text-[var(--text-muted)]">
          Need an account?{' '}
          <span className="cursor-pointer font-medium text-[var(--accent-orange)]">Talk to Sales</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
