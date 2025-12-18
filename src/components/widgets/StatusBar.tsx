import { useAppStore } from '../../store/appStore';
import { Clock, Navigation, Satellite, Battery } from 'lucide-react';

export default function StatusBar() {
  const { currentTelemetry } = useAppStore();

  const distance = Math.sqrt(
    Math.pow(currentTelemetry.latitude - 37.7749, 2) +
    Math.pow(currentTelemetry.longitude - (-122.4194), 2)
  ) * 111000; // Rough conversion to meters

  const flightTime = Math.floor((Date.now() - currentTelemetry.timestamp) / 1000);
  const minutes = Math.floor(flightTime / 60);
  const seconds = flightTime % 60;

  const isArmed = currentTelemetry.speed > 0 || currentTelemetry.altitude > 1;
  const satelliteCount = 12 + Math.floor(Math.random() * 4);
  
  // Flight mode simulation
  const getFlightMode = () => {
    if (currentTelemetry.altitude < 1) return 'STANDBY';
    if (currentTelemetry.speed < 5) return 'LOITER';
    if (currentTelemetry.altitude > 100) return 'AUTO';
    return 'STABILIZE';
  };

  return (
    <div className="glass-strong rounded-lg p-3 flex items-center justify-between space-x-4 text-sm">
      {/* Distance to Home */}
      <div className="flex items-center space-x-2">
        <Navigation className="w-4 h-4 text-cyan-400" />
        <span className="text-gray-400">DIST:</span>
        <span className="text-cyan-300 font-bold">{distance.toFixed(0)}m</span>
      </div>

      {/* Flight Time */}
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span className="text-gray-400">TIME:</span>
        <span className="text-cyan-300 font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>

      {/* Flight Mode */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">MODE:</span>
        <span className={`font-bold ${
          getFlightMode() === 'STABILIZE' ? 'text-accent-green' :
          getFlightMode() === 'AUTO' ? 'text-warning-orange' :
          'text-cyan-300'
        }`}>
          {getFlightMode()}
        </span>
      </div>

      {/* ARM Status */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">ARM:</span>
        <div className={`w-3 h-3 rounded-full ${isArmed ? 'led-indicator led-green' : 'bg-gray-600'}`} />
        <span className={`font-bold ${isArmed ? 'text-accent-green' : 'text-gray-500'}`}>
          {isArmed ? '✓' : '✕'}
        </span>
      </div>

      {/* Satellite Count */}
      <div className="flex items-center space-x-2">
        <Satellite className="w-4 h-4 text-cyan-400" />
        <span className="text-gray-400">SAT:</span>
        <span className="text-cyan-300 font-bold">{satelliteCount}</span>
      </div>

      {/* Battery */}
      <div className="flex items-center space-x-2">
        <Battery className="w-4 h-4 text-accent-green" />
        <span className="text-accent-green font-bold">{Math.round(currentTelemetry.battery)}%</span>
      </div>
    </div>
  );
}
