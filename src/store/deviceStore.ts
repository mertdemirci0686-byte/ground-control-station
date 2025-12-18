import { create } from 'zustand';

export type DeviceType = 'drone' | 'robot' | 'vehicle' | 'home' | 'iot' | 'recon' | 'custom';
export type Protocol = 'serial' | 'bluetooth' | 'wifi' | 'mqtt' | 'mavlink' | 'msp' | 'crsf' | 'elrs' | 'custom';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  protocol: Protocol;
  connected: boolean;
  lastSeen?: number;
  config: Record<string, any>;
}

export interface DeviceState {
  devices: Device[];
  selectedDevice: string | null;
  
  // Actions
  addDevice: (device: Omit<Device, 'id' | 'connected'>) => void;
  removeDevice: (id: string) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  setSelectedDevice: (id: string | null) => void;
  connectDevice: (id: string) => Promise<boolean>;
  disconnectDevice: (id: string) => void;
  getDevice: (id: string) => Device | undefined;
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
  devices: [
    {
      id: 'drone-1',
      name: 'DJI Mavic 3',
      type: 'drone',
      protocol: 'mavlink',
      connected: true,
      lastSeen: Date.now(),
      config: {
        baudRate: 57600,
        port: '/dev/ttyUSB0',
      },
    },
    {
      id: 'robot-1',
      name: 'Ground Robot Alpha',
      type: 'robot',
      protocol: 'serial',
      connected: false,
      config: {
        baudRate: 115200,
      },
    },
  ],
  selectedDevice: 'drone-1',

  addDevice: (device) => {
    const newDevice: Device = {
      ...device,
      id: `device-${Date.now()}`,
      connected: false,
    };
    set((state) => ({
      devices: [...state.devices, newDevice],
    }));
  },

  removeDevice: (id) => {
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== id),
      selectedDevice: state.selectedDevice === id ? null : state.selectedDevice,
    }));
  },

  updateDevice: (id, updates) => {
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
  },

  setSelectedDevice: (id) => {
    set({ selectedDevice: id });
  },

  connectDevice: async (id) => {
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    get().updateDevice(id, {
      connected: true,
      lastSeen: Date.now(),
    });
    
    return true;
  },

  disconnectDevice: (id) => {
    get().updateDevice(id, {
      connected: false,
    });
  },

  getDevice: (id) => {
    return get().devices.find((d) => d.id === id);
  },
}));
