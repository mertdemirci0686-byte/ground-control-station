import { useAppStore } from '../../store/appStore';

export default function ArtificialHorizon() {
  const { currentTelemetry } = useAppStore();
  const { roll, pitch } = currentTelemetry;

  return (
    <div className="glass-strong rounded-lg p-4 w-64 h-64">
      <h3 className="text-sm font-bold text-white mb-2 text-center">Artificial Horizon</h3>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
        {/* Sky/Ground Background */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotate(${roll}deg)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Sky */}
          <div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-blue-600 to-blue-400"
            style={{
              height: '50%',
              transform: `translateY(${pitch * 2}px)`,
              transition: 'transform 0.3s ease',
            }}
          />
          {/* Ground */}
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-amber-800 to-amber-600"
            style={{
              height: '50%',
              transform: `translateY(${-pitch * 2}px)`,
              transition: 'transform 0.3s ease',
            }}
          />
          {/* Horizon Line */}
          <div
            className="absolute inset-x-0 bg-white h-0.5"
            style={{
              top: '50%',
              transform: `translateY(${pitch * 2}px)`,
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        {/* Center Reference */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="w-2 h-2 bg-primary rounded-full border-2 border-white" />
            <div className="absolute top-1/2 left-full w-8 h-0.5 bg-white ml-1 -mt-px" />
            <div className="absolute top-1/2 right-full w-8 h-0.5 bg-white mr-1 -mt-px" />
          </div>
        </div>

        {/* Roll Indicator */}
        <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none">
          <div className="relative w-32 h-4">
            {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((angle) => (
              <div
                key={angle}
                className="absolute top-0 w-0.5 h-2 bg-white"
                style={{
                  left: '50%',
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  transformOrigin: 'center 32px',
                }}
              />
            ))}
            <div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-primary bg-black"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${roll}deg)`,
                transformOrigin: 'center top',
              }}
            />
          </div>
        </div>

        {/* Pitch Ladder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[-20, -10, 10, 20].map((deg) => (
            <div
              key={deg}
              className="absolute flex items-center"
              style={{
                transform: `translateY(${-deg * 2 + pitch * 2}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <div className="w-12 h-px bg-white opacity-70" />
              <span className="text-xs text-white mx-2">{deg > 0 ? `+${deg}` : deg}°</span>
              <div className="w-12 h-px bg-white opacity-70" />
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-gray-400">Roll: <span className="text-primary font-bold">{roll.toFixed(1)}°</span></span>
        <span className="text-gray-400">Pitch: <span className="text-success font-bold">{pitch.toFixed(1)}°</span></span>
      </div>
    </div>
  );
}
