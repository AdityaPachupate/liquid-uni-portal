import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, FileDown, Receipt, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { billingService } from '@/services/billingService';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { SkeletonShimmer, TableSkeleton } from '@/components/shared/SkeletonShimmer';

const StatCard = ({ icon: Icon, label, value, loading = false }: any) => (
  <div className="card-surface p-5">
    {loading ? (
      <div className="space-y-2">
        <SkeletonShimmer className="h-3 w-16" />
        <SkeletonShimmer className="h-7 w-20" />
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[var(--text-secondary)]">{label}</span>
          <Icon size={15} className="text-[var(--text-muted)]" />
        </div>
        <p className="mt-2 text-[24px] font-bold leading-none text-[var(--text-primary)]">{value}</p>
      </>
    )}
  </div>
);

const Billing = () => {
  const [search, setSearch] = useState('');

  const { data: allBilling, isLoading } = useQuery({
    queryKey: ['billing-all'],
    queryFn: () => billingService.getAll(),
  });

  const totalRevenue = useQuery({ queryKey: ['billing-revenue'], queryFn: () => billingService.getTotalRevenue() });
  const totalOutstanding = useQuery({ queryKey: ['billing-outstanding'], queryFn: () => billingService.getTotalOutstanding() });
  const paidMonth = useQuery({ queryKey: ['billing-paid-month'], queryFn: () => billingService.getPaidThisMonth() });

  const filtered = search
    ? allBilling?.filter(b => b.studentName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()))
    : allBilling;

  return (
    <div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-3">
          <Receipt size={12} /> Billing
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">Billing</h1>
      </motion.div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${(totalRevenue.data ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} loading={totalRevenue.isLoading} />
        <StatCard icon={AlertTriangle} label="Outstanding" value={`$${(totalOutstanding.data ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} loading={totalOutstanding.isLoading} />
        <StatCard icon={CheckCircle} label="Paid This Month" value={`$${(paidMonth.data ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} loading={paidMonth.isLoading} />
      </div>


      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            className="input-clean pl-9 text-[13px]"
            placeholder="Search by student or invoice ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-surface overflow-hidden">
        {isLoading ? (
          <div className="p-5"><TableSkeleton rows={6} cols={5} /></div>
        ) : !filtered?.length ? (
          <EmptyState icon={Receipt} title="No invoices found" description="Adjust your search." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border-default)]">
                  <th className="table-header px-5 py-3 text-left">Invoice ID</th>
                  <th className="table-header px-5 py-3 text-left">Student</th>
                  <th className="table-header px-5 py-3 text-left">Description</th>
                  <th className="table-header px-5 py-3 text-right">Amount</th>
                  <th className="table-header px-5 py-3 text-left">Status</th>
                  <th className="table-header px-5 py-3 text-left">Due Date</th>
                  <th className="table-header px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-b border-[var(--border-subtle)] table-row-alt table-row-hover transition-colors"
                    style={{ animation: `staggerFadeIn 0.25s ease-out ${Math.min(i * 0.04, 0.3)}s forwards`, opacity: 0 }}
                  >
                    <td className="px-5 py-3 font-mono text-[12px] text-[var(--text-secondary)]">{b.id.toUpperCase()}</td>
                    <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{b.studentName}</td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">{b.description}</td>
                    <td className="px-5 py-3 text-right font-mono text-[12px] font-semibold text-[var(--text-primary)]">${b.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">{new Date(b.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="btn-ghost py-1 px-2 text-[11px]">
                        <FileDown size={12} /> PDF
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

export default Billing;
