import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';

export default function HeadingTape() {
  const { currentTelemetry } = useAppStore();
  const heading = currentTelemetry.yaw || 0;

  // Generate tick marks from 0 to 360
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 360; i += 10) {
      ticks.push(i);
    }
    return ticks;
  };

  const ticks = generateTicks();
  const offset = -(heading % 360) * 2; // 2px per degree

  return (
    <div className="glass-strong rounded-lg p-3 w-64">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
        Heading
      </div>
      
      {/* Tape Container */}
      <div className="relative h-12 overflow-hidden border-2 border-cyan-500/50 rounded bg-black/50">
        {/* Center Marker */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-cyan-400 z-10" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-400" />
        </div>
        
        {/* Scrolling Tape */}
        <motion.div
          className="absolute top-0 left-1/2 h-full flex items-center"
          style={{ x: offset }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {ticks.map((degree) => {
            const isMajor = degree % 30 === 0;
            return (
              <div
                key={degree}
                className="flex flex-col items-center"
                style={{ width: '20px' }}
              >
                {isMajor ? (
                  <>
                    <div className="w-px h-6 bg-cyan-400" />
                    <div className="text-xs text-cyan-300 font-bold mt-1">
                      {degree === 0 ? 'N' : degree === 90 ? 'E' : degree === 180 ? 'S' : degree === 270 ? 'W' : degree}
                    </div>
                  </>
                ) : (
                  <div className="w-px h-3 bg-cyan-400/50 mt-1.5" />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Digital Readout */}
      <div className="text-center mt-2">
        <span className="text-2xl font-bold text-cyan-300 neon-text">
          {Math.round(heading)}°
        </span>
      </div>
    </div>
  );
}
