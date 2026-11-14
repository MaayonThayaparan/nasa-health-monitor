import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
export interface ChartPoint {
  day: string;
  value: number;
  source: string;
}
export function MetricTrendChart({ points, unit }: { points: ChartPoint[]; unit: string }) {
  return (
    <div className="metric-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points}>
          <defs>
            <linearGradient id="metric-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6ea8ff" stopOpacity=".38" />
              <stop offset="1" stopColor="#6ea8ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#263149" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={30} />
          <Tooltip formatter={(value) => [`${value} ${unit}`, 'Reading']} />
          <Area
            dataKey="value"
            type="monotone"
            stroke="#6ea8ff"
            fill="url(#metric-fill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
