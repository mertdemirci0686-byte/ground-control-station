import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const FlightModeWidget: React.FC<Props> = ({ telemetry }) => {
  const flightMode = telemetry?.flightMode ?? 'UNKNOWN';
  const armed = telemetry?.armed ?? false;
  const throttle = telemetry?.throttle ?? 0;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Flight Status</span>
      </div>
      <div className="widget-content" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: 'var(--hud-text-dim)', marginBottom: '8px' }}>Flight Mode</div>
          <div style={{ 
            fontSize: '28px', 
            color: 'var(--hud-primary)', 
            fontWeight: '700',
            textShadow: '0 0 10px var(--hud-primary)'
          }}>
            {flightMode}
          </div>
        </div>
        
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            padding: '10px',
            background: armed ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 170, 0, 0.1)',
            border: `1px solid ${armed ? 'var(--hud-primary)' : 'var(--hud-warning)'}`,
            borderRadius: '4px'
          }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: armed ? 'var(--hud-primary)' : 'var(--hud-warning)',
              boxShadow: `0 0 10px ${armed ? 'var(--hud-primary)' : 'var(--hud-warning)'}`
            }} />
            <div style={{ fontSize: '16px', fontWeight: '600' }}>
              {armed ? 'ARMED' : 'DISARMED'}
            </div>
          </div>
        </div>
        
        <div style={{ width: '100%' }}>
          <div style={{ fontSize: '14px', color: 'var(--hud-text-dim)', marginBottom: '8px' }}>Throttle</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: '30px', background: 'var(--hud-bg-dark)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${throttle}%`,
                background: 'linear-gradient(90deg, var(--hud-primary), var(--hud-secondary))',
                transition: 'width 0.2s ease',
                boxShadow: '0 0 10px var(--hud-primary)'
              }} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', minWidth: '45px' }}>
              {throttle}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
