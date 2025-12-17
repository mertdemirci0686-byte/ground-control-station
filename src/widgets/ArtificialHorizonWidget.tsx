import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const ArtificialHorizonWidget: React.FC<Props> = ({ telemetry }) => {
  const pitch = telemetry?.pitch ?? 0;
  const roll = telemetry?.roll ?? 0;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Artificial Horizon</span>
      </div>
      <div className="widget-content">
        <svg width="280" height="280" viewBox="0 0 300 300">
          <defs>
            <clipPath id="horizon-clip">
              <circle cx="150" cy="150" r="130" />
            </clipPath>
          </defs>
          
          {/* Background */}
          <circle cx="150" cy="150" r="140" fill="var(--hud-bg-light)" stroke="var(--hud-border)" strokeWidth="2" />
          
          <g clipPath="url(#horizon-clip)">
            {/* Sky */}
            <rect 
              x="0" 
              y={150 - pitch * 2} 
              width="300" 
              height="150" 
              fill="#1a4d7a" 
              transform={`rotate(${-roll} 150 150)`}
            />
            
            {/* Ground */}
            <rect 
              x="0" 
              y={150 - pitch * 2} 
              width="300" 
              height="150" 
              fill="#3d2817" 
              transform={`rotate(${-roll} 150 150)`}
            />
            
            {/* Horizon line */}
            <line 
              x1="0" 
              y1={150 - pitch * 2} 
              x2="300" 
              y2={150 - pitch * 2} 
              stroke="var(--hud-primary)" 
              strokeWidth="3"
              transform={`rotate(${-roll} 150 150)`}
              style={{ filter: 'drop-shadow(0 0 3px var(--hud-primary))' }}
            />
            
            {/* Pitch ladder */}
            {[-20, -10, 10, 20].map(angle => {
              const y = 150 - pitch * 2 - angle * 2;
              return (
                <g key={angle} transform={`rotate(${-roll} 150 150)`}>
                  <line 
                    x1="100" 
                    y1={y} 
                    x2="200" 
                    y2={y} 
                    stroke="var(--hud-text)" 
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  <text 
                    x="85" 
                    y={y + 5} 
                    fill="var(--hud-text)" 
                    fontSize="12" 
                    opacity="0.8"
                  >
                    {angle}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Center marker */}
          <line x1="120" y1="150" x2="100" y2="150" stroke="var(--hud-warning)" strokeWidth="3" />
          <line x1="180" y1="150" x2="200" y2="150" stroke="var(--hud-warning)" strokeWidth="3" />
          <circle cx="150" cy="150" r="5" fill="none" stroke="var(--hud-warning)" strokeWidth="2" />
          
          {/* Outer circle */}
          <circle cx="150" cy="150" r="140" fill="none" stroke="var(--hud-primary)" strokeWidth="2" />
          
          {/* Roll indicator */}
          <g transform={`rotate(${-roll} 150 150)`}>
            <path d="M 150 10 L 145 20 L 155 20 Z" fill="var(--hud-warning)" />
          </g>
        </svg>
        
        <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--hud-text-dim)' }}>Pitch</div>
            <div style={{ fontSize: '20px', color: 'var(--hud-primary)', fontWeight: '600' }}>
              {pitch.toFixed(1)}°
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--hud-text-dim)' }}>Roll</div>
            <div style={{ fontSize: '20px', color: 'var(--hud-primary)', fontWeight: '600' }}>
              {roll.toFixed(1)}°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
