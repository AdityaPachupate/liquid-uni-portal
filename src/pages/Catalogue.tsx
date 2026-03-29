import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { courseService } from '@/services/courseService';
import { SkeletonShimmer } from '@/components/shared/SkeletonShimmer';
import { ArrowRight, BookOpen } from 'lucide-react';

const Catalogue = () => {
  const [deptFilter, setDeptFilter] = useState('all');
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses-catalogue'],
    queryFn: () => courseService.getAll(),
  });

  const departments = courses ? [...new Set(courses.map(c => c.code.replace(/[0-9]/g, '')))] : [];

  const filtered = deptFilter === 'all'
    ? courses
    : courses?.filter(c => c.code.startsWith(deptFilter));

  return (
    <div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <BookOpen size={12} /> Catalogue
        </div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Course Catalogue</h1>
        <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">Browse all available courses across departments</p>
      </motion.div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setDeptFilter('all')}
          className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${deptFilter === 'all' ? 'border-[var(--accent-orange)] bg-[var(--tag-orange-bg)] text-[var(--accent-orange)]' : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--page-bg)]'}`}
        >
          All
        </button>
        {departments.map(d => (
          <button
            key={d}
            onClick={() => setDeptFilter(d)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${deptFilter === d ? 'border-[var(--accent-orange)] bg-[var(--tag-orange-bg)] text-[var(--accent-orange)]' : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--page-bg)]'}`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => <SkeletonShimmer key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered?.map((c, i) => (
            <motion.div
              key={c.id}
              className="card-surface p-5 transition-colors hover:bg-[var(--page-bg)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="tag-pill tag-blue font-mono">{c.code}</span>
                <span className="text-[11px] text-[var(--text-muted)]">{c.credits} credits</span>
              </div>
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">{c.title}</h3>
              <p className="mt-1 text-[12px] text-[var(--text-secondary)]">{c.facultyName} · {c.semester}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-muted)]">{c.enrolled}/{c.capacity} enrolled</span>
                <button className="flex items-center gap-1 text-[12px] font-semibold text-[var(--accent-orange)] hover:underline">
                  Enroll <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogue;
