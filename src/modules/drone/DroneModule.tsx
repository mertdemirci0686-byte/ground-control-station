import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const drones = [
  {
    id: 'mavic-3',
    name: 'DJI Mavic 3',
    image: '🚁',
    specs: {
      maxSpeed: '75 km/h',
      maxAltitude: '6000 m',
      flightTime: '46 min',
      range: '30 km',
    },
    description: 'Professional cinematography drone with Hasselblad camera',
  },
  {
    id: 'fpv-racer',
    name: 'FPV Racing Drone',
    image: '🏎️',
    specs: {
      maxSpeed: '150 km/h',
      maxAltitude: '1000 m',
      flightTime: '8 min',
      range: '2 km',
    },
    description: 'High-speed racing drone for competitive FPV',
  },
  {
    id: 'agricultural',
    name: 'Agricultural Drone',
    image: '🌾',
    specs: {
      maxSpeed: '60 km/h',
      maxAltitude: '500 m',
      flightTime: '35 min',
      range: '10 km',
    },
    description: 'Precision agriculture with spraying capabilities',
  },
  {
    id: 'delivery',
    name: 'Delivery Drone',
    image: '📦',
    specs: {
      maxSpeed: '90 km/h',
      maxAltitude: '400 m',
      flightTime: '30 min',
      range: '20 km',
    },
    description: 'Autonomous delivery system with payload capacity',
  },
];

export default function DroneModule() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? drones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === drones.length - 1 ? 0 : prev + 1));
  };

  const handleLaunchCockpit = () => {
    navigate(`/drone/cockpit/${drones[currentIndex].id}`);
  };

  const currentDrone = drones[currentIndex];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white neon-text mb-2">Drone Control</h1>
          <p className="text-gray-400">Select your drone and launch cockpit</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 glass-strong rounded-full hover-scale"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 glass-strong rounded-full hover-scale"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Drone Card */}
          <div className="px-24">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentDrone.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.3 }}
                className="glass-strong rounded-3xl p-12 border border-white/20"
              >
                {/* Drone Image */}
                <div className="text-center mb-8">
                  <div className="text-9xl mb-4">{currentDrone.image}</div>
                  <h2 className="text-3xl font-bold text-white mb-2">{currentDrone.name}</h2>
                  <p className="text-gray-400">{currentDrone.description}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Max Speed</p>
                    <p className="text-lg font-bold text-primary">{currentDrone.specs.maxSpeed}</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Max Altitude</p>
                    <p className="text-lg font-bold text-success">
                      {currentDrone.specs.maxAltitude}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Flight Time</p>
                    <p className="text-lg font-bold text-warning">
                      {currentDrone.specs.flightTime}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Range</p>
                    <p className="text-lg font-bold text-secondary">{currentDrone.specs.range}</p>
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={handleLaunchCockpit}
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white text-lg hover-scale neon-glow-cyan flex items-center justify-center space-x-3"
                >
                  <Play className="w-6 h-6" />
                  <span>Launch Cockpit</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {drones.map((drone, index) => (
              <button
                key={drone.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
