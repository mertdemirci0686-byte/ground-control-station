# Ground Control Station

Advanced UAV/Drone Ground Control Station built with Electron, React, and TypeScript.

## Features

### 🎯 Core Capabilities
- **Real-time Telemetry**: Live data streaming at 10Hz update rate
- **Customizable Dashboard**: Drag-and-drop widget positioning with persistent layouts
- **Professional HUD Interface**: Military-grade heads-up display styling
- **Cross-platform**: Runs on Windows, macOS, and Linux

### 📊 Dashboard Widgets
1. **Altitude Widget** - Real-time altitude display with visual indicators
2. **Speed Widget** - Airspeed and ground speed monitoring
3. **Battery Widget** - Battery level with visual gauge
4. **Compass Widget** - Heading indicator with cardinal directions
5. **GPS Widget** - Precise position coordinates and satellite count
6. **Artificial Horizon** - Pitch and roll visualization
7. **Flight Mode Widget** - Current flight mode, armed status, and throttle
8. **Telemetry Table** - Complete telemetry data in tabular format
9. **Map Widget** - Real-time drone position on OpenStreetMap

### 🎨 Professional HUD Styling
- Dark theme with cyan/green accent colors
- Glowing effects and shadows for enhanced visibility
- Monospace fonts for technical precision
- Grid background pattern
- Smooth animations and transitions

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/mertdemirci0686-byte/ground-control-station.git
cd ground-control-station

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Build Electron app for your platform
npm run electron:build        # Auto-detect platform
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

## Architecture

### Technology Stack
- **Frontend**: React 19 with TypeScript
- **Desktop**: Electron 39
- **Build Tool**: Vite 7
- **UI Components**: Custom widgets with CSS
- **Grid System**: react-grid-layout for drag-and-drop
- **Maps**: Leaflet with react-leaflet

### Project Structure
```
ground-control-station/
├── electron/              # Electron main and preload scripts
│   ├── main.ts           # Main process (telemetry simulation)
│   └── preload.ts        # Preload script (IPC bridge)
├── src/
│   ├── components/       # React components
│   │   └── Dashboard.tsx # Main dashboard with grid layout
│   ├── widgets/          # Individual widget components
│   │   ├── AltitudeWidget.tsx
│   │   ├── SpeedWidget.tsx
│   │   ├── BatteryWidget.tsx
│   │   ├── CompassWidget.tsx
│   │   ├── GPSWidget.tsx
│   │   ├── ArtificialHorizonWidget.tsx
│   │   ├── FlightModeWidget.tsx
│   │   ├── TelemetryTableWidget.tsx
│   │   └── MapWidget.tsx
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # CSS stylesheets
│   ├── App.tsx           # Main React application
│   └── main.tsx          # React entry point
├── public/               # Static assets
├── dist/                 # Built web assets (generated)
├── dist-electron/        # Built Electron assets (generated)
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Development

### Telemetry Simulation
The application includes a built-in telemetry simulator that generates realistic drone flight data:
- Altitude: 0-500m with smooth variations
- Speed: 0-50 m/s
- Battery: Gradual drain from 100%
- GPS: Coordinates near San Francisco with realistic movement
- Attitude: Sinusoidal pitch and roll
- Update rate: 10Hz (100ms intervals)

### Customizing Widgets
Widgets are React components that receive telemetry data as props. To add a new widget:

1. Create a new component in `src/widgets/`
2. Import and add it to `src/widgets/index.ts`
3. Add it to the Dashboard component in `src/components/Dashboard.tsx`
4. Configure its default layout position

### Layout Persistence
Widget positions are automatically saved to localStorage and restored on app restart.

## Telemetry Data Structure
```typescript
interface TelemetryData {
  altitude: number;        // meters MSL
  speed: number;          // m/s
  battery: number;        // percentage
  heading: number;        // degrees (0-360)
  latitude: number;       // decimal degrees
  longitude: number;      // decimal degrees
  pitch: number;          // degrees
  roll: number;           // degrees
  timestamp: number;      // Unix timestamp
  armed: boolean;         // armed state
  flightMode: string;     // e.g., "GUIDED", "AUTO", "MANUAL"
  satellites: number;     // GPS satellite count
  groundSpeed: number;    // m/s
  verticalSpeed: number;  // m/s
  throttle: number;       // percentage
}
```

## IPC Communication
The application uses Electron's IPC (Inter-Process Communication) for secure communication between the main process and renderer:

### Main → Renderer
- `telemetry-data`: Sends telemetry updates every 100ms

### Renderer → Main
- `start-telemetry`: Start telemetry simulation
- `stop-telemetry`: Stop telemetry simulation
- `get-telemetry-status`: Check if simulation is active

## Building for Production

### Desktop Application
```bash
# Build the app
npm run electron:build

# Output will be in the release/ directory
```

### Distribution
The built application will be packaged for your platform:
- **Windows**: NSIS installer (.exe)
- **macOS**: DMG image (.dmg)
- **Linux**: AppImage (.AppImage)

## License
MIT

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments
- Built with [Electron](https://www.electronjs.org/)
- UI powered by [React](https://react.dev/)
- Maps by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/)
- Grid layout by [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
