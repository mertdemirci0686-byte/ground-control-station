# 🚀 Ground Control Station

Advanced UAV/Drone Ground Control Station with customizable dashboard, built with Electron + React + TypeScript.

## Features

- 🎯 **Modular Architecture**: 9 customizable modules (Drone, Robot, Vehicle, Home, etc.)
- 🛸 **Drone Cockpit**: Professional HUD with 7 draggable widgets
- 📊 **Real-time Telemetry**: Live charts for battery, voltage, altitude, temperature
- 🎨 **5 Theme Options**: Dark, Light, Neon, Space, Glass
- 📡 **Serial Communication**: ESP32/Arduino support via serialport
- 🔐 **License System**: Admin mode for development
- 🌐 **Browser Compatible**: Mock Electron API for web testing
- ✨ **Glassmorphism UI**: Modern design with blur effects and neon glow

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Electron 28
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This runs both Vite dev server and Electron app concurrently.

## Build

```bash
# Build for production
npm run build

# Build Electron app
npm run electron:build

# Platform-specific builds
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux
```

## Project Structure

```
ground-control-station/
├── electron/              # Electron main process
│   ├── main.js           # Window management, IPC
│   ├── preload.js        # Secure IPC bridge
│   └── modules/          # Backend modules
│       ├── serial.js     # Serial port communication
│       ├── bluetooth.js  # Bluetooth module
│       └── license.js    # License management
├── src/
│   ├── components/       # React components
│   │   ├── layouts/      # Layout components
│   │   ├── navigation/   # Navigation components
│   │   ├── panels/       # Panel components
│   │   ├── ui/          # UI components
│   │   └── widgets/      # Widget components
│   ├── modules/          # Application modules
│   │   ├── drone/        # Drone module
│   │   ├── robot/        # Robot module
│   │   ├── vehicle/      # Vehicle module
│   │   └── ...
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utilities
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
└── package.json
```

## Modules

1. **Drone**: Carousel selection + Professional HUD cockpit
2. **Robot**: Robot control interface
3. **Vehicle**: Vehicle monitoring
4. **Home**: Home automation
5. **Module Management**: Customize modules
6. **Telemetry**: Real-time data charts
7. **Camera**: Camera feed viewer
8. **Developer**: Debug console
9. **Market**: Marketplace

## License

MIT
