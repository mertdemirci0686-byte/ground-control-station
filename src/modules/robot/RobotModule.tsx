import { motion } from 'framer-motion';
import { Bot, Zap, Shield, Cpu } from 'lucide-react';

export default function RobotModule() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="glass-strong rounded-3xl p-12">
          <Bot className="w-24 h-24 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white neon-text mb-4">Robot Control</h1>
          <p className="text-gray-400 mb-8">
            Advanced robotics control interface for autonomous and remote-operated robots
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="glass rounded-xl p-6">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Power Systems</h3>
              <p className="text-sm text-gray-400">Battery, motors, and power management</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Safety</h3>
              <p className="text-sm text-gray-400">Emergency stop and collision avoidance</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Sensors</h3>
              <p className="text-sm text-gray-400">LIDAR, cameras, and IMU integration</p>
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
