import { motion } from 'framer-motion';
import { ShoppingCart, Star, Download } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Advanced Telemetry Pack',
    price: '$29.99',
    rating: 4.8,
    downloads: 1234,
    image: '📊',
    description: 'Enhanced telemetry widgets and data logging',
  },
  {
    id: 2,
    name: 'FPV Camera Bundle',
    price: '$19.99',
    rating: 4.6,
    downloads: 892,
    image: '📹',
    description: 'Professional FPV camera controls and OSD',
  },
  {
    id: 3,
    name: 'Autopilot Suite',
    price: '$49.99',
    rating: 4.9,
    downloads: 2341,
    image: '🤖',
    description: 'Autonomous flight planning and waypoints',
  },
  {
    id: 4,
    name: 'Custom Themes Pack',
    price: '$9.99',
    rating: 4.5,
    downloads: 567,
    image: '🎨',
    description: '10 premium themes for your GCS',
  },
  {
    id: 5,
    name: 'Mission Planner Pro',
    price: '$39.99',
    rating: 4.7,
    downloads: 1567,
    image: '🗺️',
    description: 'Advanced mission planning tools',
  },
  {
    id: 6,
    name: 'Diagnostic Tools',
    price: '$24.99',
    rating: 4.4,
    downloads: 789,
    image: '🔧',
    description: 'Hardware diagnostics and calibration',
  },
];

export default function MarketPlace() {
  return (
    <div className="w-full h-full p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white neon-text mb-2">Marketplace</h1>
          <p className="text-gray-400">Extend your Ground Control Station with premium features</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl overflow-hidden hover-scale group"
            >
              {/* Product Image */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center text-6xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{product.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-sm text-white font-bold">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-400">{product.downloads}</span>
                  </div>
                </div>

                {/* Price and Buy Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover-scale flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Marketplace transactions are simulated for demonstration
        </div>
      </motion.div>
    </div>
  );
}
