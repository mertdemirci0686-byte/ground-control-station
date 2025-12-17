import { motion } from 'framer-motion';
import { Car, Gauge, Navigation, Wrench } from 'lucide-react';

export default function VehicleModule() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="glass-strong rounded-3xl p-12">
          <Car className="w-24 h-24 text-success mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white neon-text mb-4">Vehicle Monitor</h1>
          <p className="text-gray-400 mb-8">
            Real-time vehicle diagnostics, telemetry, and autonomous driving control
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="glass rounded-xl p-6">
              <Gauge className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Diagnostics</h3>
              <p className="text-sm text-gray-400">Engine, transmission, and systems health</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Navigation className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Navigation</h3>
              <p className="text-sm text-gray-400">GPS tracking and route planning</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Wrench className="w-12 h-12 text-error mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Maintenance</h3>
              <p className="text-sm text-gray-400">Service alerts and maintenance logs</p>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            This module is under development. Full functionality coming soon.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
