import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  GraduationCap, 
  Loader2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Chrome,
  Facebook,
  Apple
} from 'lucide-react';

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@uniportal.edu');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="moving-gradient flex min-h-screen items-center justify-center relative overflow-hidden p-6">
      <motion.div
        className="w-full max-w-[420px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="liquid-glass p-8 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="login-icon-box text-[var(--accent-orange)]">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-[24px] font-bold text-[var(--text-primary)] mb-2">Sign in with email</h1>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-[280px]">
              Access your university portal to manage courses, students, and finances.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border-l-4 border-[var(--accent-red)] bg-red-50 p-3 text-[13px] text-[var(--accent-red)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="icon-input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="icon-input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent-orange)] transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex w-full h-[48px] items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-transform active:scale-[0.98]"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>Or sign in with</span>
          </div>

          {/* Social Social Buttons */}
          <div className="social-grid">
            <button className="social-btn" title="Google">
              <Chrome size={20} />
            </button>
            <button className="social-btn" title="Facebook">
              <Facebook size={20} />
            </button>
            <button className="social-btn" title="Apple">
              <Apple size={20} />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <span className="cursor-pointer font-semibold text-[var(--accent-orange)] hover:underline">Talk to Sales</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
