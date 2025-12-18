import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RotaryDialProps {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  unit?: string;
}

export default function RotaryDial({
  label = 'Gimbal Tilt',
  min = -90,
  max = 90,
  value: externalValue,
  step = 1,
  onChange,
  unit = '°',
}: RotaryDialProps) {
  const [internalValue, setInternalValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const startValueRef = useRef(0);

  const value = externalValue !== undefined ? externalValue : internalValue;
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage * 270) - 135; // -135° to 135°

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startValueRef.current = value;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      startAngleRef.current = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    let angleDiff = currentAngle - startAngleRef.current;
    
    // Normalize angle difference
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    const valueDiff = (angleDiff / 270) * (max - min);
    let newValue = startValueRef.current + valueDiff;
    
    // Clamp and step
    newValue = Math.max(min, Math.min(max, newValue));
    newValue = Math.round(newValue / step) * step;
    
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="glass-strong rounded-lg p-4 w-56">
      <div className="text-xs text-cyan-300 mb-3 font-bold uppercase tracking-wider text-center">
        {label}
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Rotary Dial */}
        <div
          ref={containerRef}
          className="relative w-40 h-40 rounded-full border-4 border-cyan-500/50 bg-gradient-radial from-cyan-900/20 to-black cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Tick Marks */}
          {Array.from({ length: 13 }).map((_, i) => {
            const tickAngle = (i * 22.5) - 135; // -135° to 135° in 22.5° steps
            const isActive = (tickAngle + 135) <= (angle + 135);
            
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `rotate(${tickAngle}deg)`,
                  width: '50%',
                }}
              >
                <div
                  className={`ml-auto w-2 h-0.5 ${
                    isActive ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                  style={{ width: i % 3 === 0 ? '12px' : '8px' }}
                />
              </div>
            );
          })}

          {/* Center Knob */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-24 h-24 -mt-12 -ml-12 rounded-full border-4 border-cyan-400 bg-gradient-radial from-cyan-500/30 to-cyan-900/50 cursor-grab active:cursor-grabbing"
            style={{ rotate: angle }}
            animate={{
              boxShadow: isDragging
                ? '0 0 30px rgba(0, 255, 255, 0.8)'
                : '0 0 15px rgba(0, 255, 255, 0.5)',
            }}
          >
            {/* Pointer */}
            <div className="absolute top-2 left-1/2 w-1 h-8 bg-cyan-300 -ml-0.5 rounded-full" />
          </motion.div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-cyan-400" />
        </div>

        {/* Value Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-cyan-300 neon-text">
            {Math.round(value)}
            <span className="text-lg ml-1">{unit}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Range: {min}{unit} to {max}{unit}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex space-x-2">
          {[min, 0, max].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setInternalValue(preset);
                onChange?.(preset);
              }}
              className="px-3 py-1 text-xs rounded border border-cyan-500/50 bg-cyan-900/20 text-cyan-300 hover:bg-cyan-900/40 transition-colors"
            >
              {preset}{unit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
