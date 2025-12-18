import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';
import { Fan } from 'lucide-react';

export default function MotorRPM() {
  const { currentTelemetry } = useAppStore();
  
  // Simulate RPM based on speed and altitude
  const rpm = Math.round((currentTelemetry.speed * 20) + (currentTelemetry.altitude * 5) + 3000 + Math.random() * 200);
  const maxRPM = 8000;
  const percentage = (rpm / maxRPM) * 100;

  const getStatusColor = () => {
    if (percentage < 30) return 'text-cyan-400';
    if (percentage < 70) return 'text-accent-green';
    if (percentage < 90) return 'text-warning-orange';
    return 'text-critical-red';
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-40">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
        Motor RPM
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        {/* Animated Fan Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60 / (rpm / 1000), repeat: Infinity, ease: 'linear' }}
          className={getStatusColor()}
        >
          <Fan className="w-12 h-12" />
        </motion.div>

        {/* RPM Display */}
        <div className={`text-3xl font-bold ${getStatusColor()} neon-text`}>
          {rpm.toLocaleString()}
        </div>
        <div className="text-xs text-gray-400">RPM</div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-black/50 border border-cyan-500/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              percentage < 30 ? 'bg-cyan-400' :
              percentage < 70 ? 'bg-accent-green' :
              percentage < 90 ? 'bg-warning-orange' :
              'bg-critical-red'
            }`}
            style={{ width: `${percentage}%` }}
            animate={{ 
              boxShadow: [
                '0 0 5px currentColor',
                '0 0 15px currentColor',
                '0 0 5px currentColor',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        {/* Percentage */}
        <div className="text-xs text-gray-400">
          {percentage.toFixed(0)}% Max
        </div>
      </div>
    </div>
  );
}
