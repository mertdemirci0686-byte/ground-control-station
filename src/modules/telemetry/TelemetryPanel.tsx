import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppStore } from '../../store/appStore';
import { format } from 'date-fns';

export default function TelemetryPanel() {
  const { telemetry, currentTelemetry } = useAppStore();

  const chartData = telemetry.map((data) => ({
    time: format(data.timestamp, 'HH:mm:ss'),
    battery: data.battery,
    voltage: data.voltage,
    altitude: data.altitude,
    temperature: data.temperature,
  }));

  return (
    <div className="w-full h-full p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white neon-text mb-2">Real-Time Telemetry</h1>
          <p className="text-gray-400">Live data monitoring and analysis</p>
        </div>

        {/* Current Values */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="glass-strong rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Battery Level</p>
            <p className="text-3xl font-bold text-success">
              {Math.round(currentTelemetry.battery)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentTelemetry.voltage.toFixed(2)}V
            </p>
          </div>
          <div className="glass-strong rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Altitude</p>
            <p className="text-3xl font-bold text-primary">
              {Math.round(currentTelemetry.altitude)}m
            </p>
            <p className="text-xs text-gray-500 mt-1">Above ground</p>
          </div>
          <div className="glass-strong rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Speed</p>
            <p className="text-3xl font-bold text-warning">
              {Math.round(currentTelemetry.speed)} km/h
            </p>
            <p className="text-xs text-gray-500 mt-1">Ground speed</p>
          </div>
          <div className="glass-strong rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Temperature</p>
            <p className="text-3xl font-bold text-secondary">
              {Math.round(currentTelemetry.temperature)}°C
            </p>
            <p className="text-xs text-gray-500 mt-1">System temp</p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Battery Chart */}
          <div className="glass-strong rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Battery & Voltage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="battery"
                  stroke="#00ff88"
                  strokeWidth={2}
                  dot={false}
                  name="Battery (%)"
                />
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke="#00f3ff"
                  strokeWidth={2}
                  dot={false}
                  name="Voltage (V)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Altitude Chart */}
          <div className="glass-strong rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Altitude Profile</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="altitude"
                  stroke="#00f3ff"
                  fill="url(#altitudeGradient)"
                  strokeWidth={2}
                  name="Altitude (m)"
                />
                <defs>
                  <linearGradient id="altitudeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f3ff" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#00f3ff" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature Chart */}
          <div className="glass-strong rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">System Temperature</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ff6b35"
                  strokeWidth={2}
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
