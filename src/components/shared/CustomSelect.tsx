import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  id: string | number;
  label: string;
}

interface Props {
  options: Option[];
  value: string | number;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;

  className?: string;
}

export const CustomSelect = ({ options, value, onChange, label, placeholder, className = '' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(o => o.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className={label ? "floating-label-group" : ""}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          data-has-value={!!selectedOption}
          className={`input-clean !flex items-center justify-between transition-all ${
            label ? 'text-[14px] !pt-[20px] !h-[48px]' : 'text-[13px] !h-[44px]'
          } ${isOpen ? '!border-[var(--accent-orange)] !ring-2 !ring-[var(--accent-orange)]/10' : ''}`}

        >
          <span className={`block truncate ${selectedOption ? 'text-[var(--text-primary)] font-medium' : (label ? 'text-transparent' : 'text-[var(--text-muted)]')}`}>
            {selectedOption ? selectedOption.label : (placeholder || ' ')}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {label && (
          <label className={isOpen ? '!text-[var(--accent-orange)]' : ''}>
            {label}
          </label>
        )}
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            className="absolute left-0 z-[100] mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-white shadow-xl shadow-gray-200/50"
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center px-3.5 py-2.5 text-left text-[13px] transition-colors hover:bg-[var(--page-bg)] ${
                    option.id === value ? 'bg-[var(--page-bg)] font-bold text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
