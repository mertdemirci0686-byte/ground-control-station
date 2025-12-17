import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Wifi, Bluetooth, Usb, Rocket, Key, Info } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const themes = [
  { id: 'dark', name: 'Dark', preview: 'bg-black' },
  { id: 'light', name: 'Light', preview: 'bg-white' },
  { id: 'neon', name: 'Neon', preview: 'bg-gradient-to-br from-primary to-secondary' },
  { id: 'space', name: 'Space', preview: 'bg-gradient-to-br from-purple-900 to-indigo-900' },
  { id: 'glass', name: 'Glass', preview: 'bg-gradient-to-br from-blue-900/50 to-purple-900/50' },
];

export default function Settings() {
  const {
    theme,
    setTheme,
    wallpaperBlur,
    setWallpaperBlur,
    connections,
    setConnection,
    licenseStatus,
    addNotification,
  } = useAppStore();

  const [autoLaunch, setAutoLaunch] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');

  useEffect(() => {
    // Load auto-launch status
    if (window.electronAPI) {
      window.electronAPI.autolaunch.isEnabled().then(setAutoLaunch);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
    addNotification('success', `Theme changed to ${newTheme}`);
  };

  const handleAutoLaunchToggle = async () => {
    if (window.electronAPI) {
      const newState = !autoLaunch;
      if (newState) {
        await window.electronAPI.autolaunch.enable();
      } else {
        await window.electronAPI.autolaunch.disable();
      }
      setAutoLaunch(newState);
      addNotification('success', `Auto-launch ${newState ? 'enabled' : 'disabled'}`);
    }
  };

  const handleLicenseActivate = async () => {
    if (window.electronAPI && licenseKey) {
      const result = await window.electronAPI.license.activate(licenseKey);
      if (result.valid) {
        addNotification('success', 'License activated successfully');
        setLicenseKey('');
      } else {
        addNotification('error', result.message);
      }
    }
  };

  return (
    <div className="w-full h-full p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white neon-text mb-2">Settings</h1>
          <p className="text-gray-400">Customize your Ground Control Station</p>
        </div>

        {/* Theme Settings */}
        <div className="glass-strong rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">Theme</h2>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`p-4 rounded-xl transition-all hover-scale ${
                  theme === t.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-black'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-full h-24 ${t.preview} rounded-lg mb-2`} />
                <p className="text-sm text-white font-medium">{t.name}</p>
              </button>
            ))}
          </div>

          {/* Wallpaper Blur */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Wallpaper Blur</label>
              <span className="text-sm font-bold text-white">{wallpaperBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={wallpaperBlur}
              onChange={(e) => setWallpaperBlur(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Connection Settings */}
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Connections</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-success" />
                <span className="text-white">WiFi</span>
              </div>
              <button
                onClick={() => setConnection('wifi', !connections.wifi)}
                className={`w-14 h-8 rounded-full transition-colors ${
                  connections.wifi ? 'bg-success' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    connections.wifi ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bluetooth className="w-5 h-5 text-primary" />
                <span className="text-white">Bluetooth</span>
              </div>
              <button
                onClick={() => setConnection('bluetooth', !connections.bluetooth)}
                className={`w-14 h-8 rounded-full transition-colors ${
                  connections.bluetooth ? 'bg-primary' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    connections.bluetooth ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Usb className="w-5 h-5 text-warning" />
                <span className="text-white">Serial Port</span>
              </div>
              <button
                onClick={() => setConnection('serial', !connections.serial)}
                className={`w-14 h-8 rounded-full transition-colors ${
                  connections.serial ? 'bg-warning' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    connections.serial ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Application Settings */}
        <div className="glass-strong rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Rocket className="w-6 h-6 text-warning" />
            <h2 className="text-xl font-bold text-white">Application</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Launch at Startup</p>
              <p className="text-sm text-gray-400">Start GCS automatically when system boots</p>
            </div>
            <button
              onClick={handleAutoLaunchToggle}
              className={`w-14 h-8 rounded-full transition-colors ${
                autoLaunch ? 'bg-primary' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  autoLaunch ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* License Settings */}
        <div className="glass-strong rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Key className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-bold text-white">License</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-white font-medium mb-1">Current Status</p>
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  licenseStatus === 'admin'
                    ? 'bg-primary/20 text-primary'
                    : licenseStatus === 'pro'
                    ? 'bg-success/20 text-success'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {licenseStatus === 'admin' && '🔓 Admin Mode'}
                {licenseStatus === 'pro' && '⭐ Pro License'}
                {licenseStatus === 'free' && '🆓 Free Version'}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Activate License Key</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter license key"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleLicenseActivate}
                  disabled={!licenseKey}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="glass-strong rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">About</h2>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">
              <span className="text-white font-medium">Version:</span> 1.0.0
            </p>
            <p className="text-gray-400">
              <span className="text-white font-medium">Platform:</span> Electron + React + TypeScript
            </p>
            <p className="text-gray-400">
              <span className="text-white font-medium">Description:</span> Advanced UAV/Drone Ground
              Control Station
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
