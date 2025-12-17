import { useAppStore } from '../../store/appStore';

export default function AltitudeGauge() {
  const { currentTelemetry } = useAppStore();
  const { altitude } = currentTelemetry;
  const maxAltitude = 500;
  const percentage = Math.min((altitude / maxAltitude) * 100, 100);

  return (
    <div className="glass-strong rounded-lg p-4 w-32 h-64">
      <h3 className="text-xs font-bold text-white mb-2 text-center">Altitude</h3>
      <div className="relative w-full h-full">
        {/* Gauge Background */}
        <div className="absolute inset-0 bg-white/5 rounded-lg overflow-hidden">
          {/* Scale Marks */}
          {[0, 100, 200, 300, 400, 500].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 h-px bg-white/20"
              style={{ bottom: `${(mark / maxAltitude) * 100}%` }}
            >
              <span className="absolute left-2 -top-2 text-xs text-gray-400">
                {mark}
              </span>
            </div>
          ))}

          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-success to-primary transition-all duration-500"
            style={{ height: `${percentage}%` }}
          />
        </div>

        {/* Current Value Indicator */}
        <div
          className="absolute left-0 right-0 h-8 flex items-center justify-center"
          style={{
            bottom: `${percentage}%`,
            transform: 'translateY(50%)',
          }}
        >
          <div className="glass-strong rounded-lg px-2 py-1 border border-primary">
            <span className="text-sm font-bold text-primary">
              {Math.round(altitude)}m
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
