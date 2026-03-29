import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const PageWrapper = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`min-h-screen bg-[var(--page-bg)] ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </div>
);
