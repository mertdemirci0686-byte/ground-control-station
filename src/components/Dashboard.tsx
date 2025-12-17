import { useState, useCallback, useEffect, useRef } from 'react';
import { Responsive, Layout } from 'react-grid-layout';
import { TelemetryData } from '../types';
import {
  AltitudeWidget,
  SpeedWidget,
  BatteryWidget,
  CompassWidget,
  GPSWidget,
  ArtificialHorizonWidget,
  FlightModeWidget,
  TelemetryTableWidget,
  MapWidget
} from '../widgets';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  telemetry: TelemetryData | null;
}

const defaultLayouts = {
  lg: [
    { i: 'altitude', x: 0, y: 0, w: 2, h: 2 },
    { i: 'speed', x: 2, y: 0, w: 2, h: 2 },
    { i: 'battery', x: 4, y: 0, w: 2, h: 2 },
    { i: 'compass', x: 6, y: 0, w: 2, h: 2 },
    { i: 'horizon', x: 0, y: 2, w: 4, h: 3 },
    { i: 'gps', x: 4, y: 2, w: 2, h: 2 },
    { i: 'flightMode', x: 6, y: 2, w: 2, h: 2 },
    { i: 'telemetry', x: 4, y: 4, w: 4, h: 3 },
    { i: 'map', x: 0, y: 5, w: 4, h: 4 }
  ]
};

export const Dashboard: React.FC<Props> = ({ telemetry }) => {
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  const onLayoutChange = useCallback((_layout: Layout, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(allLayouts));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-layouts');
    if (saved) {
      try {
        setLayouts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved layout:', e);
      }
    }
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const widgets = {
    altitude: <AltitudeWidget telemetry={telemetry} />,
    speed: <SpeedWidget telemetry={telemetry} />,
    battery: <BatteryWidget telemetry={telemetry} />,
    compass: <CompassWidget telemetry={telemetry} />,
    gps: <GPSWidget telemetry={telemetry} />,
    horizon: <ArtificialHorizonWidget telemetry={telemetry} />,
    flightMode: <FlightModeWidget telemetry={telemetry} />,
    telemetry: <TelemetryTableWidget telemetry={telemetry} />,
    map: <MapWidget telemetry={telemetry} />
  };

  return (
    <div className="dashboard-container" ref={containerRef}>
      <Responsive
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 2 }}
        rowHeight={80}
        width={containerWidth}
        onLayoutChange={onLayoutChange}
        dragConfig={{
          enabled: true,
          handle: '.widget-header',
          bounded: false,
          threshold: 3
        }}
      >
        {Object.entries(widgets).map(([key, widget]) => (
          <div key={key} style={{ cursor: 'move' }}>
            {widget}
          </div>
        ))}
      </Responsive>
    </div>
  );
};
