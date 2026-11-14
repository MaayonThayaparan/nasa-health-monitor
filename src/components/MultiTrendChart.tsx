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

export type TrendSeries = {
  id: string;
  label: string;
  color: string;
  points: ChartPoint[];
  axis?: 'left' | 'right';
  suffix?: string;
};

export function MultiTrendChart({
  series,
  suffix = '',
  leftAxisLabel,
  rightAxis,
}: {
  series: TrendSeries[];
  suffix?: string;
  leftAxisLabel?: string;
  rightAxis?: { label: string; max: number };
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
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            width={42}
            label={
              leftAxisLabel
                ? {
                    value: leftAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#8696ae', fontSize: 10 },
                  }
                : undefined
            }
          />
          {rightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, rightAxis.max]}
              ticks={Array.from({ length: rightAxis.max + 1 }, (_, index) => index)}
              tickLine={false}
              axisLine={false}
              width={54}
              label={{
                value: rightAxis.label,
                angle: 90,
                position: 'insideRight',
                style: { fill: '#b8d26e', fontSize: 10 },
              }}
            />
          )}
          <Tooltip
            formatter={(value, name) => {
              const item = series.find((entry) => entry.label === name);
              return [`${value}${item?.suffix ?? suffix}`, name];
            }}
          />
          <Legend />
          {series.map((item) => (
            <Line
              key={item.id}
              type="monotone"
              dataKey={item.id}
              yAxisId={item.axis ?? 'left'}
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
