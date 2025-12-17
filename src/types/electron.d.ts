export interface ElectronAPI {
  window: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
    fullscreen: (enable: boolean) => Promise<void>;
  };
  store: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<boolean>;
    delete: (key: string) => Promise<boolean>;
    clear: () => Promise<boolean>;
  };
  serial: {
    list: () => Promise<SerialPortInfo[]>;
    connect: (portPath: string, baudRate: number) => Promise<SerialConnectionResult>;
    disconnect: () => Promise<{ success: boolean }>;
    write: (data: string) => Promise<{ success: boolean }>;
    onData: (callback: (data: string) => void) => void;
  };
  bluetooth: {
    scan: () => Promise<BluetoothScanResult>;
    connect: (deviceId: string) => Promise<BluetoothConnectionResult>;
    disconnect: () => Promise<{ success: boolean; message: string }>;
  };
  license: {
    validate: (key: string) => Promise<LicenseValidation>;
    getStatus: () => Promise<LicenseStatus>;
    activate: (key: string) => Promise<LicenseValidation>;
  };
  autolaunch: {
    enable: () => Promise<boolean>;
    disable: () => Promise<boolean>;
    isEnabled: () => Promise<boolean>;
  };
  system: {
    getInfo: () => Promise<SystemInfo>;
  };
}

export interface SerialPortInfo {
  path: string;
  manufacturer?: string;
  serialNumber?: string;
  productId?: string;
  vendorId?: string;
}

export interface SerialConnectionResult {
  success: boolean;
  port: string;
  baudRate: number;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  rssi: number;
}

export interface BluetoothScanResult {
  success: boolean;
  devices: BluetoothDevice[];
}

export interface BluetoothConnectionResult {
  success: boolean;
  device: string;
  message: string;
}

export interface LicenseValidation {
  valid: boolean;
  type?: 'admin' | 'pro' | 'free';
  message: string;
}

export interface LicenseStatus {
  activated: boolean;
  type: 'admin' | 'pro' | 'free';
  activatedAt?: string;
  message: string;
}

export interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  electronVersion: string;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
