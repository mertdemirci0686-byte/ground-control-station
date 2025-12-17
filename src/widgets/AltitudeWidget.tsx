import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const AltitudeWidget: React.FC<Props> = ({ telemetry }) => {
  const altitude = telemetry?.altitude ?? 0;
  const color = altitude > 300 ? '#00ff88' : altitude > 150 ? '#ffaa00' : '#00ccff';

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Altitude</span>
      </div>
      <div className="widget-content">
        <div className="widget-value" style={{ color }}>
          {altitude.toFixed(1)}
        </div>
        <div className="widget-unit">meters</div>
        <div className="widget-label">MSL</div>
      </div>
    </div>
  );
};
