import { ReactNode } from 'react';

interface SciFiPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'magenta' | 'green' | 'orange';
}

const colorMap = {
  cyan: 'border-[var(--primary-cyan)]',
  magenta: 'border-[var(--primary-magenta)]',
  green: 'border-[var(--accent-green)]',
  orange: 'border-[var(--warning-orange)]',
};

export default function SciFiPanel({ 
  title, 
  children, 
  className = '',
  color = 'cyan'
}: SciFiPanelProps) {
  const borderColor = colorMap[color];

  return (
    <div 
      className={`
        relative p-4
        bg-gradient-to-br from-cyan-900/10 via-transparent to-magenta-900/10
        border-2 ${borderColor}
        backdrop-filter backdrop-blur-md
        ${className}
      `}
      style={{
        clipPath: `polygon(
          0 12px, 12px 0,
          calc(100% - 12px) 0, 100% 12px,
          100% calc(100% - 12px), calc(100% - 12px) 100%,
          12px 100%, 0 calc(100% - 12px)
        )`
      }}
    >
      {title && (
        <div className="text-cyan-300 font-bold mb-2 text-sm uppercase tracking-wider">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
