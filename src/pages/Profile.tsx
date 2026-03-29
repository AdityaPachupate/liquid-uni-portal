import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FloatingLabelInput } from '@/components/shared/FloatingLabelInput';
import { Camera, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    department: 'Administration',
  });
  const [notifs, setNotifs] = useState({ email: true, push: false, billing: true });

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U';

  return (
    <div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <User size={12} /> Profile
        </div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Profile</h1>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left — Avatar Card */}
        <motion.div className="card-surface p-6 text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="group relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent-orange)] text-2xl font-bold text-white">
            {initials}
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <h2 className="text-[15px] font-bold text-[var(--text-primary)]">{user?.name}</h2>
          <span className="mt-1 inline-block tag-pill tag-orange">
            {user?.role}
          </span>
          <p className="mt-2 text-[12px] text-[var(--text-muted)]">{user?.email}</p>

          {/* Key-value info */}
          <div className="mt-5 space-y-2 text-left">
            {[
              { label: 'User ID', value: user?.id || '—' },
              { label: 'Role', value: user?.role || '—' },
              { label: 'Joined', value: 'Sep 2023' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1.5">
                <span className="text-[11px] text-[var(--text-muted)]">{row.label}</span>
                <span className="font-mono text-[11px] text-[var(--text-primary)]">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div className="card-surface p-6 lg:col-span-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="mb-5 text-[14px] font-semibold text-[var(--text-primary)]">Personal Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FloatingLabelInput id="p-name" label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <FloatingLabelInput id="p-email" label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <FloatingLabelInput id="p-phone" label="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <div className="sm:col-span-2">
              <FloatingLabelInput id="p-dept" label="Department" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
            </div>
          </div>


          {/* Notifications */}
          <h3 className="mb-3 mt-6 text-[14px] font-semibold text-[var(--text-primary)]">Notifications</h3>
          <div className="space-y-2">
            {([
              { key: 'email' as const, label: 'Email Notifications', desc: 'Receive email updates about student activity' },
              { key: 'push' as const, label: 'Push Notifications', desc: 'Browser push notifications for alerts' },
              { key: 'billing' as const, label: 'Billing Alerts', desc: 'Get notified about overdue payments' },
            ]).map(n => (
              <div key={n.key} className="flex items-center justify-between rounded-md border border-[var(--border-subtle)] px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium text-[var(--text-primary)]">{n.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  className={`group relative h-5 w-9 shrink-0 rounded-full transition-colors ${notifs[n.key] ? 'bg-[var(--accent-orange)]' : 'bg-[var(--border-default)]'}`}
                  role="switch"
                  aria-checked={notifs[n.key]}
                >
                  <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${notifs[n.key] ? 'translate-x-[16px]' : 'translate-x-0'}`} />


                </button>
              </div>
            ))}
          </div>

          <button className="btn-primary mt-6">Save Changes</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
