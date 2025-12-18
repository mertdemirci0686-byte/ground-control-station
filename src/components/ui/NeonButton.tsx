import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: 'cyan' | 'magenta' | 'green' | 'orange' | 'red';
  disabled?: boolean;
  className?: string;
}

const colorMap = {
  cyan: {
    border: 'border-[var(--primary-cyan)]',
    text: 'text-[var(--primary-cyan)]',
    bg: 'from-cyan-500/20 to-cyan-600/20',
    glow: 'rgba(0, 255, 255, 0.6)',
  },
  magenta: {
    border: 'border-[var(--primary-magenta)]',
    text: 'text-[var(--primary-magenta)]',
    bg: 'from-magenta-500/20 to-magenta-600/20',
    glow: 'rgba(255, 0, 255, 0.6)',
  },
  green: {
    border: 'border-[var(--accent-green)]',
    text: 'text-[var(--accent-green)]',
    bg: 'from-green-500/20 to-green-600/20',
    glow: 'rgba(0, 255, 136, 0.6)',
  },
  orange: {
    border: 'border-[var(--warning-orange)]',
    text: 'text-[var(--warning-orange)]',
    bg: 'from-orange-500/20 to-orange-600/20',
    glow: 'rgba(255, 170, 0, 0.6)',
  },
  red: {
    border: 'border-[var(--critical-red)]',
    text: 'text-[var(--critical-red)]',
    bg: 'from-red-500/20 to-red-600/20',
    glow: 'rgba(255, 0, 85, 0.6)',
  },
};

export default function NeonButton({ 
  children, 
  onClick, 
  color = 'cyan', 
  disabled = false,
  className = '' 
}: NeonButtonProps) {
  const colors = colorMap[color];

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-bold uppercase tracking-wider
        bg-gradient-to-r ${colors.bg}
        border-2 ${colors.border}
        ${colors.text}
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        boxShadow: disabled ? 'none' : `0 0 15px ${colors.glow}`,
      }}
    >
      {children}
    </motion.button>
  );
}
