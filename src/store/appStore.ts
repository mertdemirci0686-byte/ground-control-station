import { create } from 'zustand';

export type Theme = 'dark' | 'light' | 'neon' | 'space' | 'glass';

export interface TelemetryData {
  battery: number;
  voltage: number;
  altitude: number;
  speed: number;
  temperature: number;
  rssi: number;
  roll: number;
  pitch: number;
  yaw: number;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

export interface ConnectionStatus {
  wifi: boolean;
  bluetooth: boolean;
  serial: boolean;
  serialPort?: string;
}

export interface AppState {
  // Theme
  theme: Theme;
  wallpaperBlur: number;
  setTheme: (theme: Theme) => void;
  setWallpaperBlur: (blur: number) => void;

  // Telemetry
  telemetry: TelemetryData[];
  currentTelemetry: TelemetryData;
  updateTelemetry: (data: Partial<TelemetryData>) => void;
  clearTelemetry: () => void;

  // Notifications
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Connections
  connections: ConnectionStatus;
  setConnection: (type: keyof ConnectionStatus, status: boolean, extra?: any) => void;

  // UI State
  quickPanelOpen: boolean;
  brightness: number;
  fanSpeed: number;
  setQuickPanelOpen: (open: boolean) => void;
  setBrightness: (brightness: number) => void;
  setFanSpeed: (speed: number) => void;

  // License
  licenseStatus: 'free' | 'pro' | 'admin';
  setLicenseStatus: (status: 'free' | 'pro' | 'admin') => void;

  // Drone Cockpit Layout
  widgetLayout: Record<string, { x: number; y: number }>;
  setWidgetLayout: (layout: Record<string, { x: number; y: number }>) => void;
}

const defaultTelemetry: TelemetryData = {
  battery: 85,
  voltage: 12.4,
  altitude: 0,
  speed: 0,
  temperature: 25,
  rssi: -45,
  roll: 0,
  pitch: 0,
  yaw: 0,
  latitude: 37.7749,
  longitude: -122.4194,
  timestamp: Date.now(),
};

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'dark',
  wallpaperBlur: 10,
  setTheme: (theme) => set({ theme }),
  setWallpaperBlur: (blur) => set({ wallpaperBlur: blur }),

  // Telemetry
  telemetry: [defaultTelemetry],
  currentTelemetry: defaultTelemetry,
  updateTelemetry: (data) => {
    const current = get().currentTelemetry;
    const newTelemetry = {
      ...current,
      ...data,
      timestamp: Date.now(),
    };
    
    const telemetryHistory = get().telemetry;
    const updatedHistory = [...telemetryHistory, newTelemetry].slice(-20); // Keep last 20 points
    
    set({
      currentTelemetry: newTelemetry,
      telemetry: updatedHistory,
    });
  },
  clearTelemetry: () => set({ telemetry: [defaultTelemetry], currentTelemetry: defaultTelemetry }),

  // Notifications
  notifications: [],
  addNotification: (type, message) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now(),
    };
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(notification.id);
    }, 5000);
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Connections
  connections: {
    wifi: false,
    bluetooth: false,
    serial: false,
  },
  setConnection: (type, status, extra) => {
    set((state) => ({
      connections: {
        ...state.connections,
        [type]: status,
        ...(type === 'serial' && extra ? { serialPort: extra } : {}),
      },
    }));
  },

  // UI State
  quickPanelOpen: false,
  brightness: 80,
  fanSpeed: 50,
  setQuickPanelOpen: (open) => set({ quickPanelOpen: open }),
  setBrightness: (brightness) => set({ brightness }),
  setFanSpeed: (speed) => set({ fanSpeed: speed }),

  // License
  licenseStatus: 'admin',
  setLicenseStatus: (status) => set({ licenseStatus: status }),

  // Widget Layout
  widgetLayout: {
    artificialHorizon: { x: 50, y: 50 },
    altitudeGauge: { x: 85, y: 30 },
    speedGauge: { x: 15, y: 30 },
    battery: { x: 15, y: 80 },
    compass: { x: 50, y: 85 },
    gps: { x: 85, y: 80 },
    camera: { x: 30, y: 15 },
  },
  setWidgetLayout: (layout) => set({ widgetLayout: layout }),
}));
