import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, GraduationCap, MoreVertical } from 'lucide-react';
import { facultyService } from '@/services/facultyService';
import { EmptyState } from '@/components/shared/EmptyState';
import { SkeletonShimmer } from '@/components/shared/SkeletonShimmer';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CustomSelect } from '@/components/shared/CustomSelect';


const Faculty = () => {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');

  const { data: faculty, isLoading } = useQuery({
    queryKey: ['faculty', search, dept],
    queryFn: () => facultyService.getAll({ search, department: dept }),
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => facultyService.getDepartments(),
  });

  return (
    <div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <GraduationCap size={12} /> Faculty
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Faculty</h1>
      </motion.div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            className="input-clean pl-9 text-[13px]"
            placeholder="Search faculty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <CustomSelect
          value={dept}
          onChange={val => setDept(val)}
          options={[
            { id: 'all', label: 'All Departments' },
            ...(departments?.map(d => ({ id: d, label: d })) || [])
          ]}
          className="flex-1 sm:w-[200px]"
        />
      </div>

      {/* Table */}
      <div className="card-surface overflow-hidden">
        {isLoading ? (
          <div className="p-5">
            {[...Array(6)].map((_, i) => <SkeletonShimmer key={i} className="mb-2 h-12" />)}
          </div>
        ) : !faculty?.length ? (
          <EmptyState icon={GraduationCap} title="No faculty found" description="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border-default)]">
                  <th className="table-header px-5 py-3 text-left">#</th>
                  <th className="table-header px-5 py-3 text-left">Name</th>
                  <th className="table-header px-5 py-3 text-left">Department</th>
                  <th className="table-header px-5 py-3 text-left">Courses</th>
                  <th className="table-header px-5 py-3 text-left">Rating</th>
                  <th className="table-header px-5 py-3 text-left">Status</th>
                  <th className="table-header px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f, i) => (
                  <tr
                    key={f.id}
                    className="border-b border-[var(--border-subtle)] table-row-alt table-row-hover transition-colors"
                    style={{ animation: `staggerFadeIn 0.25s ease-out ${Math.min(i * 0.04, 0.3)}s forwards`, opacity: 0 }}
                  >
                    <td className="px-5 py-3 text-[var(--text-muted)]">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--tag-orange-bg)] text-[10px] font-bold text-[var(--tag-orange-text)]">
                          {f.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{f.name}</p>
                          <p className="text-[11px] text-[var(--text-muted)]">{f.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="tag-pill tag-blue">{f.department}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {f.courses.map(c => (
                          <span key={c} className="rounded bg-[var(--page-bg)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <DeltaBadge value={f.rating - 4.0} suffix="" />
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={f.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <button className="btn-primary py-1.5 px-3 text-[11px]">
                        Assign Course
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
