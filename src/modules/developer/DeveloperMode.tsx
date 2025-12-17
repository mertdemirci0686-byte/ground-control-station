import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Trash2, Download } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export default function DeveloperMode() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toISOString(), level: 'info', message: 'Application started' },
    { id: 2, timestamp: new Date().toISOString(), level: 'info', message: 'Electron API initialized' },
    { id: 3, timestamp: new Date().toISOString(), level: 'info', message: 'Mock API loaded for browser mode' },
  ]);

  useEffect(() => {
    // Simulate log generation
    const interval = setInterval(() => {
      const messages = [
        'Telemetry data received',
        'Widget position updated',
        'Theme changed successfully',
        'Connection status updated',
        'Auto-save triggered',
      ];
      const levels: Array<'info' | 'warn' | 'error'> = ['info', 'info', 'info', 'warn', 'error'];
      const randomIndex = Math.floor(Math.random() * messages.length);
      
      setLogs((prev) => [
        ...prev.slice(-49),
        {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          level: levels[randomIndex],
          message: messages[randomIndex],
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-error';
      case 'warn':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const logText = logs
      .map((log) => `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`)
      .join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gcs-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full p-8 overflow-hidden flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col max-w-7xl mx-auto w-full"
      >
        {/* Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white neon-text mb-2">Developer Console</h1>
            <p className="text-gray-400">Real-time application logs and diagnostics</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportLogs}
              className="px-4 py-2 glass-strong rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-success" />
              <span className="text-white">Export</span>
            </button>
            <button
              onClick={clearLogs}
              className="px-4 py-2 glass-strong rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4 text-error" />
              <span className="text-white">Clear</span>
            </button>
          </div>
        </div>

        {/* Console */}
        <div className="flex-1 glass-strong rounded-xl p-6 overflow-hidden flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-white">Console Output</h2>
            <span className="text-xs text-gray-400">({logs.length} entries)</span>
          </div>

          <div className="flex-1 overflow-auto font-mono text-sm space-y-1">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 hover:bg-white/5 px-2 py-1 rounded">
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className={`${getLevelColor(log.level)} font-bold uppercase text-xs whitespace-nowrap`}>
                  [{log.level}]
                </span>
                <span className="text-gray-300 flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="glass rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Total Logs</p>
            <p className="text-2xl font-bold text-white">{logs.length}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Errors</p>
            <p className="text-2xl font-bold text-error">
              {logs.filter((l) => l.level === 'error').length}
            </p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Warnings</p>
            <p className="text-2xl font-bold text-warning">
              {logs.filter((l) => l.level === 'warn').length}
            </p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Info</p>
            <p className="text-2xl font-bold text-primary">
              {logs.filter((l) => l.level === 'info').length}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
