# Architecture Documentation

## Overview
The Ground Control Station is built using a modern desktop application stack with Electron as the runtime, React for the UI, and TypeScript for type safety.

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Electron App                            │
│                                                               │
│  ┌────────────────┐              ┌─────────────────────┐    │
│  │  Main Process  │◄────IPC─────►│ Renderer Process    │    │
│  │                │              │                     │    │
│  │ - Window Mgmt  │              │ - React App         │    │
│  │ - Telemetry    │              │ - Dashboard         │    │
│  │   Simulation   │              │ - Widgets           │    │
│  │ - IPC Handlers │              │ - State Management  │    │
│  └────────────────┘              └─────────────────────┘    │
│         │                                   │                 │
│         │                                   │                 │
│         ▼                                   ▼                 │
│  Node.js APIs                        Web APIs                │
│  - File System                       - DOM                   │
│  - Process                           - Canvas                │
│  - Native Modules                    - WebGL                 │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
└── Dashboard
    ├── AltitudeWidget
    ├── SpeedWidget
    ├── BatteryWidget
    ├── CompassWidget
    ├── GPSWidget
    ├── ArtificialHorizonWidget
    ├── FlightModeWidget
    ├── TelemetryTableWidget
    └── MapWidget
```

## Data Flow

### Telemetry Data Flow
```
Main Process (Electron)
    │
    │ setInterval(100ms)
    │
    ▼
Telemetry Simulation
    │
    │ generates TelemetryData
    │
    ▼
IPC Send: 'telemetry-data'
    │
    │ contextBridge
    │
    ▼
Renderer Process (React)
    │
    │ window.electronAPI.onTelemetryData
    │
    ▼
useState Hook in App
    │
    │ props
    │
    ▼
Dashboard Component
    │
    │ props
    │
    ▼
Individual Widgets
    │
    │ React render
    │
    ▼
DOM Update (UI)
```

## Key Design Decisions

### 1. Separation of Concerns
- **Main Process**: Handles system-level operations, telemetry simulation, and window management
- **Renderer Process**: Focuses purely on UI rendering and user interactions
- **Preload Script**: Acts as a secure bridge between main and renderer using contextBridge

### 2. Type Safety
- All telemetry data structures are fully typed with TypeScript
- Strict null checks and type assertions throughout
- Shared type definitions between main and renderer processes

### 3. Real-time Updates
- High-frequency telemetry updates (10Hz) for smooth animations
- React state management for efficient re-rendering
- Optimized widget components to prevent unnecessary renders

### 4. Customizable Layout
- react-grid-layout for drag-and-drop widget positioning
- LocalStorage persistence for user preferences
- Responsive breakpoints for different screen sizes

### 5. Professional HUD Styling
- CSS custom properties for consistent theming
- SVG for high-quality graphics (compass, horizon)
- Hardware-accelerated animations using transform and opacity

## Security Considerations

### Context Isolation
The application uses Electron's `contextIsolation: true` to prevent the renderer process from directly accessing Node.js APIs.

### Preload Script
All communication between renderer and main process goes through the preload script's exposed API:
```typescript
window.electronAPI = {
  onTelemetryData: (callback) => {...},
  startTelemetry: () => {...},
  stopTelemetry: () => {...},
  getTelemetryStatus: () => {...}
}
```

### No Direct Node Access
The renderer process cannot directly require Node.js modules, preventing potential security vulnerabilities.

## Performance Optimizations

### 1. Efficient Rendering
- React.memo for widget components (when needed)
- useCallback for event handlers to prevent re-creation
- Minimal state updates in parent components

### 2. Smooth Animations
- CSS transitions for visual feedback
- Transform-based positioning for grid layout
- RequestAnimationFrame for critical animations

### 3. Build Optimization
- Vite for fast development and optimized production builds
- Tree-shaking to remove unused code
- Code splitting for lazy-loaded components (future enhancement)

## Extensibility

### Adding New Widgets
1. Create widget component in `src/widgets/`
2. Define props interface with TelemetryData
3. Export from `src/widgets/index.ts`
4. Add to Dashboard's widgets object
5. Configure default layout position

### Adding New Telemetry Fields
1. Update TelemetryData interface in `src/types/index.ts`
2. Update Electron preload TelemetryData interface
3. Modify telemetry simulation in `electron/main.ts`
4. Update relevant widgets to display new data

### Custom Styling
All colors and styles are defined using CSS custom properties in `src/styles/index.css`:
```css
:root {
  --hud-primary: #00ff88;
  --hud-secondary: #00ccff;
  --hud-warning: #ffaa00;
  --hud-danger: #ff3366;
  /* ... more properties */
}
```

## Build Process

### Development
```
npm run dev
    │
    ▼
Vite Dev Server (Port 5173)
    │
    ├─► Hot Module Replacement
    │
    ├─► TypeScript Compilation
    │
    └─► Electron Launch
```

### Production
```
npm run build
    │
    ├─► TypeScript Compilation
    │
    ├─► Vite Build (Renderer)
    │
    ├─► Vite Build (Main Process)
    │
    └─► Electron Builder
            │
            ├─► Windows: NSIS Installer
            │
            ├─► macOS: DMG Image
            │
            └─► Linux: AppImage
```

## Testing Strategy (Future)
- Unit tests for widget components using React Testing Library
- Integration tests for IPC communication
- E2E tests using Playwright
- Visual regression tests for UI consistency

## Future Enhancements
1. **Real MAVLink Integration**: Connect to actual drones via MAVLink protocol
2. **Mission Planning**: Add waypoint planning and flight path visualization
3. **Data Logging**: Record telemetry to file for post-flight analysis
4. **Video Streaming**: Display live video feed from drone camera
5. **Multi-Vehicle Support**: Monitor multiple drones simultaneously
6. **3D Visualization**: Three.js based 3D drone model and terrain
7. **Custom Alerts**: Configurable alerts based on telemetry thresholds
8. **Geofencing**: Visual geofence boundaries on map
