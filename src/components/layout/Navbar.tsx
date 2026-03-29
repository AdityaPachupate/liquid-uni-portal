import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, GraduationCap, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Students', path: '/students' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Courses', path: '/courses' },
  { label: 'Catalogue', path: '/catalogue' },
  { label: 'Billing', path: '/billing' },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="no-print sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-card)] px-4 md:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--page-bg)] md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Left: Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <GraduationCap size={20} className="text-[var(--accent-orange)]" />
            <span className="text-[15px] font-bold text-[var(--text-primary)]">UniPortal</span>
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--accent-orange)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: User + Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {user && (
            <Link to="/profile" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-orange)] text-[10px] font-bold text-white">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="hidden text-[13px] font-medium text-[var(--text-primary)] md:inline">{user.name}</span>
            </Link>
          )}
          <button
            onClick={logout}
            className="btn-ghost hidden items-center gap-1.5 py-1.5 px-3 text-[12px] md:flex"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-[70] w-full max-w-[280px] border-r border-[var(--border-default)] bg-[var(--surface-card)] p-6 md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-[var(--accent-orange)]" />
                  <span className="text-[15px] font-bold text-[var(--text-primary)]">UniPortal</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--page-bg)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--tag-orange-bg)] text-[var(--accent-orange)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--page-bg)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-[var(--border-subtle)] pt-6">
                {user && (
                    <Link 
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="mb-6 flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-[var(--page-bg)]"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-orange)] text-[12px] font-bold text-white">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-[14px] font-bold text-[var(--text-primary)]">{user.name}</p>
                            <p className="truncate text-[11px] text-[var(--text-muted)]">{user.email}</p>
                        </div>
                        <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                )}
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-[14px] font-medium text-[var(--accent-red)] transition-colors hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

