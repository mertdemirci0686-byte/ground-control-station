import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const GPSWidget: React.FC<Props> = ({ telemetry }) => {
  const lat = telemetry?.latitude ?? 0;
  const lng = telemetry?.longitude ?? 0;
  const satellites = telemetry?.satellites ?? 0;
  
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">GPS Position</span>
      </div>
      <div className="widget-content" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div style={{ width: '100%', marginBottom: '15px' }}>
          <div style={{ fontSize: '14px', color: 'var(--hud-text-dim)', marginBottom: '5px' }}>Latitude</div>
          <div style={{ fontSize: '20px', color: 'var(--hud-primary)', fontWeight: '600' }}>
            {Math.abs(lat).toFixed(5)}° {latDir}
          </div>
        </div>
        <div style={{ width: '100%', marginBottom: '15px' }}>
          <div style={{ fontSize: '14px', color: 'var(--hud-text-dim)', marginBottom: '5px' }}>Longitude</div>
          <div style={{ fontSize: '20px', color: 'var(--hud-primary)', fontWeight: '600' }}>
            {Math.abs(lng).toFixed(5)}° {lngDir}
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="var(--hud-primary)" />
            <path d="M12 2L12 7M12 17L12 22M2 12L7 12M17 12L22 12" stroke="var(--hud-primary)" strokeWidth="2" />
          </svg>
          <div style={{ fontSize: '16px', color: 'var(--hud-text)' }}>
            {satellites} satellites
          </div>
        </div>
      </div>
    </div>
  );
};
