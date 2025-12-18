import { useAppStore } from '../../store/appStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RealtimeChartProps {
  dataKey?: 'altitude' | 'speed' | 'battery' | 'temperature';
  title?: string;
  color?: string;
  unit?: string;
}

export default function RealtimeChart({
  dataKey = 'altitude',
  title = 'Telemetry',
  color = '#00ffff',
  unit = '',
}: RealtimeChartProps) {
  const { telemetry } = useAppStore();

  // Format data for the chart
  const chartData = telemetry.slice(-20).map((data, index) => ({
    index,
    value: data[dataKey],
  }));

  return (
    <div className="glass-strong rounded-lg p-4 w-80 h-56">
      <div className="text-xs text-cyan-300 mb-2 font-bold uppercase tracking-wider">
        {title}
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
          <XAxis 
            dataKey="index" 
            stroke="rgba(0, 255, 255, 0.5)" 
            tick={{ fill: 'rgba(0, 255, 255, 0.7)', fontSize: 10 }}
          />
          <YAxis 
            stroke="rgba(0, 255, 255, 0.5)" 
            tick={{ fill: 'rgba(0, 255, 255, 0.7)', fontSize: 10 }}
            label={{ value: unit, angle: -90, position: 'insideLeft', fill: 'rgba(0, 255, 255, 0.7)' }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(0, 255, 255, 0.5)',
              borderRadius: '8px',
              color: '#00ffff',
            }}
            formatter={(value: number) => [value.toFixed(2) + ' ' + unit, title]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
