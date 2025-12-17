import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const SpeedWidget: React.FC<Props> = ({ telemetry }) => {
  const speed = telemetry?.speed ?? 0;
  const color = speed > 30 ? '#ff3366' : speed > 20 ? '#ffaa00' : '#00ff88';

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Airspeed</span>
      </div>
      <div className="widget-content">
        <div className="widget-value" style={{ color }}>
          {speed.toFixed(1)}
        </div>
        <div className="widget-unit">m/s</div>
        <div className="widget-label">Ground Speed: {telemetry?.groundSpeed?.toFixed(1) ?? '0.0'} m/s</div>
      </div>
    </div>
  );
};
