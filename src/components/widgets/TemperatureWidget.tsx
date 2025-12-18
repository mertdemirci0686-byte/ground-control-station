import { useAppStore } from '../../store/appStore';
import { Thermometer } from 'lucide-react';

export default function TemperatureWidget() {
  const { currentTelemetry } = useAppStore();
  const temp = currentTelemetry.temperature || 25;

  const getStatusColor = () => {
    if (temp < 0) return 'text-cyan-400';
    if (temp < 25) return 'text-accent-green';
    if (temp < 50) return 'text-warning-orange';
    return 'text-critical-red';
  };

  const getBarHeight = () => {
    // Map temperature to 0-100% (0°C to 100°C range)
    return Math.min(Math.max((temp / 100) * 100, 0), 100);
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-32">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
        Temperature
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        {/* Thermometer Icon */}
        <div className={getStatusColor()}>
          <Thermometer className="w-8 h-8" />
        </div>

        {/* Temperature Display */}
        <div className={`text-3xl font-bold ${getStatusColor()} neon-text`}>
          {temp.toFixed(1)}°
        </div>
        
        {/* Thermometer Bar */}
        <div className="w-8 h-32 border-2 border-cyan-500/50 rounded-full bg-black/50 relative overflow-hidden">
          {/* Scale Marks */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400/30" />
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-cyan-400/30" />
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/30" />
          <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-cyan-400/30" />
          
          {/* Temperature Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
              temp < 0 ? 'bg-cyan-400/80' :
              temp < 25 ? 'bg-accent-green/80' :
              temp < 50 ? 'bg-warning-orange/80' :
              'bg-critical-red/80'
            }`}
            style={{ height: `${getBarHeight()}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="text-xs text-gray-400">
          {temp < 0 ? 'COLD' : temp < 25 ? 'NORMAL' : temp < 50 ? 'WARM' : 'HOT'}
        </div>
      </div>
    </div>
  );
}
