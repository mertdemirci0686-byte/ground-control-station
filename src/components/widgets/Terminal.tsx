import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CommandHistoryEntry {
  command: string;
  output: string;
  timestamp: string;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: '',
      output: 'NEXUS Command Terminal v3.0\nType "help" for available commands',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, (args: string[]) => string> = {
    help: () => `Available commands:
  help          - Show this help message
  status        - Show system status
  telemetry     - Display telemetry data
  arm           - Arm the drone
  disarm        - Disarm the drone
  takeoff <alt> - Takeoff to specified altitude
  land          - Land the drone
  clear         - Clear terminal
  echo <text>   - Echo text`,
    
    status: () => `System Status:
  Connection: Active
  GPS: 12 satellites
  Battery: 85%
  Mode: STABILIZE
  Armed: Yes`,
    
    telemetry: () => `Telemetry Data:
  Altitude: 45.2m
  Speed: 12.5 km/h
  Heading: 127°
  Vertical Speed: +2.1 m/s
  Temperature: 28°C`,
    
    arm: () => 'Drone armed successfully',
    disarm: () => 'Drone disarmed',
    takeoff: (args) => {
      const altitude = args[0] || '10';
      return `Initiating takeoff to ${altitude}m...`;
    },
    land: () => 'Initiating landing sequence...',
    clear: () => '__CLEAR__',
    echo: (args) => args.join(' '),
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';
    
    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[command]) {
      output = commands[command](args);
    } else {
      output = `Command not found: ${command}\nType "help" for available commands`;
    }

    const entry: CommandHistoryEntry = {
      command: trimmed,
      output,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [...prev, entry]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.filter(h => h.command).map(h => h.command);
      if (commands.length > 0) {
        const newIndex = historyIndex < commands.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        const commands = history.filter(h => h.command).map(h => h.command);
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="glass-strong rounded-lg p-4 w-full h-96 flex flex-col">
      <div className="text-xs text-cyan-300 mb-3 font-bold uppercase tracking-wider">
        Interactive Terminal
      </div>

      {/* Terminal Output */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-black/70 rounded border border-cyan-500/30 p-3 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3"
          >
            {entry.command && (
              <div className="flex space-x-2">
                <span className="text-cyan-400">$</span>
                <span className="text-cyan-300">{entry.command}</span>
              </div>
            )}
            <div className="text-gray-300 whitespace-pre-wrap ml-4 mt-1">
              {entry.output}
            </div>
          </motion.div>
        ))}

        {/* Input Line */}
        <div className="flex space-x-2">
          <span className="text-cyan-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-cyan-300 outline-none"
            placeholder="Enter command..."
          />
          <span className="text-cyan-400 animate-pulse">_</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 text-xs text-gray-400 flex justify-between">
        <span>Use ↑/↓ for command history</span>
        <span>{history.filter(h => h.command).length} commands executed</span>
      </div>
    </div>
  );
}
