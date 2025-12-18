import { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Home, Camera, Navigation, Zap, Shield, Settings } from 'lucide-react';

interface ButtonConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'orange' | 'red' | 'magenta';
  action?: () => void;
}

const defaultButtons: ButtonConfig[] = [
  { id: 'arm', label: 'ARM', icon: <Power className="w-5 h-5" />, color: 'green' },
  { id: 'disarm', label: 'DISARM', icon: <Shield className="w-5 h-5" />, color: 'red' },
  { id: 'rtl', label: 'RTL', icon: <Home className="w-5 h-5" />, color: 'orange' },
  { id: 'auto', label: 'AUTO', icon: <Navigation className="w-5 h-5" />, color: 'cyan' },
  { id: 'photo', label: 'PHOTO', icon: <Camera className="w-5 h-5" />, color: 'magenta' },
  { id: 'video', label: 'VIDEO', icon: <Camera className="w-5 h-5" />, color: 'red' },
  { id: 'lights', label: 'LIGHTS', icon: <Zap className="w-5 h-5" />, color: 'cyan' },
  { id: 'config', label: 'CONFIG', icon: <Settings className="w-5 h-5" />, color: 'green' },
];

const colorMap = {
  cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-300', active: 'bg-cyan-500/40' },
  green: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-300', active: 'bg-green-500/40' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-400', text: 'text-orange-300', active: 'bg-orange-500/40' },
  red: { bg: 'bg-red-500/20', border: 'border-red-400', text: 'text-red-300', active: 'bg-red-500/40' },
  magenta: { bg: 'bg-magenta-500/20', border: 'border-magenta-400', text: 'text-magenta-300', active: 'bg-magenta-500/40' },
};

export default function ButtonGrid() {
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

  const handleButtonClick = (button: ButtonConfig) => {
    const newActive = new Set(activeButtons);
    
    // Toggle button state
    if (newActive.has(button.id)) {
      newActive.delete(button.id);
    } else {
      // Exclusive states for some buttons
      if (button.id === 'arm' || button.id === 'disarm') {
        newActive.delete('arm');
        newActive.delete('disarm');
      }
      newActive.add(button.id);
    }
    
    setActiveButtons(newActive);
    button.action?.();
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-80">
      <div className="text-xs text-cyan-300 mb-3 font-bold uppercase tracking-wider text-center">
        Quick Actions
      </div>

      <div className="grid grid-cols-4 gap-3">
        {defaultButtons.map((button, index) => {
          const colors = colorMap[button.color];
          const isActive = activeButtons.has(button.id);

          return (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(button)}
              className={`
                relative flex flex-col items-center justify-center
                p-3 rounded-lg border-2
                ${colors.border} ${isActive ? colors.active : colors.bg} ${colors.text}
                transition-all duration-200
                hover:shadow-lg
              `}
              style={{
                boxShadow: isActive ? `0 0 20px ${colors.border}` : 'none',
              }}
            >
              {/* LED Indicator */}
              <div
                className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                  isActive ? 'bg-current animate-pulse' : 'bg-gray-600'
                }`}
              />

              {/* Icon */}
              <div className="mb-1">{button.icon}</div>

              {/* Label */}
              <div className="text-[10px] font-bold uppercase tracking-wide">
                {button.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
