import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GridLayout, { Layout } from 'react-grid-layout';
import { motion } from 'framer-motion';
import { Edit3, Save, Lock, Unlock } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

// Import widgets
import ArtificialHorizon from '../../components/widgets/ArtificialHorizon';
import AltitudeGauge from '../../components/widgets/AltitudeGauge';
import SpeedGauge from '../../components/widgets/SpeedGauge';
import BatteryWidget from '../../components/widgets/BatteryWidget';
import CompassWidget from '../../components/widgets/CompassWidget';
import GPSMap from '../../components/widgets/GPSMap';
import CameraFeed from '../../components/widgets/CameraFeed';
import HeadingTape from '../../components/widgets/HeadingTape';
import VerticalSpeed from '../../components/widgets/VerticalSpeed';
import MotorRPM from '../../components/widgets/MotorRPM';
import TemperatureWidget from '../../components/widgets/TemperatureWidget';
import StatusBar from '../../components/widgets/StatusBar';
import RealtimeChart from '../../components/widgets/RealtimeChart';
import NeonButton from '../../components/ui/NeonButton';

// Import react-grid-layout styles
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface WidgetDefinition {
  id: string;
  name: string;
  component: React.ComponentType;
}

const widgetDefinitions: WidgetDefinition[] = [
  { id: 'camera', name: '🎥 Camera Feed', component: CameraFeed },
  { id: 'artificialHorizon', name: '✈️ Artificial Horizon', component: ArtificialHorizon },
  { id: 'headingTape', name: '🧭 Heading Tape', component: HeadingTape },
  { id: 'altitudeGauge', name: '📏 Altitude', component: AltitudeGauge },
  { id: 'speedGauge', name: '⚡ Speed', component: SpeedGauge },
  { id: 'verticalSpeed', name: '⬆️ Vertical Speed', component: VerticalSpeed },
  { id: 'battery', name: '🔋 Battery', component: BatteryWidget },
  { id: 'temperature', name: '🌡️ Temperature', component: TemperatureWidget },
  { id: 'motorRPM', name: '⚙️ Motor RPM', component: MotorRPM },
  { id: 'compass', name: '🧭 Compass', component: CompassWidget },
  { id: 'gps', name: '🛰️ GPS Map', component: GPSMap },
  { id: 'statusBar', name: '📊 Status Bar', component: StatusBar },
  { id: 'chartAltitude', name: '📈 Altitude Chart', component: () => <RealtimeChart dataKey="altitude" title="Altitude" unit="m" /> },
  { id: 'chartSpeed', name: '📈 Speed Chart', component: () => <RealtimeChart dataKey="speed" title="Speed" color="#00ff88" unit="km/h" /> },
];

const defaultLayout: Layout[] = [
  { i: 'camera', x: 4, y: 1, w: 8, h: 6, minW: 4, minH: 4 },
  { i: 'artificialHorizon', x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
  { i: 'headingTape', x: 6, y: 0, w: 4, h: 2, minW: 3, minH: 1 },
  { i: 'altitudeGauge', x: 18, y: 2, w: 2, h: 4, minW: 2, minH: 3 },
  { i: 'speedGauge', x: 0, y: 2, w: 2, h: 4, minW: 2, minH: 3 },
  { i: 'verticalSpeed', x: 2, y: 2, w: 2, h: 3, minW: 2, minH: 3 },
  { i: 'battery', x: 0, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
  { i: 'temperature', x: 2, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
  { i: 'motorRPM', x: 16, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
  { i: 'compass', x: 18, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
  { i: 'gps', x: 12, y: 1, w: 4, h: 4, minW: 3, minH: 3 },
  { i: 'statusBar', x: 4, y: 7, w: 12, h: 1, minW: 6, minH: 1 },
  { i: 'chartAltitude', x: 0, y: 8, w: 6, h: 3, minW: 4, minH: 2 },
  { i: 'chartSpeed', x: 6, y: 8, w: 6, h: 3, minW: 4, minH: 2 },
];

export default function DroneCockpitPro() {
  const { droneId } = useParams();
  const { addNotification } = useAppStore();
  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [editMode, setEditMode] = useState(false);
  const [lockedWidgets, setLockedWidgets] = useState<Set<string>>(new Set());

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      addNotification('success', 'Layout saved successfully');
      // Save to localStorage
      localStorage.setItem('cockpitLayout', JSON.stringify(layout));
    } else {
      addNotification('info', 'Edit mode enabled - drag and resize widgets');
    }
  };

  const toggleLock = (widgetId: string) => {
    const newLocked = new Set(lockedWidgets);
    if (newLocked.has(widgetId)) {
      newLocked.delete(widgetId);
      addNotification('info', `Widget unlocked: ${widgetId}`);
    } else {
      newLocked.add(widgetId);
      addNotification('info', `Widget locked: ${widgetId}`);
    }
    setLockedWidgets(newLocked);
  };

  // Load saved layout on mount
  useState(() => {
    const saved = localStorage.getItem('cockpitLayout');
    if (saved) {
      try {
        setLayout(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved layout', e);
      }
    }
  });

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-cyan/30 to-transparent scan-line" />
      </div>

      {/* Corner HUD Elements */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, idx) => (
        <motion.div
          key={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className={`absolute ${pos} w-16 h-16 pointer-events-none z-50`}
        >
          <div className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-cyan-400/40" />
        </motion.div>
      ))}

      {/* Top Bar with Title and Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="glass-strong rounded-xl px-6 py-3 flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <span className="text-white">NEXUS</span>
            <span className="text-cyan-400 ml-2">COCKPIT</span>
          </div>
          <div className="h-6 w-px bg-cyan-400/50" />
          <div className="text-cyan-300 font-semibold">
            {droneId || 'DJI Mavic 3'}
          </div>
        </div>
      </motion.div>

      {/* Edit Mode Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 right-6 z-50 space-y-2"
      >
        <NeonButton
          onClick={toggleEditMode}
          color={editMode ? 'green' : 'cyan'}
        >
          {editMode ? (
            <>
              <Save className="w-5 h-5 inline mr-2" />
              Save Layout
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5 inline mr-2" />
              Edit Layout
            </>
          )}
        </NeonButton>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="absolute inset-0 p-24 pt-32 overflow-auto">
        <GridLayout
          className="layout"
          layout={layout}
          cols={20}
          rowHeight={50}
          width={1920}
          isDraggable={editMode}
          isResizable={editMode}
          compactType={null}
          preventCollision={false}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".widget-drag-handle"
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {widgetDefinitions.map((widget) => {
            const Component = widget.component;
            const isLocked = lockedWidgets.has(widget.id);
            
            return (
              <div
                key={widget.id}
                className={`
                  relative rounded-lg overflow-hidden
                  ${editMode ? 'ring-2 ring-cyan-400/50' : ''}
                  ${isLocked ? 'ring-2 ring-red-500/50' : ''}
                `}
              >
                {/* Widget Header (visible in edit mode) */}
                {editMode && (
                  <div className="widget-drag-handle absolute top-0 left-0 right-0 h-8 bg-black/80 border-b border-cyan-400/50 flex items-center justify-between px-2 cursor-move z-10">
                    <span className="text-xs text-cyan-300 font-bold">
                      {widget.name}
                    </span>
                    <button
                      onClick={() => toggleLock(widget.id)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                  </div>
                )}
                
                {/* Widget Content */}
                <div className={editMode ? 'pt-8' : ''}>
                  <Component />
                </div>
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
}
