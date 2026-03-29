import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Plus, MoreVertical, Edit, Trash2, BookOpen, Filter } from 'lucide-react';
import { courseService } from '@/services/courseService';
import { Course } from '@/services/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SlideDrawer } from '@/components/shared/SlideDrawer';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { FloatingLabelInput } from '@/components/shared/FloatingLabelInput';
import { EmptyState } from '@/components/shared/EmptyState';
import { TableSkeleton } from '@/components/shared/SkeletonShimmer';

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
  { label: 'Upcoming', value: 'upcoming' },
];

const Courses = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const [form, setForm] = useState({ code: '', title: '', facultyName: '', capacity: '30', semester: 'Fall 2024', credits: '3', enrolled: '0', type: 'core' as Course['type'], status: 'active' as Course['status'], startDate: '2024-09-02' });

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses', search, activeTab],
    queryFn: () => courseService.getAll({ search, status: activeTab }),
  });

  const createMut = useMutation({
    mutationFn: (data: Omit<Course, 'id'>) => courseService.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['courses'] }); closeDrawer(); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => courseService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['courses'] }); setDeleteId(null); },
  });


  const closeDrawer = () => { setDrawerOpen(false); setEditing(null); setForm({ code: '', title: '', facultyName: '', capacity: '30', semester: 'Fall 2024', credits: '3', enrolled: '0', type: 'core', status: 'active', startDate: '2024-09-02' }); };

  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({ code: c.code, title: c.title, facultyName: c.facultyName, capacity: String(c.capacity), semester: c.semester, credits: String(c.credits), enrolled: String(c.enrolled), type: c.type, status: c.status, startDate: c.startDate });
    setDrawerOpen(true);
    setMenuOpen(null);
  };

  const handleSubmit = () => {
    const payload = { ...form, capacity: parseInt(form.capacity), credits: parseInt(form.credits), enrolled: parseInt(form.enrolled) };
    createMut.mutate(payload as Omit<Course, 'id'>);
  };

  return (
    <div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <BookOpen size={12} /> Courses
        </div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Courses</h1>
      </motion.div>

      {/* Tab bar */}
      <div className="mb-4 flex items-center gap-6 border-b border-[var(--border-default)]">
        {tabs.map(tab => (
          <button

            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative pb-2.5 text-[13px] font-medium transition-colors ${
              activeTab === tab.value
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--accent-orange)]" />
            )}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            className="input-clean pl-9 text-[13px]"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button onClick={() => { closeDrawer(); setDrawerOpen(true); }} className="btn-primary">
          <Plus size={14} /> New Course
        </button>

      </div>

      {/* Table */}
      <div className="card-surface overflow-hidden">
        {isLoading ? (
          <div className="p-5"><TableSkeleton rows={6} cols={6} /></div>
        ) : !courses?.length ? (
          <EmptyState icon={BookOpen} title="No courses found" description="Create a new course to get started." action={{ label: 'New Course', onClick: () => setDrawerOpen(true) }} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border-default)]">
                  <th className="table-header px-5 py-3 text-left">Code</th>
                  <th className="table-header px-5 py-3 text-left">Title</th>
                  <th className="table-header px-5 py-3 text-left">Faculty</th>
                  <th className="table-header px-5 py-3 text-left">Enrollment</th>
                  <th className="table-header px-5 py-3 text-left">Type</th>
                  <th className="table-header px-5 py-3 text-left">Start Date</th>
                  <th className="table-header px-5 py-3 text-left">Status</th>
                  <th className="table-header px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => {
                  const pct = Math.round((c.enrolled / c.capacity) * 100);
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-[var(--border-subtle)] table-row-alt table-row-hover transition-colors"
                      style={{ animation: `staggerFadeIn 0.25s ease-out ${Math.min(i * 0.04, 0.3)}s forwards`, opacity: 0 }}
                    >
                      <td className="px-5 py-3 font-mono text-[12px] font-semibold text-[var(--accent-blue)]">{c.code}</td>
                      <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{c.title}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{c.facultyName}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-[var(--border-subtle)]">
                            <div className="h-full rounded-full bg-[var(--accent-blue)] transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[11px] text-[var(--text-muted)]">{c.enrolled}/{c.capacity}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`tag-pill ${c.type === 'core' ? 'tag-blue' : c.type === 'elective' ? 'tag-orange' : 'tag-purple'}`}>
                          {c.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{new Date(c.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="rounded-md p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--tag-blue-bg)] hover:text-[var(--tag-blue-text)]"
                          aria-label="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="rounded-md p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--tag-red-bg)] hover:text-[var(--accent-red)]"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SlideDrawer open={drawerOpen} onClose={closeDrawer} title={editing ? 'Edit Course' : 'New Course'}>
        <div className="grid gap-4">
          <FloatingLabelInput id="c-code" label="Course Code" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
          <FloatingLabelInput id="c-title" label="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingLabelInput id="c-faculty" label="Faculty Name" value={form.facultyName} onChange={e => setForm(f => ({ ...f, facultyName: e.target.value }))} />
            <FloatingLabelInput id="c-sem" label="Semester" value={form.semester} onChange={e => setForm(f => ({ ...f, semester: e.target.value }))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FloatingLabelInput id="c-cap" label="Capacity" type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
            <FloatingLabelInput id="c-credits" label="Credits" type="number" step="0.5" value={form.credits} onChange={e => setForm(f => ({ ...f, credits: e.target.value }))} />
          </div>

          <CustomSelect
            label="Course Type"
            value={form.type}
            onChange={val => setForm(f => ({ ...f, type: val }))}
            options={[
              { id: 'core', label: 'Core' },
              { id: 'elective', label: 'Elective' },
              { id: 'seminar', label: 'Seminar' }
            ]}
          />


          <button onClick={handleSubmit} disabled={createMut.isPending} className="btn-primary mt-4 w-full justify-center py-2.5 disabled:opacity-50">
            {editing ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </SlideDrawer>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <motion.div className="card-surface w-full max-w-sm p-6" initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h3 className="text-[15px] font-bold text-[var(--text-primary)]">Delete Course</h3>
            <p className="mt-2 text-[13px] text-[var(--text-secondary)]">This action cannot be undone. Are you sure?</p>
            <div className="mt-4 flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="btn-ghost">Cancel</button>
              <button onClick={() => deleteMut.mutate(deleteId)} className="btn-primary bg-[var(--accent-red)]">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>

  );
};

export default Courses;
