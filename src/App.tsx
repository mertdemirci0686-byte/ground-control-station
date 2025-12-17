import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TelemetryData } from './types';
import './styles/index.css';

function App() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onTelemetryData((data: TelemetryData) => {
        setTelemetry(data);
        setConnectionStatus('connected');
      });

      // Check telemetry status
      window.electronAPI.getTelemetryStatus().then(status => {
        if (status.active) {
          setConnectionStatus('connected');
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Ground Control Station</h1>
        <div className="status-bar">
          <div className="status-indicator">
            <div 
              className="status-dot" 
              style={{ 
                background: connectionStatus === 'connected' ? 'var(--hud-primary)' : 'var(--hud-danger)',
                boxShadow: `0 0 10px ${connectionStatus === 'connected' ? 'var(--hud-primary)' : 'var(--hud-danger)'}`
              }}
            />
            <span>{connectionStatus === 'connected' ? 'CONNECTED' : 'DISCONNECTED'}</span>
          </div>
          <div className="status-indicator">
            <span>FPS: {telemetry ? '10' : '0'}</span>
          </div>
          <div className="status-indicator">
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>
      <Dashboard telemetry={telemetry} />
    </div>
  );
}

export default App;
