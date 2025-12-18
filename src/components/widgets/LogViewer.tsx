import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
}

const levelColors = {
  info: 'text-cyan-400',
  warn: 'text-warning-orange',
  error: 'text-critical-red',
  debug: 'text-gray-400',
};

export default function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulate log generation
  useEffect(() => {
    const messages = [
      { level: 'info' as const, message: 'System initialized successfully' },
      { level: 'info' as const, message: 'Telemetry stream connected' },
      { level: 'debug' as const, message: 'GPS signal acquired: 12 satellites' },
      { level: 'warn' as const, message: 'Battery voltage below optimal level' },
      { level: 'info' as const, message: 'Camera feed active: 1920x1080@30fps' },
      { level: 'debug' as const, message: 'Compass calibration: OK' },
      { level: 'error' as const, message: 'Radio link quality degraded' },
      { level: 'info' as const, message: 'Waypoint #5 reached' },
      { level: 'warn' as const, message: 'Wind speed exceeds safe threshold' },
      { level: 'info' as const, message: 'Altitude hold mode activated' },
    ];

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: randomMessage.level,
        message: randomMessage.message,
      };

      setLogs((prev) => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter);

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const content = logs.map(log => `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry-logs-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="glass-strong rounded-lg p-4 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
          System Logs
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-black/50 border border-cyan-500/50 rounded text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warn">Warnings</option>
            <option value="error">Errors</option>
            <option value="debug">Debug</option>
          </select>

          {/* Auto-scroll Toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-2 py-1 text-xs rounded border ${
              autoScroll 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                : 'bg-gray-900/50 border-gray-600 text-gray-400'
            }`}
          >
            Auto-scroll
          </button>

          {/* Download */}
          <button
            onClick={downloadLogs}
            className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            title="Download logs"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Clear */}
          <button
            onClick={clearLogs}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
            title="Clear logs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Log Container */}
      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto bg-black/50 rounded border border-cyan-500/30 p-2 space-y-1 font-mono text-xs"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No logs to display</div>
        ) : (
          filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-2"
            >
              <span className="text-gray-500">[{log.timestamp}]</span>
              <span className={`font-bold uppercase ${levelColors[log.level]}`}>
                {log.level}:
              </span>
              <span className="text-gray-300">{log.message}</span>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{filteredLogs.length} entries</span>
        <span>
          {logs.filter(l => l.level === 'error').length} errors,{' '}
          {logs.filter(l => l.level === 'warn').length} warnings
        </span>
      </div>
    </div>
  );
}
