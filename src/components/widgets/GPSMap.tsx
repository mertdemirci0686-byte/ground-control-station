import { useAppStore } from '../../store/appStore';
import { MapPin, Satellite } from 'lucide-react';

export default function GPSMap() {
  const { currentTelemetry } = useAppStore();
  const { latitude, longitude } = currentTelemetry;

  return (
    <div className="glass-strong rounded-lg p-4 w-64 h-48">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-white">GPS Position</h3>
        <Satellite className="w-4 h-4 text-success" />
      </div>

      {/* Map Placeholder */}
      <div className="relative w-full h-24 bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg overflow-hidden mb-3">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        {/* Center Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-error animate-bounce" />
        </div>

        {/* Coordinates Overlay */}
        <div className="absolute bottom-2 left-2 right-2 glass rounded px-2 py-1">
          <p className="text-xs text-primary font-mono">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </p>
        </div>
      </div>

      {/* GPS Info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-gray-400">Latitude</p>
          <p className="text-white font-mono">{latitude.toFixed(6)}°</p>
        </div>
        <div>
          <p className="text-gray-400">Longitude</p>
          <p className="text-white font-mono">{longitude.toFixed(6)}°</p>
        </div>
        <div>
          <p className="text-gray-400">Satellites</p>
          <p className="text-success font-bold">12</p>
        </div>
        <div>
          <p className="text-gray-400">Accuracy</p>
          <p className="text-primary font-bold">±2m</p>
        </div>
      </div>
    </div>
  );
}
