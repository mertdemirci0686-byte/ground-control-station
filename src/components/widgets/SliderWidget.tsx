import { useState } from 'react';
import { motion } from 'framer-motion';

interface SliderWidgetProps {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  orientation?: 'horizontal' | 'vertical';
  unit?: string;
}

export default function SliderWidget({
  label = 'Slider',
  min = 0,
  max = 100,
  value: externalValue,
  onChange,
  orientation = 'vertical',
  unit = '%',
}: SliderWidgetProps) {
  const [internalValue, setInternalValue] = useState(50);
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  if (orientation === 'vertical') {
    return (
      <div className="glass-strong rounded-lg p-4 w-32">
        <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
          {label}
        </div>

        <div className="flex flex-col items-center space-y-3">
          {/* Value Display */}
          <div className="text-2xl font-bold text-cyan-300 neon-text">
            {Math.round(value)}
            <span className="text-sm ml-1">{unit}</span>
          </div>

          {/* Vertical Slider */}
          <div className="relative h-48 w-12">
            <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-full bg-black/50" />
            
            {/* Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500/80 to-cyan-300/60 rounded-full transition-all duration-200"
              style={{ height: `${percentage}%` }}
            />

            {/* Slider Handle */}
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' } as any}
            />

            <motion.div
              className="absolute left-1/2 w-16 h-4 -ml-8 rounded border-2 border-cyan-400 bg-cyan-500/50 cursor-pointer pointer-events-none"
              style={{ bottom: `calc(${percentage}% - 8px)` }}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0, 255, 255, 0.5)',
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                  '0 0 10px rgba(0, 255, 255, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-lg p-4 w-64">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider">
        {label}
      </div>

      <div className="flex items-center space-x-4">
        {/* Horizontal Slider */}
        <div className="relative flex-1 h-12">
          <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-full bg-black/50" />
          
          {/* Fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-500/80 to-cyan-300/60 rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />

          {/* Slider Input */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <motion.div
            className="absolute top-1/2 w-6 h-8 -mt-4 rounded border-2 border-cyan-400 bg-cyan-500/50 cursor-pointer pointer-events-none"
            style={{ left: `calc(${percentage}% - 12px)` }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(0, 255, 255, 0.8)',
                '0 0 10px rgba(0, 255, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Value Display */}
        <div className="text-2xl font-bold text-cyan-300 neon-text w-20 text-right">
          {Math.round(value)}
          <span className="text-sm ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}
