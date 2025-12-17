import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'Ground Control Station',
    backgroundColor: '#0a0e14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString());
  });
}

let telemetryInterval: NodeJS.Timeout | null = null;
let simulationActive = false;

function startTelemetrySimulation() {
  if (telemetryInterval) return;
  
  simulationActive = true;
  let altitude = 100;
  let speed = 15;
  let battery = 100;
  let heading = 0;
  let latitude = 37.7749;
  let longitude = -122.4194;
  let pitch = 0;
  let roll = 0;

  telemetryInterval = setInterval(() => {
    if (!simulationActive || !mainWindow) return;

    altitude += (Math.random() - 0.5) * 2;
    speed += (Math.random() - 0.5) * 0.5;
    battery -= 0.001;
    heading = (heading + 0.5) % 360;
    latitude += (Math.random() - 0.5) * 0.0001;
    longitude += (Math.random() - 0.5) * 0.0001;
    pitch = Math.sin(Date.now() / 1000) * 5;
    roll = Math.cos(Date.now() / 1000) * 3;

    altitude = Math.max(0, Math.min(500, altitude));
    speed = Math.max(0, Math.min(50, speed));
    battery = Math.max(0, battery);

    const telemetryData = {
      altitude: Math.round(altitude * 10) / 10,
      speed: Math.round(speed * 10) / 10,
      battery: Math.round(battery * 10) / 10,
      heading: Math.round(heading),
      latitude: Math.round(latitude * 100000) / 100000,
      longitude: Math.round(longitude * 100000) / 100000,
      pitch: Math.round(pitch * 10) / 10,
      roll: Math.round(roll * 10) / 10,
      timestamp: Date.now(),
      armed: true,
      flightMode: 'GUIDED',
      satellites: 12 + Math.floor(Math.random() * 3),
      groundSpeed: Math.round(speed * 0.9 * 10) / 10,
      verticalSpeed: Math.round((Math.random() - 0.5) * 10) / 10,
      throttle: Math.round(45 + Math.random() * 10)
    };

    mainWindow?.webContents.send('telemetry-data', telemetryData);
  }, 100);
}

function stopTelemetrySimulation() {
  simulationActive = false;
  if (telemetryInterval) {
    clearInterval(telemetryInterval);
    telemetryInterval = null;
  }
}

ipcMain.handle('start-telemetry', () => {
  startTelemetrySimulation();
  return { success: true };
});

ipcMain.handle('stop-telemetry', () => {
  stopTelemetrySimulation();
  return { success: true };
});

ipcMain.handle('get-telemetry-status', () => {
  return { active: simulationActive };
});

app.whenReady().then(() => {
  createWindow();
  startTelemetrySimulation();
});

app.on('window-all-closed', () => {
  stopTelemetrySimulation();
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
