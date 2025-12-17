import { useAppStore } from '../../store/appStore';
import { Navigation } from 'lucide-react';

export default function CompassWidget() {
  const { currentTelemetry } = useAppStore();
  const { yaw } = currentTelemetry;

  const cardinalPoints = [
    { angle: 0, label: 'N', color: 'text-error' },
    { angle: 45, label: 'NE', color: 'text-white' },
    { angle: 90, label: 'E', color: 'text-white' },
    { angle: 135, label: 'SE', color: 'text-white' },
    { angle: 180, label: 'S', color: 'text-white' },
    { angle: 225, label: 'SW', color: 'text-white' },
    { angle: 270, label: 'W', color: 'text-white' },
    { angle: 315, label: 'NW', color: 'text-white' },
  ];

  return (
    <div className="glass-strong rounded-lg p-4 w-48 h-48">
      <h3 className="text-xs font-bold text-white mb-2 text-center">Compass</h3>
      <div className="relative w-full h-32 flex items-center justify-center">
        {/* Compass Circle */}
        <div className="relative w-32 h-32 rounded-full border-2 border-white/20 bg-black/30">
          {/* Cardinal Points */}
          <div
            className="absolute inset-0 transition-transform duration-500"
            style={{ transform: `rotate(${-yaw}deg)` }}
          >
            {cardinalPoints.map((point) => {
              const rad = (point.angle * Math.PI) / 180;
              const x = 50 + Math.sin(rad) * 40;
              const y = 50 - Math.cos(rad) * 40;
              return (
                <div
                  key={point.label}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className={`text-sm font-bold ${point.color}`}
                    style={{ transform: `rotate(${yaw}deg)`, display: 'inline-block' }}
                  >
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Indicator (North Arrow) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Navigation
                className="w-8 h-8 text-primary"
                style={{
                  transform: `rotate(${yaw}deg)`,
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Tick Marks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = i * 10;
            const isCardinal = angle % 45 === 0;
            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 w-px h-2 bg-white/30 origin-bottom"
                style={{
                  height: isCardinal ? '8px' : '4px',
                  transform: `rotate(${angle}deg) translateX(-50%)`,
                  transformOrigin: 'bottom center',
                  bottom: 0,
                  top: 'auto',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Heading Display */}
      <div className="mt-2 text-center">
        <div className="text-2xl font-bold text-primary neon-text">
          {Math.round(yaw)}°
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {yaw >= 337.5 || yaw < 22.5
            ? 'North'
            : yaw >= 22.5 && yaw < 67.5
            ? 'Northeast'
            : yaw >= 67.5 && yaw < 112.5
            ? 'East'
            : yaw >= 112.5 && yaw < 157.5
            ? 'Southeast'
            : yaw >= 157.5 && yaw < 202.5
            ? 'South'
            : yaw >= 202.5 && yaw < 247.5
            ? 'Southwest'
            : yaw >= 247.5 && yaw < 292.5
            ? 'West'
            : 'Northwest'}
        </div>
      </div>
    </div>
  );
}
