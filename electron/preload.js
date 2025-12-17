const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    fullscreen: (enable) => ipcRenderer.invoke('window:fullscreen', enable),
  },

  // Store
  store: {
    get: (key) => ipcRenderer.invoke('store:get', key),
    set: (key, value) => ipcRenderer.invoke('store:set', key, value),
    delete: (key) => ipcRenderer.invoke('store:delete', key),
    clear: () => ipcRenderer.invoke('store:clear'),
  },

  // Serial port
  serial: {
    list: () => ipcRenderer.invoke('serial:list'),
    connect: (portPath, baudRate) => ipcRenderer.invoke('serial:connect', portPath, baudRate),
    disconnect: () => ipcRenderer.invoke('serial:disconnect'),
    write: (data) => ipcRenderer.invoke('serial:write', data),
    onData: (callback) => {
      ipcRenderer.on('serial:data', (event, data) => callback(data));
    },
  },

  // Bluetooth
  bluetooth: {
    scan: () => ipcRenderer.invoke('bluetooth:scan'),
    connect: (deviceId) => ipcRenderer.invoke('bluetooth:connect', deviceId),
    disconnect: () => ipcRenderer.invoke('bluetooth:disconnect'),
  },

  // License
  license: {
    validate: (key) => ipcRenderer.invoke('license:validate', key),
    getStatus: () => ipcRenderer.invoke('license:getStatus'),
    activate: (key) => ipcRenderer.invoke('license:activate', key),
  },

  // Auto-launch
  autolaunch: {
    enable: () => ipcRenderer.invoke('autolaunch:enable'),
    disable: () => ipcRenderer.invoke('autolaunch:disable'),
    isEnabled: () => ipcRenderer.invoke('autolaunch:isEnabled'),
  },

  // System info
  system: {
    getInfo: () => ipcRenderer.invoke('system:getInfo'),
  },
});
