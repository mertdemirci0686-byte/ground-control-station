import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Lock, Unlock, Copy, Settings, Maximize2, Image } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onLock?: () => void;
  onUnlock?: () => void;
  onCopy?: () => void;
  onSettings?: () => void;
  onResize?: () => void;
  onChangeBackground?: () => void;
  isLocked?: boolean;
}

export default function ContextMenu({
  x,
  y,
  visible,
  onClose,
  onEdit,
  onDelete,
  onLock,
  onUnlock,
  onCopy,
  onSettings,
  onResize,
  onChangeBackground,
  isLocked = false,
}: ContextMenuProps) {
  const menuItems = [
    { icon: <Edit className="w-4 h-4" />, label: 'Edit', action: onEdit, color: 'cyan' },
    { icon: <Trash2 className="w-4 h-4" />, label: 'Delete', action: onDelete, color: 'red' },
    { icon: <Maximize2 className="w-4 h-4" />, label: 'Resize', action: onResize, color: 'cyan' },
    isLocked 
      ? { icon: <Unlock className="w-4 h-4" />, label: 'Unlock', action: onUnlock, color: 'green' }
      : { icon: <Lock className="w-4 h-4" />, label: 'Lock', action: onLock, color: 'orange' },
    { icon: <Copy className="w-4 h-4" />, label: 'Copy', action: onCopy, color: 'cyan' },
    { icon: <Image className="w-4 h-4" />, label: 'Change Background', action: onChangeBackground, color: 'magenta' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', action: onSettings, color: 'cyan' },
  ];

  const colorMap: Record<string, string> = {
    cyan: 'hover:bg-cyan-500/20 hover:text-cyan-300',
    red: 'hover:bg-red-500/20 hover:text-red-300',
    green: 'hover:bg-green-500/20 hover:text-green-300',
    orange: 'hover:bg-orange-500/20 hover:text-orange-300',
    magenta: 'hover:bg-magenta-500/20 hover:text-magenta-300',
  };

  const handleItemClick = (action?: () => void) => {
    action?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-[100]"
            onClick={onClose}
          />

          {/* Context Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[101] glass-strong rounded-lg border-2 border-cyan-500/50 overflow-hidden min-w-[200px]"
            style={{
              left: x,
              top: y,
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
            }}
          >
            {menuItems.map((item, index) => (
              item.action && (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleItemClick(item.action)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3
                    text-left text-sm text-gray-300
                    transition-all duration-150
                    ${colorMap[item.color]}
                    ${index > 0 ? 'border-t border-cyan-500/20' : ''}
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 font-medium">{item.label}</span>
                </motion.button>
              )
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
