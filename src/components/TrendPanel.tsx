import { MetricTrendChart, type ChartPoint } from './MetricTrendChart';

export function TrendPanel({
  title,
  description,
  points,
  unit,
}: {
  title: string;
  description?: string;
  points: ChartPoint[];
  unit: string;
}) {
  return (
    <section className="trend-panel">
      <div>
        <p className="eyebrow">TREND</p>
        <h4>{title}</h4>
        {description && <p className="metric-trend">{description}</p>}
      </div>
      <MetricTrendChart points={points} unit={unit} />
    </section>
  );
}
