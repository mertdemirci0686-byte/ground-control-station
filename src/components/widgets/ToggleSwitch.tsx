import { useState } from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  label?: string;
  onLabel?: string;
  offLabel?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function ToggleSwitch({
  label = 'Toggle',
  onLabel = 'ON',
  offLabel = 'OFF',
  value: externalValue,
  onChange,
}: ToggleSwitchProps) {
  const [internalValue, setInternalValue] = useState(false);
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleToggle = () => {
    const newValue = !value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-48">
      <div className="text-xs text-cyan-300 mb-3 font-bold uppercase tracking-wider text-center">
        {label}
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* LED Indicator */}
        <div className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full ${
              value ? 'led-indicator led-green' : 'bg-gray-600'
            }`}
          />
          <span className={`text-sm font-bold ${value ? 'text-accent-green' : 'text-gray-500'}`}>
            {value ? onLabel : offLabel}
          </span>
        </div>

        {/* Toggle Switch */}
        <motion.button
          onClick={handleToggle}
          className={`relative w-32 h-16 rounded-full border-2 ${
            value ? 'border-accent-green bg-accent-green/20' : 'border-gray-600 bg-gray-900/50'
          } transition-colors duration-300 cursor-pointer`}
          whileTap={{ scale: 0.95 }}
        >
          {/* Switch Handle */}
          <motion.div
            className={`absolute top-1 w-12 h-12 rounded-full ${
              value ? 'bg-accent-green' : 'bg-gray-600'
            }`}
            animate={{
              x: value ? 72 : 4,
              boxShadow: value
                ? '0 0 20px rgba(0, 255, 136, 0.8)'
                : '0 0 5px rgba(100, 100, 100, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />

          {/* Labels Inside Switch */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <span className={`text-xs font-bold ${value ? 'text-transparent' : 'text-gray-500'}`}>
              OFF
            </span>
            <span className={`text-xs font-bold ${value ? 'text-white' : 'text-transparent'}`}>
              ON
            </span>
          </div>
        </motion.button>

        {/* Status Text */}
        <div className={`text-xs ${value ? 'text-accent-green' : 'text-gray-500'}`}>
          {value ? '● ACTIVE' : '○ INACTIVE'}
        </div>
      </div>
    </div>
  );
}
