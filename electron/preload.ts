import { contextBridge, ipcRenderer } from 'electron';

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

contextBridge.exposeInMainWorld('electronAPI', {
  onTelemetryData: (callback: (data: TelemetryData) => void) => {
    ipcRenderer.on('telemetry-data', (_event, data) => callback(data));
  },
  startTelemetry: () => ipcRenderer.invoke('start-telemetry'),
  stopTelemetry: () => ipcRenderer.invoke('stop-telemetry'),
  getTelemetryStatus: () => ipcRenderer.invoke('get-telemetry-status')
});
