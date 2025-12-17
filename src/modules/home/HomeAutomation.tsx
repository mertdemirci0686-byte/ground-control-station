import { motion } from 'framer-motion';
import { Home, Lightbulb, Thermometer, Lock } from 'lucide-react';

export default function HomeAutomation() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="glass-strong rounded-3xl p-12">
          <Home className="w-24 h-24 text-warning mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white neon-text mb-4">Home Automation</h1>
          <p className="text-gray-400 mb-8">
            Smart home control for lighting, climate, security, and appliances
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="glass rounded-xl p-6">
              <Lightbulb className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Lighting</h3>
              <p className="text-sm text-gray-400">Smart bulbs and scene control</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Thermometer className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Climate</h3>
              <p className="text-sm text-gray-400">HVAC and temperature management</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Lock className="w-12 h-12 text-error mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Security</h3>
              <p className="text-sm text-gray-400">Cameras, locks, and alarm systems</p>
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
