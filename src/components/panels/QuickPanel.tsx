import { motion, AnimatePresence } from 'framer-motion';
import { X, Wifi, Bluetooth, Usb, Battery, Signal, Sun, Fan } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export default function QuickPanel() {
  const {
    quickPanelOpen,
    setQuickPanelOpen,
    connections,
    setConnection,
    currentTelemetry,
    brightness,
    fanSpeed,
    setBrightness,
    setFanSpeed,
    addNotification,
  } = useAppStore();

  const handleToggle = (type: 'wifi' | 'bluetooth' | 'serial') => {
    const newState = !connections[type];
    setConnection(type, newState);
    addNotification(
      'info',
      `${type.toUpperCase()} ${newState ? 'enabled' : 'disabled'}`
    );
  };

  return (
    <AnimatePresence>
      {quickPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickPanelOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            exit={{ y: -500 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 p-6"
          >
            <div className="glass-strong rounded-2xl p-6 border border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Quick Panel</h2>
                <button
                  onClick={() => setQuickPanelOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Connection Toggles */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleToggle('wifi')}
                  className={`p-4 rounded-xl transition-all hover-scale ${
                    connections.wifi
                      ? 'bg-success/20 border-2 border-success'
                      : 'bg-white/5 border-2 border-white/10'
                  }`}
                >
                  <Wifi
                    className={`w-8 h-8 mx-auto mb-2 ${
                      connections.wifi ? 'text-success' : 'text-gray-400'
                    }`}
                  />
                  <p className="text-sm text-white text-center">WiFi</p>
                </button>

                <button
                  onClick={() => handleToggle('bluetooth')}
                  className={`p-4 rounded-xl transition-all hover-scale ${
                    connections.bluetooth
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-white/5 border-2 border-white/10'
                  }`}
                >
                  <Bluetooth
                    className={`w-8 h-8 mx-auto mb-2 ${
                      connections.bluetooth ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                  <p className="text-sm text-white text-center">Bluetooth</p>
                </button>

                <button
                  onClick={() => handleToggle('serial')}
                  className={`p-4 rounded-xl transition-all hover-scale ${
                    connections.serial
                      ? 'bg-warning/20 border-2 border-warning'
                      : 'bg-white/5 border-2 border-white/10'
                  }`}
                >
                  <Usb
                    className={`w-8 h-8 mx-auto mb-2 ${
                      connections.serial ? 'text-warning' : 'text-gray-400'
                    }`}
                  />
                  <p className="text-sm text-white text-center">Serial</p>
                </button>
              </div>

              {/* Status Bars */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4 text-success" />
                      <span className="text-sm text-gray-400">Battery</span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {Math.round(currentTelemetry.battery)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all"
                      style={{ width: `${currentTelemetry.battery}%` }}
                    />
                  </div>
                </div>

                <div className="glass rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Signal className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-400">Signal</span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {Math.round(currentTelemetry.rssi)} dBm
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, Math.max(0, (currentTelemetry.rssi + 100) * 2))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-warning" />
                      <span className="text-sm text-gray-400">Brightness</span>
                    </div>
                    <span className="text-sm font-bold text-white">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Fan className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-400">Fan Speed</span>
                    </div>
                    <span className="text-sm font-bold text-white">{fanSpeed}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fanSpeed}
                    onChange={(e) => setFanSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Mini Telemetry */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                <div className="glass rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Altitude</p>
                  <p className="text-lg font-bold text-primary">
                    {Math.round(currentTelemetry.altitude)}m
                  </p>
                </div>
                <div className="glass rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Speed</p>
                  <p className="text-lg font-bold text-success">
                    {Math.round(currentTelemetry.speed)} km/h
                  </p>
                </div>
                <div className="glass rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Temp</p>
                  <p className="text-lg font-bold text-warning">
                    {Math.round(currentTelemetry.temperature)}°C
                  </p>
                </div>
                <div className="glass rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Voltage</p>
                  <p className="text-lg font-bold text-secondary">
                    {currentTelemetry.voltage.toFixed(1)}V
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
