import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Wifi, WifiOff, Bluetooth, BluetoothOff, Cpu, Battery, Signal } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';

export default function TopBar() {
  const navigate = useNavigate();
  const { connections, currentTelemetry, setQuickPanelOpen, licenseStatus } = useAppStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-strong border-b border-white/10 px-6 py-3 flex items-center justify-between z-50"
    >
      {/* Left Section - Logo & Title */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Ground Control Station</h1>
          <p className="text-xs text-gray-400">
            {licenseStatus === 'admin' && '🔓 Admin Mode'}
            {licenseStatus === 'pro' && '⭐ Pro License'}
            {licenseStatus === 'free' && '🆓 Free Version'}
          </p>
        </div>
      </div>

      {/* Center Section - Quick Status */}
      <div
        className="flex items-center space-x-6 cursor-pointer hover:bg-white/5 rounded-lg px-4 py-2 transition-colors"
        onClick={() => setQuickPanelOpen(true)}
      >
        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          {connections.wifi ? (
            <Wifi className="w-4 h-4 text-success" />
          ) : (
            <WifiOff className="w-4 h-4 text-gray-500" />
          )}
          {connections.bluetooth ? (
            <Bluetooth className="w-4 h-4 text-primary" />
          ) : (
            <BluetoothOff className="w-4 h-4 text-gray-500" />
          )}
        </div>

        {/* Battery */}
        <div className="flex items-center space-x-2">
          <Battery className="w-4 h-4 text-success" />
          <span className="text-sm text-white">{Math.round(currentTelemetry.battery)}%</span>
        </div>

        {/* Signal */}
        <div className="flex items-center space-x-2">
          <Signal className="w-4 h-4 text-primary" />
          <span className="text-sm text-white">{Math.round(currentTelemetry.rssi)} dBm</span>
        </div>
      </div>

      {/* Right Section - Time & Settings */}
      <div className="flex items-center space-x-6">
        {/* Clock */}
        <div className="text-right">
          <div className="text-lg font-mono font-bold text-white">
            {format(time, 'HH:mm:ss')}
          </div>
          <div className="text-xs text-gray-400">
            {format(time, 'MMM dd, yyyy')}
          </div>
        </div>

        {/* Settings Button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
        >
          <Settings className="w-6 h-6 text-gray-400 group-hover:text-primary group-hover:rotate-90 transition-all duration-300" />
        </button>
      </div>
    </motion.div>
  );
}
