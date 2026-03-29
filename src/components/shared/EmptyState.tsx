import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ icon: Icon, title, description, action }: Props) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Icon size={40} className="mb-3 text-[var(--text-muted)]" strokeWidth={1.5} />
    <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">{title}</h3>
    <p className="mt-1 max-w-sm text-[13px] text-[var(--text-secondary)]">{description}</p>
    {action && (
      <button onClick={action.onClick} className="btn-primary mt-4">
        {action.label}
      </button>
    )}
  </div>
);
