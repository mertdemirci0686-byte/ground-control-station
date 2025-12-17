import { ElectronAPI } from '../types/electron';

// Mock Electron API for browser testing
const mockElectronAPI: ElectronAPI = {
  window: {
    minimize: async () => {
      console.log('[Mock] Window minimize');
    },
    maximize: async () => {
      console.log('[Mock] Window maximize');
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    },
    close: async () => {
      console.log('[Mock] Window close');
      alert('Close window (mock - would close in Electron)');
    },
    fullscreen: async (enable: boolean) => {
      console.log(`[Mock] Window fullscreen: ${enable}`);
      if (enable && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (!enable && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    },
  },

  store: {
    get: async (key: string) => {
      console.log(`[Mock] Store get: ${key}`);
      const value = localStorage.getItem(`electron_store_${key}`);
      return value ? JSON.parse(value) : null;
    },
    set: async (key: string, value: any) => {
      console.log(`[Mock] Store set: ${key}`, value);
      localStorage.setItem(`electron_store_${key}`, JSON.stringify(value));
      return true;
    },
    delete: async (key: string) => {
      console.log(`[Mock] Store delete: ${key}`);
      localStorage.removeItem(`electron_store_${key}`);
      return true;
    },
    clear: async () => {
      console.log('[Mock] Store clear');
      const keys = Object.keys(localStorage).filter(k => k.startsWith('electron_store_'));
      keys.forEach(k => localStorage.removeItem(k));
      return true;
    },
  },

  serial: {
    list: async () => {
      console.log('[Mock] Serial list ports');
      return [
        { path: '/dev/ttyUSB0', manufacturer: 'FTDI', serialNumber: '12345' },
        { path: '/dev/ttyUSB1', manufacturer: 'Arduino', serialNumber: '67890' },
        { path: 'COM3', manufacturer: 'ESP32', serialNumber: 'ABCDE' },
      ];
    },
    connect: async (portPath: string, baudRate: number) => {
      console.log(`[Mock] Serial connect: ${portPath} @ ${baudRate}`);
      return {
        success: true,
        port: portPath,
        baudRate: baudRate,
      };
    },
    disconnect: async () => {
      console.log('[Mock] Serial disconnect');
      return { success: true };
    },
    write: async (data: string) => {
      console.log(`[Mock] Serial write: ${data}`);
      return { success: true };
    },
    onData: (callback: (data: string) => void) => {
      console.log('[Mock] Serial onData registered');
      // Simulate random data every 2 seconds
      setInterval(() => {
        const mockData = `ALT:${Math.floor(Math.random() * 500)},SPD:${Math.floor(Math.random() * 100)}`;
        callback(mockData);
      }, 2000);
    },
  },

  bluetooth: {
    scan: async () => {
      console.log('[Mock] Bluetooth scan');
      return {
        success: true,
        devices: [
          { id: 'bt-1', name: 'ESP32-Drone', rssi: -45 },
          { id: 'bt-2', name: 'Arduino-Robot', rssi: -62 },
        ],
      };
    },
    connect: async (deviceId: string) => {
      console.log(`[Mock] Bluetooth connect: ${deviceId}`);
      return {
        success: true,
        device: deviceId,
        message: 'Connected (mock)',
      };
    },
    disconnect: async () => {
      console.log('[Mock] Bluetooth disconnect');
      return {
        success: true,
        message: 'Disconnected',
      };
    },
  },

  license: {
    validate: async (key: string) => {
      console.log(`[Mock] License validate: ${key}`);
      // Always return admin in development
      return {
        valid: true,
        type: 'admin',
        message: 'Development mode - admin access',
      };
    },
    getStatus: async () => {
      console.log('[Mock] License getStatus');
      return {
        activated: true,
        type: 'admin',
        message: 'Development mode',
      };
    },
    activate: async (key: string) => {
      console.log(`[Mock] License activate: ${key}`);
      return {
        valid: true,
        type: 'admin',
        message: 'License activated (mock)',
      };
    },
  },

  autolaunch: {
    enable: async () => {
      console.log('[Mock] Autolaunch enable');
      localStorage.setItem('autolaunch', 'true');
      return true;
    },
    disable: async () => {
      console.log('[Mock] Autolaunch disable');
      localStorage.setItem('autolaunch', 'false');
      return false;
    },
    isEnabled: async () => {
      console.log('[Mock] Autolaunch isEnabled');
      return localStorage.getItem('autolaunch') === 'true';
    },
  },

  system: {
    getInfo: async () => {
      console.log('[Mock] System getInfo');
      return {
        platform: 'browser',
        arch: 'x64',
        version: '1.0.0',
        electronVersion: 'mock',
      };
    },
  },
};

// Initialize mock API if not in Electron
if (!window.electronAPI) {
  console.log('[Mock] Initializing mock Electron API for browser');
  window.electronAPI = mockElectronAPI;
}

export default mockElectronAPI;
