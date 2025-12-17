import { motion } from 'framer-motion';
import { Package, Plus, Trash2, Edit } from 'lucide-react';

export default function ModuleManagement() {
  const customModules = [
    { id: 1, name: 'Custom Module 1', type: 'User Created', status: 'Active' },
    { id: 2, name: 'Custom Module 2', type: 'User Created', status: 'Inactive' },
  ];

  return (
    <div className="w-full h-full p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white neon-text mb-2">Module Management</h1>
          <p className="text-gray-400">Customize and manage your control modules</p>
        </div>

        {/* Add New Module */}
        <button className="w-full glass-strong rounded-xl p-8 mb-6 hover-scale border-2 border-dashed border-white/20 group">
          <Plus className="w-12 h-12 text-gray-400 group-hover:text-primary mx-auto mb-4 transition-colors" />
          <h3 className="text-lg font-bold text-white mb-2">Add New Module</h3>
          <p className="text-sm text-gray-400">Create a custom control module</p>
        </button>

        {/* Existing Modules */}
        <div className="space-y-4">
          {customModules.map((module) => (
            <div key={module.id} className="glass-strong rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{module.name}</h3>
                  <p className="text-sm text-gray-400">{module.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    module.status === 'Active'
                      ? 'bg-success/20 text-success'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {module.status}
                </span>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-5 h-5 text-gray-400 hover:text-primary" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5 text-gray-400 hover:text-error" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Module customization features coming soon
        </div>
      </motion.div>
    </div>
  );
}
