import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPoint } from './MetricTrendChart';

export type TrendSeries = { id: string; label: string; color: string; points: ChartPoint[] };

export function MultiTrendChart({
  series,
  suffix = '',
}: {
  series: TrendSeries[];
  suffix?: string;
}) {
  const length = Math.max(...series.map((item) => item.points.length), 0);
  const data = Array.from({ length }, (_, index) => ({
    day: series[0]?.points[index]?.day ?? `D-${length - index - 1}`,
    ...Object.fromEntries(series.map((item) => [item.id, item.points[index]?.value])),
  }));
  return (
    <div className="multi-trend-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid vertical={false} stroke="#263149" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={34} />
          <Tooltip formatter={(value, name) => [`${value}${suffix}`, name]} />
          <Legend />
          {series.map((item) => (
            <Line
              key={item.id}
              type="monotone"
              dataKey={item.id}
              name={item.label}
              stroke={item.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
