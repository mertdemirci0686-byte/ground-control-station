import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'critical';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const alertConfig = {
  info: {
    icon: Info,
    color: 'cyan',
    bgClass: 'bg-cyan-500/20',
    borderClass: 'border-cyan-400',
    textClass: 'text-cyan-300',
  },
  success: {
    icon: CheckCircle,
    color: 'green',
    bgClass: 'bg-green-500/20',
    borderClass: 'border-green-400',
    textClass: 'text-green-300',
  },
  warning: {
    icon: AlertTriangle,
    color: 'orange',
    bgClass: 'bg-orange-500/20',
    borderClass: 'border-orange-400',
    textClass: 'text-orange-300',
  },
  error: {
    icon: AlertCircle,
    color: 'red',
    bgClass: 'bg-red-500/20',
    borderClass: 'border-red-400',
    textClass: 'text-red-300',
  },
  critical: {
    icon: AlertTriangle,
    color: 'red',
    bgClass: 'bg-red-500/40',
    borderClass: 'border-red-500',
    textClass: 'text-red-100',
  },
};

export default function AlertSystem({ alerts, onDismiss }: AlertSystemProps) {
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    setVisibleAlerts(alerts);

    // Auto-dismiss non-persistent alerts
    alerts.forEach((alert) => {
      if (!alert.persistent) {
        const duration = alert.duration || (alert.type === 'critical' ? 10000 : 5000);
        setTimeout(() => {
          onDismiss(alert.id);
        }, duration);
      }
    });
  }, [alerts]);

  // Critical alerts should be shown in the center
  const criticalAlerts = visibleAlerts.filter(a => a.type === 'critical');
  const normalAlerts = visibleAlerts.filter(a => a.type !== 'critical');

  return (
    <>
      {/* Critical Alerts - Center Screen */}
      <AnimatePresence>
        {criticalAlerts.map((alert) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />

              {/* Alert Content */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className={`
                  relative glass-strong rounded-xl p-8 max-w-md w-full mx-4
                  border-4 ${config.borderClass}
                  pointer-events-auto
                `}
                style={{
                  boxShadow: `0 0 60px rgba(255, 0, 85, 0.6)`,
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <Icon className={`w-16 h-16 ${config.textClass}`} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-center mb-3 ${config.textClass} neon-text`}>
                  {alert.title}
                </h3>

                {/* Message */}
                <p className="text-center text-gray-300 text-lg">
                  {alert.message}
                </p>

                {/* Dismiss Button */}
                <button
                  onClick={() => onDismiss(alert.id)}
                  className={`
                    mt-6 w-full py-3 rounded-lg font-bold uppercase
                    ${config.bgClass} border-2 ${config.borderClass} ${config.textClass}
                    hover:brightness-125 transition-all
                  `}
                >
                  Acknowledge
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Normal Alerts - Top Right */}
      <div className="fixed top-24 right-6 z-[150] space-y-3 max-w-md">
        <AnimatePresence>
          {normalAlerts.map((alert) => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                className={`
                  glass-strong rounded-lg p-4 border-2 ${config.borderClass}
                  ${config.bgClass} flex items-start space-x-3
                `}
                style={{
                  boxShadow: `0 0 20px ${config.color === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 
                    config.color === 'green' ? 'rgba(0, 255, 136, 0.3)' :
                    config.color === 'orange' ? 'rgba(255, 170, 0, 0.3)' :
                    'rgba(255, 0, 85, 0.3)'}`,
                }}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Icon className={`w-6 h-6 ${config.textClass}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold ${config.textClass} mb-1`}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-gray-300">
                    {alert.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
