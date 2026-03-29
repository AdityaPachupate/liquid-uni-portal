import { Link, useLocation } from 'react-router-dom';
import { LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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

  return (
    <nav className="no-print sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-card)] px-6">
      {/* Left: Logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <GraduationCap size={20} className="text-[var(--accent-orange)]" />
        <span className="text-[15px] font-bold text-[var(--text-primary)]">UniPortal</span>
      </Link>

      {/* Center: Links */}
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
      <div className="flex items-center gap-3">
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
          className="btn-ghost flex items-center gap-1.5 py-1.5 px-3 text-[12px]"
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </nav>
  );
};
