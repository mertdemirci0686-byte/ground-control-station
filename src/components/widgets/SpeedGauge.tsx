import { useAppStore } from '../../store/appStore';

export default function SpeedGauge() {
  const { currentTelemetry } = useAppStore();
  const { speed } = currentTelemetry;
  const maxSpeed = 120;
  const angle = (speed / maxSpeed) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="glass-strong rounded-lg p-4 w-48 h-48">
      <h3 className="text-xs font-bold text-white mb-2 text-center">Speed</h3>
      <div className="relative w-full h-32 flex items-end justify-center">
        {/* Arc Background */}
        <svg className="absolute inset-0" viewBox="0 0 200 100">
          {/* Background Arc */}
          <path
            d="M 20,90 A 80,80 0 0,1 180,90"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Speed Arc */}
          <path
            d="M 20,90 A 80,80 0 0,1 180,90"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="8"
            strokeDasharray={`${(speed / maxSpeed) * 251.2} 251.2`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="#00f3ff" />
            </linearGradient>
          </defs>
          
          {/* Scale Marks */}
          {[0, 30, 60, 90, 120].map((mark) => {
            const markAngle = (mark / maxSpeed) * 180 - 90;
            const rad = (markAngle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 85;
            const y = 90 + Math.sin(rad) * 85;
            return (
              <g key={mark}>
                <circle cx={x} cy={y} r="2" fill="white" opacity="0.5" />
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  opacity="0.7"
                >
                  {mark}
                </text>
              </g>
            );
          })}

          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2={100 + Math.cos((angle * Math.PI) / 180) * 70}
            y2={90 + Math.sin((angle * Math.PI) / 180) * 70}
            stroke="#00f3ff"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <circle cx="100" cy="90" r="5" fill="#00f3ff" />
        </svg>
      </div>

      {/* Digital Display */}
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold text-primary neon-text">
          {Math.round(speed)}
        </div>
        <div className="text-xs text-gray-400 mt-1">km/h</div>
      </div>
    </div>
  );
}
