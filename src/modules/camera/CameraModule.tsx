import { motion } from 'framer-motion';
import { Camera, Video, Image, Grid3x3 } from 'lucide-react';

export default function CameraModule() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="glass-strong rounded-3xl p-12">
          <Camera className="w-24 h-24 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white neon-text mb-4">Camera System</h1>
          <p className="text-gray-400 mb-8">
            Multi-camera streaming, recording, and image processing
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="glass rounded-xl p-6">
              <Video className="w-12 h-12 text-error mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Live Stream</h3>
              <p className="text-sm text-gray-400">Real-time video feeds from multiple cameras</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Image className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Capture</h3>
              <p className="text-sm text-gray-400">Photo and video recording</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Grid3x3 className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Multi-View</h3>
              <p className="text-sm text-gray-400">Split screen and grid layouts</p>
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
