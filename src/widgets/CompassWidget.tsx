import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const CompassWidget: React.FC<Props> = ({ telemetry }) => {
  const heading = telemetry?.heading ?? 0;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Heading</span>
      </div>
      <div className="widget-content">
        <svg width="180" height="180" viewBox="0 0 200 200" style={{ marginBottom: '10px' }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--hud-border)" strokeWidth="2" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--hud-primary)" strokeWidth="1" opacity="0.3" />
          
          {/* Cardinal directions */}
          <text x="100" y="30" textAnchor="middle" fill="var(--hud-primary)" fontSize="16" fontWeight="bold">N</text>
          <text x="170" y="105" textAnchor="middle" fill="var(--hud-text-dim)" fontSize="14">E</text>
          <text x="100" y="180" textAnchor="middle" fill="var(--hud-text-dim)" fontSize="14">S</text>
          <text x="30" y="105" textAnchor="middle" fill="var(--hud-text-dim)" fontSize="14">W</text>
          
          {/* Heading indicator */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="25"
            stroke="var(--hud-primary)"
            strokeWidth="3"
            transform={`rotate(${heading} 100 100)`}
            style={{ filter: 'drop-shadow(0 0 5px var(--hud-primary))' }}
          />
          <circle cx="100" cy="100" r="8" fill="var(--hud-primary)" />
        </svg>
        <div className="widget-value" style={{ fontSize: '32px', color: 'var(--hud-primary)' }}>
          {heading}°
        </div>
      </div>
    </div>
  );
};
