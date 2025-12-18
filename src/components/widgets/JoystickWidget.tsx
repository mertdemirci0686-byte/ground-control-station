import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface JoystickWidgetProps {
  onMove?: (x: number, y: number) => void;
  deadzone?: number;
}

export default function JoystickWidget({ onMove, deadzone = 0.1 }: JoystickWidgetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;

    let dx = (clientX - centerX) / radius;
    let dy = (clientY - centerY) / radius;

    // Apply deadzone
    if (Math.abs(dx) < deadzone) dx = 0;
    if (Math.abs(dy) < deadzone) dy = 0;

    // Clamp to circle
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 1) {
      dx /= distance;
      dy /= distance;
    }

    setPosition({ x: dx, y: dy });
    onMove?.(dx, dy);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onMove?.(0, 0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="glass-strong rounded-lg p-4 w-56">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
        Joystick Control
      </div>

      <div
        ref={containerRef}
        className="relative w-40 h-40 mx-auto rounded-full border-2 border-cyan-500/50 bg-black/50"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-0.5 h-8 bg-cyan-400/30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="h-0.5 w-8 bg-cyan-400/30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Joystick Stick */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border-2 border-cyan-400 bg-cyan-500/30 cursor-grab active:cursor-grabbing"
          style={{
            x: position.x * 64,
            y: position.y * 64,
            translateX: '-50%',
            translateY: '-50%',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
          }}
          animate={{
            boxShadow: isDragging
              ? '0 0 30px rgba(0, 255, 255, 0.8)'
              : '0 0 20px rgba(0, 255, 255, 0.6)',
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-cyan-300 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>

      {/* Position Readout */}
      <div className="mt-3 flex justify-center space-x-4 text-xs">
        <div className="text-cyan-300">
          X: <span className="font-bold">{position.x.toFixed(2)}</span>
        </div>
        <div className="text-cyan-300">
          Y: <span className="font-bold">{position.y.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
