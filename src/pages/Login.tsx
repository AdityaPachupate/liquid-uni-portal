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
      <div className="grain-overlay" />
      <motion.div
        className="w-full max-w-[850px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative">
          <div className="liquid-glass p-8 md:p-12 relative z-10 overflow-hidden min-h-[500px] flex flex-col justify-center">
            {/* Layer 0: Card Background (Implicit in liquid-glass) */}
 
            {/* Layer 1: Middle Image (z-10) */}
            <motion.div
              className="absolute -right-32 -bottom-32 w-[600px] pointer-events-none z-10"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <img 
                src="/philosopher.png" 
                alt="Scholar" 
                className="w-full h-auto object-contain opacity-20 md:opacity-90"
              />
            </motion.div>

            {/* Layer 2: Interactive Content (z-20) */}
            <div className="relative z-20 max-w-[340px]">
              {/* Header Section */}
              <div className="flex flex-col items-start text-left mb-8">
                <div className="login-icon-box text-[var(--accent-orange)]">
                  <GraduationCap size={24} />
                </div>
                <h1 className="text-[28px] font-bold text-[var(--text-primary)] mb-2">Sign in to Portal</h1>
                <p className="text-[15px] text-[var(--text-primary)] opacity-70 leading-relaxed">
                  Enter your university credentials to manage your academic profile.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg border-l-4 border-[var(--accent-red)] bg-red-50 p-3 text-[13px] text-[var(--accent-red)]">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="flex justify-start">
                    <button type="button" className="text-[13px] font-medium text-[var(--text-primary)] opacity-70 hover:opacity-100 hover:text-[var(--accent-orange)] transition-all">
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex h-[50px] px-8 items-center justify-center gap-2 rounded-xl text-[16px] font-bold transition-transform active:scale-[0.98] w-full"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className="login-divider">
                <span>Or login with</span>
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
          </div>
        </div>

        {/* Footer Removed */}
      </motion.div>
    </div>
  );
};

export default Login;
