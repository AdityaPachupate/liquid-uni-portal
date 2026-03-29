import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { studentService } from '@/services/studentService';
import { courseService } from '@/services/courseService';
import { facultyService } from '@/services/facultyService';
import { billingService } from '@/services/billingService';
import { activityService } from '@/services/activityService';
import { SkeletonShimmer } from '@/components/shared/SkeletonShimmer';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StatCard = ({ icon: Icon, label, value, delta, loading = false }: any) => (
  <div className="card-surface p-5">
    {loading ? (
      <div className="space-y-3">
        <SkeletonShimmer className="h-3 w-16" />
        <SkeletonShimmer className="h-8 w-20" />
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[var(--text-secondary)]">{label}</span>
          <Icon size={15} className="text-[var(--text-muted)]" />
        </div>
        <p className="mt-2 text-[28px] font-bold leading-none text-[var(--text-primary)]">{value}</p>
        {delta !== undefined && (
          <div className="mt-2">
            <DeltaBadge value={delta} suffix="% this month" />
          </div>
        )}
      </>
    )}
  </div>
);

const chartColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
const chartKeys = [
  { key: 'cs', label: 'Computer Science' },
  { key: 'math', label: 'Mathematics' },
  { key: 'physics', label: 'Physics' },
  { key: 'biology', label: 'Biology' },
  { key: 'chemistry', label: 'Chemistry' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [bannerVisible, setBannerVisible] = useState(true);
  const students = useQuery({ queryKey: ['students-count'], queryFn: () => studentService.getCount() });
  const courses = useQuery({ queryKey: ['courses-count'], queryFn: () => courseService.getActiveCount() });
  const faculty = useQuery({ queryKey: ['faculty-count'], queryFn: () => facultyService.getCount() });
  const overdue = useQuery({ queryKey: ['billing-overdue'], queryFn: () => billingService.getOverdueCount() });
  const activity = useQuery({ queryKey: ['activity'], queryFn: () => activityService.getRecent() });
  const trends = useQuery({ queryKey: ['enrollment-trends'], queryFn: () => activityService.getEnrollmentTrends() });

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div>
      {/* Announcement Banner */}
      {bannerVisible && (
        <motion.div
          className="mb-6 flex items-center justify-between rounded-lg bg-[var(--accent-orange)] px-3 py-2 md:px-4 md:py-2.5 text-white"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[12px] md:text-[13px] font-medium leading-tight">
            📢 Spring 2025 enrollment now open
            <Link to="/catalogue" className="ml-2 inline-flex items-center gap-1 font-semibold underline">
              View <span className="hidden sm:inline">catalogue</span> <ArrowRight size={13} />
            </Link>
          </span>
          <button onClick={() => setBannerVisible(false)} className="ml-2 rounded p-0.5 hover:bg-white/20" aria-label="Dismiss">
            <X size={14} />
          </button>
        </motion.div>
      )}

      {/* Header */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
          Overview
        </div>
        <h1 className="text-[24px] md:text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Dashboard</h1>
        <p className="mt-0.5 text-[12px] md:text-[13px] text-[var(--text-secondary)]">
          Welcome back, {user?.name?.split(' ')[0]}. <span className="hidden sm:inline text-[var(--text-muted)]">{dateStr}</span>
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Students" value={students.data ?? '—'} delta={5.20} loading={students.isLoading} />
        <StatCard icon={BookOpen} label="Active Courses" value={courses.data ?? '—'} delta={2.10} loading={courses.isLoading} />
        <StatCard icon={GraduationCap} label="Faculty" value={faculty.data ?? '—'} delta={0.00} loading={faculty.isLoading} />
        <StatCard icon={AlertTriangle} label="Overdue Billing" value={overdue.data ?? '—'} delta={-3.40} loading={overdue.isLoading} />
      </div>

      {/* Enrollment Trend Chart */}
      <div className="mb-6 card-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="section-label mb-2">
              📈 Trends
            </div>
            <h2 className="text-[15px] font-bold text-[var(--text-primary)]">Enrollment by Department</h2>
          </div>
          <div className="flex gap-2">
            {chartKeys.map((k, i) => (
              <span key={k.key} className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: chartColors[i] }} />
                {k.label}
              </span>
            ))}
          </div>
        </div>
        {trends.isLoading ? (
          <SkeletonShimmer className="h-[250px]" />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trends.data}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface-dark)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '12px',
                }}
                itemStyle={{ color: 'white' }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}
              />
              {chartKeys.map((k, i) => (
                <Line key={k.key} type="monotone" dataKey={k.key} stroke={chartColors[i]} strokeWidth={2} dot={false} name={k.label} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom row: Activity + Top Courses */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="card-surface p-5 lg:col-span-2">
          <h2 className="mb-3 text-[14px] font-semibold text-[var(--text-primary)]">Recent Activity</h2>
          {activity.isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => <SkeletonShimmer key={i} className="h-10" />)}
            </div>
          ) : (
            <div className="space-y-0">
              {activity.data?.map(item => (
                <div key={item.id} className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors table-row-hover">
                  <Clock size={14} className="mt-0.5 shrink-0 text-[var(--text-muted)]" />
                  <div className="flex-1">
                    <p className="text-[13px] text-[var(--text-primary)]">{item.message}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card-surface p-5">
          <h2 className="mb-3 text-[14px] font-semibold text-[var(--text-primary)]">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Add Student', path: '/students' },
              { label: 'New Course', path: '/courses' },
              { label: 'View Billing', path: '/billing' },
              { label: 'Course Catalogue', path: '/catalogue' },
            ].map(action => (
              <Link
                key={action.label}
                to={action.path}
                className="flex items-center justify-between rounded-md border border-[var(--border-default)] px-4 py-2.5 text-[13px] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--page-bg)]"
              >
                {action.label}
                <ArrowRight size={13} className="text-[var(--text-muted)]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
