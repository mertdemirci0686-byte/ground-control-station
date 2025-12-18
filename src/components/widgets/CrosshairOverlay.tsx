import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface CrosshairOverlayProps {
  locked?: boolean;
  targetDistance?: number;
}

export default function CrosshairOverlay({ locked = false, targetDistance }: CrosshairOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Center Crosshair */}
      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-1/2 w-16 h-px bg-cyan-400 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-1/2 left-0 w-2 h-px bg-cyan-400 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-2 h-px bg-cyan-400 -translate-y-1/2" />
        </div>

        {/* Vertical Line */}
        <div className="absolute top-1/2 left-1/2 h-16 w-px bg-cyan-400 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-1/2 h-2 w-px bg-cyan-400 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 h-2 w-px bg-cyan-400 -translate-x-1/2" />
        </div>

        {/* Center Dot */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${
            locked ? 'bg-critical-red' : 'bg-cyan-400'
          }`}
          animate={{
            scale: locked ? [1, 1.5, 1] : 1,
            opacity: locked ? [1, 0.5, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: locked ? Infinity : 0,
          }}
        />

        {/* Corner Brackets */}
        {[
          { x: -40, y: -40, rotate: 0 },
          { x: 40, y: -40, rotate: 90 },
          { x: 40, y: 40, rotate: 180 },
          { x: -40, y: 40, rotate: 270 },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 border-l-2 border-t-2 border-cyan-400"
            style={{
              left: corner.x,
              top: corner.y,
              rotate: corner.rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Animated Ring */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-24 h-24 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 ${
            locked ? 'border-critical-red' : 'border-cyan-400/50'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Target Lock Indicator */}
        {locked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <Target className="w-16 h-16 text-critical-red" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="glass-strong px-3 py-1 rounded border border-critical-red">
                  <span className="text-critical-red text-xs font-bold">
                    TARGET LOCKED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Distance Display */}
        {targetDistance && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          >
            <div className="glass-strong px-4 py-2 rounded border border-cyan-400">
              <div className="text-center">
                <div className="text-xs text-cyan-400 uppercase">Distance</div>
                <div className="text-lg font-bold text-cyan-300">
                  {targetDistance.toFixed(1)}m
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Range Circles */}
      {[100, 200, 300].map((radius, i) => (
        <motion.div
          key={radius}
          className="absolute top-1/2 left-1/2 rounded-full border border-cyan-400/20"
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            marginLeft: `-${radius / 2}px`,
            marginTop: `-${radius / 2}px`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
