import { useAppStore } from '../../store/appStore';
import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function VerticalSpeed() {
  const { telemetry } = useAppStore();
  const [verticalSpeed, setVerticalSpeed] = useState(0);

  useEffect(() => {
    if (telemetry.length < 2) return;
    
    const current = telemetry[telemetry.length - 1];
    const previous = telemetry[telemetry.length - 2];
    const timeDiff = (current.timestamp - previous.timestamp) / 1000; // seconds
    
    if (timeDiff > 0) {
      const altDiff = current.altitude - previous.altitude;
      const speed = altDiff / timeDiff;
      setVerticalSpeed(speed);
    }
  }, [telemetry]);

  const getStatusColor = () => {
    if (Math.abs(verticalSpeed) < 0.5) return 'text-gray-400';
    return verticalSpeed > 0 ? 'text-accent-green' : 'text-warning-orange';
  };

  const getIcon = () => {
    if (Math.abs(verticalSpeed) < 0.5) return <Minus className="w-6 h-6" />;
    return verticalSpeed > 0 ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />;
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-32">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider text-center">
        Vertical Speed
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        {/* Visual Indicator */}
        <div className={`${getStatusColor()}`}>
          {getIcon()}
        </div>

        {/* Speed Value */}
        <div className={`text-3xl font-bold ${getStatusColor()} neon-text`}>
          {Math.abs(verticalSpeed).toFixed(1)}
        </div>
        
        <div className="text-xs text-gray-400">m/s</div>
        
        {/* Bar Indicator */}
        <div className="w-full h-24 border-2 border-cyan-500/50 rounded bg-black/50 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/50" />
          
          {/* Speed Bar */}
          <div
            className={`absolute left-0 right-0 transition-all duration-300 ${
              verticalSpeed >= 0 ? 'bg-accent-green/60' : 'bg-warning-orange/60'
            }`}
            style={{
              height: `${Math.min(Math.abs(verticalSpeed) * 10, 50)}%`,
              [verticalSpeed >= 0 ? 'bottom' : 'top']: '50%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
