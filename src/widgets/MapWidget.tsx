import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TelemetryData } from '../types';
import 'leaflet/dist/leaflet.css';

interface Props {
  telemetry: TelemetryData | null;
}

// Fix for default marker icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom drone icon
const droneIcon = L.divIcon({
  className: 'drone-marker',
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background: var(--hud-primary);
      border: 2px solid var(--hud-bg-dark);
      border-radius: 50%;
      box-shadow: 0 0 15px var(--hud-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--hud-bg-dark)">
        <path d="M12 2L4 8l8 4 8-4-8-6zm0 18l-8-4v-6l8 4 8-4v6l-8 4z"/>
      </svg>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  
  return null;
}

export const MapWidget: React.FC<Props> = ({ telemetry }) => {
  const position: [number, number] = telemetry 
    ? [telemetry.latitude, telemetry.longitude]
    : [37.7749, -122.4194];

  return (
    <div className="widget" style={{ padding: 0 }}>
      <div className="widget-header" style={{ margin: '15px', marginBottom: '10px' }}>
        <span className="widget-title">Map View</span>
      </div>
      <div style={{ flex: 1, position: 'relative', minHeight: '200px' }}>
        <MapContainer
          center={position}
          zoom={17}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={droneIcon}>
            <Popup>
              <div style={{ fontFamily: 'monospace' }}>
                <strong>Drone Position</strong><br />
                Lat: {telemetry?.latitude.toFixed(5)}<br />
                Lng: {telemetry?.longitude.toFixed(5)}<br />
                Alt: {telemetry?.altitude.toFixed(1)} m
              </div>
            </Popup>
          </Marker>
          <MapUpdater position={position} />
        </MapContainer>
      </div>
    </div>
  );
};
