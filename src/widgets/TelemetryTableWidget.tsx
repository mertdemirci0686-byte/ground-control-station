import React from 'react';
import { TelemetryData } from '../types';

interface Props {
  telemetry: TelemetryData | null;
}

export const TelemetryTableWidget: React.FC<Props> = ({ telemetry }) => {
  if (!telemetry) {
    return (
      <div className="widget">
        <div className="widget-header">
          <span className="widget-title">Telemetry Data</span>
        </div>
        <div className="widget-content">
          <div style={{ color: 'var(--hud-text-dim)' }}>Waiting for data...</div>
        </div>
      </div>
    );
  }

  const data = [
    { label: 'Altitude', value: `${telemetry.altitude.toFixed(1)} m` },
    { label: 'Speed', value: `${telemetry.speed.toFixed(1)} m/s` },
    { label: 'Ground Speed', value: `${telemetry.groundSpeed.toFixed(1)} m/s` },
    { label: 'Vertical Speed', value: `${telemetry.verticalSpeed.toFixed(1)} m/s` },
    { label: 'Battery', value: `${telemetry.battery.toFixed(1)}%` },
    { label: 'Heading', value: `${telemetry.heading}°` },
    { label: 'Pitch', value: `${telemetry.pitch.toFixed(1)}°` },
    { label: 'Roll', value: `${telemetry.roll.toFixed(1)}°` },
    { label: 'Latitude', value: telemetry.latitude.toFixed(5) },
    { label: 'Longitude', value: telemetry.longitude.toFixed(5) },
    { label: 'Satellites', value: telemetry.satellites.toString() },
    { label: 'Flight Mode', value: telemetry.flightMode },
    { label: 'Armed', value: telemetry.armed ? 'YES' : 'NO' },
    { label: 'Throttle', value: `${telemetry.throttle}%` }
  ];

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">Telemetry Data</span>
      </div>
      <div className="widget-content" style={{ alignItems: 'stretch', justifyContent: 'flex-start', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ 
                borderBottom: '1px solid var(--hud-border)',
              }}>
                <td style={{ 
                  padding: '8px 12px', 
                  fontSize: '13px', 
                  color: 'var(--hud-text-dim)',
                  width: '50%'
                }}>
                  {item.label}
                </td>
                <td style={{ 
                  padding: '8px 12px', 
                  fontSize: '13px', 
                  color: 'var(--hud-primary)',
                  fontWeight: '600',
                  textAlign: 'right'
                }}>
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
