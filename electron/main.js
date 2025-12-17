const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const Store = require('electron-store');
const serialModule = require('./modules/serial');
const bluetoothModule = require('./modules/bluetooth');
const licenseModule = require('./modules/license');

const store = new Store();
let mainWindow;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: true,
    show: false,
    backgroundColor: '#000000',
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Load URL based on environment
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Window control IPC handlers
ipcMain.handle('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:fullscreen', (event, enable) => {
  if (mainWindow) mainWindow.setFullScreen(enable);
});

// Store IPC handlers
ipcMain.handle('store:get', (event, key) => {
  return store.get(key);
});

ipcMain.handle('store:set', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('store:delete', (event, key) => {
  store.delete(key);
  return true;
});

ipcMain.handle('store:clear', () => {
  store.clear();
  return true;
});

// Serial port IPC handlers
ipcMain.handle('serial:list', async () => {
  return await serialModule.listPorts();
});

ipcMain.handle('serial:connect', async (event, portPath, baudRate) => {
  return await serialModule.connect(portPath, baudRate);
});

ipcMain.handle('serial:disconnect', async () => {
  return await serialModule.disconnect();
});

ipcMain.handle('serial:write', async (event, data) => {
  return await serialModule.write(data);
});

ipcMain.on('serial:data', (event, callback) => {
  serialModule.onData((data) => {
    if (mainWindow) {
      mainWindow.webContents.send('serial:data', data);
    }
  });
});

// Bluetooth IPC handlers
ipcMain.handle('bluetooth:scan', async () => {
  return await bluetoothModule.scan();
});

ipcMain.handle('bluetooth:connect', async (event, deviceId) => {
  return await bluetoothModule.connect(deviceId);
});

ipcMain.handle('bluetooth:disconnect', async () => {
  return await bluetoothModule.disconnect();
});

// License IPC handlers
ipcMain.handle('license:validate', async (event, key) => {
  return await licenseModule.validate(key);
});

ipcMain.handle('license:getStatus', async () => {
  return await licenseModule.getStatus();
});

ipcMain.handle('license:activate', async (event, key) => {
  return await licenseModule.activate(key);
});

// Auto-launch IPC handlers
ipcMain.handle('autolaunch:enable', async () => {
  app.setLoginItemSettings({
    openAtLogin: true,
  });
  return true;
});

ipcMain.handle('autolaunch:disable', async () => {
  app.setLoginItemSettings({
    openAtLogin: false,
  });
  return false;
});

ipcMain.handle('autolaunch:isEnabled', async () => {
  return app.getLoginItemSettings().openAtLogin;
});

// System info IPC handlers
ipcMain.handle('system:getInfo', () => {
  return {
    platform: process.platform,
    arch: process.arch,
    version: app.getVersion(),
    electronVersion: process.versions.electron,
  };
});
