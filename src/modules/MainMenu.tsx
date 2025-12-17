import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plane,
  Bot,
  Car,
  Home,
  Settings,
  BarChart3,
  Camera,
  Code,
  ShoppingCart,
  Plus,
} from 'lucide-react';

const modules = [
  { id: 'drone', name: 'Drone', icon: Plane, path: '/drone', color: 'from-primary to-blue-500' },
  { id: 'robot', name: 'Robot', icon: Bot, path: '/robot', color: 'from-secondary to-purple-500' },
  { id: 'vehicle', name: 'Vehicle', icon: Car, path: '/vehicle', color: 'from-success to-green-500' },
  { id: 'home', name: 'Home', icon: Home, path: '/home', color: 'from-warning to-orange-500' },
  { id: 'management', name: 'Modules', icon: Settings, path: '/management', color: 'from-pink-500 to-rose-500' },
  { id: 'telemetry', name: 'Telemetry', icon: BarChart3, path: '/telemetry', color: 'from-cyan-500 to-blue-500' },
  { id: 'camera', name: 'Camera', icon: Camera, path: '/camera', color: 'from-purple-500 to-indigo-500' },
  { id: 'developer', name: 'Developer', icon: Code, path: '/developer', color: 'from-green-500 to-teal-500' },
  { id: 'market', name: 'Market', icon: ShoppingCart, path: '/market', color: 'from-amber-500 to-yellow-500' },
];

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white neon-text mb-2">
            Ground Control Station
          </h1>
          <p className="text-gray-400">Select a module to get started</p>
        </motion.div>

        {/* Module Grid */}
        <motion.div
          className="grid grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.button
                key={module.id}
                onClick={() => navigate(module.path)}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`glass-strong rounded-2xl p-8 group cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${module.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Open {module.name.toLowerCase()} module
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br ${module.color}`} style={{ opacity: 0.3 }} />
                </div>
              </motion.button>
            );
          })}

          {/* Add New Module */}
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/management')}
            className="glass-strong rounded-2xl p-8 group cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden border-2 border-dashed border-white/20"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  <Plus className="w-12 h-12 text-gray-400 group-hover:text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 group-hover:text-white mb-2 transition-colors">
                Add New
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Customize modules
              </p>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
