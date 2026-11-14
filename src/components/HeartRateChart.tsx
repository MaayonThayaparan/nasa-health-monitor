import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TrendPoint } from '../types/mission';
export function HeartRateChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="heart-rate-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ea8ff" stopOpacity=".45" />
              <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6ea8ff"
            strokeWidth={3}
            fill="url(#heart-rate-fill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
