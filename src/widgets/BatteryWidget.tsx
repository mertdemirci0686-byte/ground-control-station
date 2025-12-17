import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const BatteryWidget: React.FC<Props> = ({ telemetry }) => {
  const battery = telemetry?.battery ?? 0;
  const color = battery > 50 ? '#00ff88' : battery > 20 ? '#ffaa00' : '#ff3366';

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Battery</span>
      </div>
      <div className="widget-content">
        <div className="widget-value" style={{ color }}>
          {battery.toFixed(1)}
        </div>
        <div className="widget-unit">%</div>
        <div className="widget-label">Remaining</div>
        <div style={{ 
          marginTop: '15px', 
          width: '80%', 
          height: '20px', 
          border: `2px solid ${color}`,
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${battery}%`,
            background: color,
            transition: 'width 0.3s ease',
            boxShadow: `0 0 10px ${color}`
          }} />
        </div>
      </div>
    </div>
  );
};
