export interface TelemetryData {
  altitude: number;
  speed: number;
  battery: number;
  heading: number;
  latitude: number;
  longitude: number;
  pitch: number;
  roll: number;
  timestamp: number;
  armed: boolean;
  flightMode: string;
  satellites: number;
  groundSpeed: number;
  verticalSpeed: number;
  throttle: number;
}

export interface WidgetConfig {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardLayout {
  widgets: WidgetConfig[];
}

declare global {
  interface Window {
    electronAPI: {
      onTelemetryData: (callback: (data: TelemetryData) => void) => void;
      startTelemetry: () => Promise<{ success: boolean }>;
      stopTelemetry: () => Promise<{ success: boolean }>;
      getTelemetryStatus: () => Promise<{ active: boolean }>;
    };
  }
}
