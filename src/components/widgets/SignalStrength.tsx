import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';
import { Radio, TrendingUp, TrendingDown } from 'lucide-react';

export default function SignalStrength() {
  const { currentTelemetry } = useAppStore();
  const rssi = currentTelemetry.rssi || -50;

  // Convert RSSI to percentage (rough estimation)
  // -30 dBm (excellent) to -90 dBm (poor)
  const percentage = Math.max(0, Math.min(100, ((rssi + 90) / 60) * 100));

  const getSignalQuality = () => {
    if (rssi > -50) return { text: 'EXCELLENT', color: 'text-accent-green', bars: 5 };
    if (rssi > -60) return { text: 'GOOD', color: 'text-cyan-400', bars: 4 };
    if (rssi > -70) return { text: 'FAIR', color: 'text-warning-orange', bars: 3 };
    if (rssi > -80) return { text: 'WEAK', color: 'text-orange-500', bars: 2 };
    return { text: 'POOR', color: 'text-critical-red', bars: 1 };
  };

  const quality = getSignalQuality();

  return (
    <div className="glass-strong rounded-lg p-4 w-56">
      <div className="text-xs text-cyan-300 mb-3 font-bold uppercase tracking-wider text-center">
        Signal Strength
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Radio Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={quality.color}
        >
          <Radio className="w-12 h-12" />
        </motion.div>

        {/* RSSI Value */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${quality.color} neon-text`}>
            {rssi.toFixed(0)}
          </div>
          <div className="text-xs text-gray-400 mt-1">dBm</div>
        </div>

        {/* Quality Text */}
        <div className={`text-lg font-bold ${quality.color}`}>
          {quality.text}
        </div>

        {/* Signal Bars */}
        <div className="flex space-x-2 items-end">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className={`w-4 rounded-t ${
                bar <= quality.bars 
                  ? quality.color.replace('text-', 'bg-')
                  : 'bg-gray-700'
              }`}
              style={{ height: `${bar * 8}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: bar * 0.1 }}
            />
          ))}
        </div>

        {/* Percentage Bar */}
        <div className="w-full h-3 bg-black/50 border border-cyan-500/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${quality.color.replace('text-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
            animate={{
              boxShadow: [
                '0 0 5px currentColor',
                '0 0 15px currentColor',
                '0 0 5px currentColor',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Percentage */}
        <div className="text-sm text-gray-400">
          {percentage.toFixed(0)}% Quality
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center space-x-2 text-xs">
          {percentage > 50 ? (
            <>
              <TrendingUp className="w-4 h-4 text-accent-green" />
              <span className="text-accent-green">Stable</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-4 h-4 text-critical-red" />
              <span className="text-critical-red">Degraded</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
