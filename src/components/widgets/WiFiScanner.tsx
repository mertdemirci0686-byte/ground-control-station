import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Lock, Unlock, RefreshCw } from 'lucide-react';

interface WiFiNetwork {
  id: string;
  ssid: string;
  bssid: string;
  channel: number;
  frequency: number;
  signal: number;
  security: 'WPA2' | 'WPA3' | 'WEP' | 'Open';
}

const mockNetworks: WiFiNetwork[] = [
  { id: '1', ssid: 'HomeNetwork_5G', bssid: '00:11:22:33:44:55', channel: 36, frequency: 5180, signal: -42, security: 'WPA2' },
  { id: '2', ssid: 'Office_WiFi', bssid: '11:22:33:44:55:66', channel: 6, frequency: 2437, signal: -55, security: 'WPA3' },
  { id: '3', ssid: 'Guest_Network', bssid: '22:33:44:55:66:77', channel: 11, frequency: 2462, signal: -68, security: 'Open' },
  { id: '4', ssid: 'IoT_Devices', bssid: '33:44:55:66:77:88', channel: 1, frequency: 2412, signal: -72, security: 'WEP' },
  { id: '5', ssid: 'Neighbor_AP', bssid: '44:55:66:77:88:99', channel: 48, frequency: 5240, signal: -78, security: 'WPA2' },
];

export default function WiFiScanner() {
  const [networks, setNetworks] = useState<WiFiNetwork[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const scan = () => {
    setScanning(true);
    setNetworks([]);
    
    setTimeout(() => {
      // Simulate random signal variations
      const scannedNetworks = mockNetworks.map(net => ({
        ...net,
        signal: net.signal + Math.floor(Math.random() * 10 - 5),
      }));
      setNetworks(scannedNetworks.sort((a, b) => b.signal - a.signal));
      setScanning(false);
    }, 2000);
  };

  useEffect(() => {
    scan();
  }, []);

  const getSignalStrength = (signal: number) => {
    if (signal > -50) return { bars: 4, color: 'text-accent-green' };
    if (signal > -60) return { bars: 3, color: 'text-cyan-400' };
    if (signal > -70) return { bars: 2, color: 'text-warning-orange' };
    return { bars: 1, color: 'text-critical-red' };
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-96 h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
          📡 WiFi Scanner
        </div>
        <button
          onClick={scan}
          disabled={scanning}
          className={`p-2 rounded border border-cyan-500/50 ${
            scanning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-500/20'
          } transition-colors`}
        >
          <RefreshCw className={`w-4 h-4 text-cyan-400 ${scanning ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Networks List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {scanning && networks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3">
            <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin" />
            <p className="text-gray-400 text-sm">Scanning for networks...</p>
          </div>
        ) : networks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">No networks found</p>
          </div>
        ) : (
          networks.map((network, index) => {
            const strength = getSignalStrength(network.signal);
            const isSelected = selectedNetwork === network.id;

            return (
              <motion.div
                key={network.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedNetwork(network.id)}
                className={`p-3 rounded border ${
                  isSelected 
                    ? 'border-cyan-400 bg-cyan-500/20' 
                    : 'border-cyan-500/30 bg-black/30'
                } cursor-pointer hover:border-cyan-400/70 transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Wifi className={`w-4 h-4 ${strength.color}`} />
                    <span className="text-cyan-300 font-bold text-sm">{network.ssid}</span>
                  </div>
                  {network.security === 'Open' ? (
                    <Unlock className="w-4 h-4 text-warning-orange" />
                  ) : (
                    <Lock className="w-4 h-4 text-accent-green" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div>BSSID: {network.bssid}</div>
                  <div>Ch: {network.channel}</div>
                  <div>Freq: {network.frequency} MHz</div>
                  <div>Signal: {network.signal} dBm</div>
                  <div className="col-span-2">Security: {network.security}</div>
                </div>

                {/* Signal Strength Bars */}
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`w-2 rounded ${
                        bar <= strength.bars ? strength.color : 'bg-gray-700'
                      }`}
                      style={{ height: `${bar * 4}px` }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-3 pt-3 border-t border-cyan-500/30 flex justify-between text-xs text-gray-400">
        <span>{networks.length} networks found</span>
        <span>{networks.filter(n => n.security === 'Open').length} open</span>
      </div>
    </div>
  );
}
