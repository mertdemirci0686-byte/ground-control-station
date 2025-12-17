import { useAppStore } from '../../store/appStore';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';

export default function BatteryWidget() {
  const { currentTelemetry } = useAppStore();
  const { battery, voltage } = currentTelemetry;

  const getBatteryColor = () => {
    if (battery > 60) return 'text-success';
    if (battery > 30) return 'text-warning';
    return 'text-error';
  };

  const getBatteryIcon = () => {
    if (battery < 20) return <BatteryWarning className="w-8 h-8" />;
    if (battery > 90) return <BatteryCharging className="w-8 h-8" />;
    return <Battery className="w-8 h-8" />;
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-48 h-32">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-white">Battery</h3>
        <div className={getBatteryColor()}>{getBatteryIcon()}</div>
      </div>

      {/* Battery Bar */}
      <div className="relative w-full h-8 bg-white/10 rounded-lg overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-500 ${
            battery > 60
              ? 'bg-gradient-to-r from-success to-primary'
              : battery > 30
              ? 'bg-gradient-to-r from-warning to-error'
              : 'bg-error'
          }`}
          style={{ width: `${battery}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white drop-shadow-lg">
            {Math.round(battery)}%
          </span>
        </div>
      </div>

      {/* Voltage and Stats */}
      <div className="flex justify-between text-xs">
        <div>
          <p className="text-gray-400">Voltage</p>
          <p className="text-primary font-bold">{voltage.toFixed(2)}V</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Cells</p>
          <p className="text-success font-bold">3S</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Time</p>
          <p className="text-warning font-bold">
            {Math.floor((battery / 100) * 25)}m
          </p>
        </div>
      </div>
    </div>
  );
}
