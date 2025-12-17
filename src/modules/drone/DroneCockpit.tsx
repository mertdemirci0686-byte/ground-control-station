import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, Save } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import ArtificialHorizon from '../../components/widgets/ArtificialHorizon';
import AltitudeGauge from '../../components/widgets/AltitudeGauge';
import SpeedGauge from '../../components/widgets/SpeedGauge';
import BatteryWidget from '../../components/widgets/BatteryWidget';
import CompassWidget from '../../components/widgets/CompassWidget';
import GPSMap from '../../components/widgets/GPSMap';
import CameraFeed from '../../components/widgets/CameraFeed';

const widgets = [
  { id: 'artificialHorizon', name: 'Artificial Horizon', component: ArtificialHorizon },
  { id: 'altitudeGauge', name: 'Altitude', component: AltitudeGauge },
  { id: 'speedGauge', name: 'Speed', component: SpeedGauge },
  { id: 'battery', name: 'Battery', component: BatteryWidget },
  { id: 'compass', name: 'Compass', component: CompassWidget },
  { id: 'gps', name: 'GPS', component: GPSMap },
  { id: 'camera', name: 'Camera', component: CameraFeed },
];

export default function DroneCockpit() {
  const { droneId } = useParams();
  const { widgetLayout, setWidgetLayout, addNotification } = useAppStore();
  const [editMode, setEditMode] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (widgetId: string) => {
    if (editMode) {
      setDragging(widgetId);
    }
  };

  const handleDrag = (e: React.MouseEvent, widgetId: string) => {
    if (!editMode || !containerRef.current || dragging !== widgetId) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setWidgetLayout({
      ...widgetLayout,
      [widgetId]: {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      },
    });
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      addNotification('success', 'Layout saved successfully');
    } else {
      addNotification('info', 'Edit mode enabled - drag widgets to reposition');
    }
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mouseup', handleDragEnd);
      return () => document.removeEventListener('mouseup', handleDragEnd);
    }
  }, [dragging]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* HUD Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 p-6"
        onMouseMove={(e) => dragging && handleDrag(e, dragging)}
      >
        {/* Edit Mode Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleEditMode}
          className={`fixed top-24 right-6 z-50 p-4 rounded-xl font-bold transition-all hover-scale ${
            editMode
              ? 'bg-success/20 border-2 border-success text-success'
              : 'glass-strong text-white'
          }`}
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
        </motion.button>

        {/* Drone Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-xl p-4 inline-block"
        >
          <h2 className="text-xl font-bold text-white">
            Cockpit: <span className="text-primary">{droneId}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {editMode ? '✏️ Edit Mode Active' : '🚁 Live Flight Data'}
          </p>
        </motion.div>

        {/* Widgets */}
        {widgets.map((widget, index) => {
          const Component = widget.component;
          const position = widgetLayout[widget.id] || { x: 50, y: 50 };

          return (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`absolute ${editMode ? 'cursor-move' : ''} ${
                dragging === widget.id ? 'z-50 opacity-80' : ''
              }`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseDown={() => handleDragStart(widget.id)}
            >
              <div
                className={`transition-all ${
                  editMode ? 'ring-2 ring-primary ring-opacity-50' : ''
                }`}
              >
                <Component />
                {editMode && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 glass rounded px-2 py-1">
                    <span className="text-xs text-white whitespace-nowrap">
                      {widget.name}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent scan-line" />
      </div>

      {/* Corner HUD Elements */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-16 h-16 pointer-events-none`}>
          <div className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-primary/30" />
        </div>
      ))}
    </div>
  );
}
