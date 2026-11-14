import { useMemo, useState } from 'react';
import { getCrewMetrics } from './MetricLog';
import { getCrewExercises } from './WorkoutTracker';
import { MultiTrendChart, type TrendSeries } from './MultiTrendChart';

const colors = ['#6ea8ff', '#48d6b8', '#ffb86c', '#a980ff', '#ff7b89', '#74c7ec', '#b8d26e'];
export function PhysicalTrends({ astronautId }: { astronautId: string }) {
  const options = useMemo(
    () => [
      ...getCrewMetrics(astronautId).map((metric) => ({
        id: metric.id,
        label: metric.name,
        points: metric.trend,
      })),
      ...getCrewExercises(astronautId).map((exercise) => ({
        id: exercise.id,
        label: exercise.name,
        points: exercise.trainingTrend.map((value, index) => ({
          day: `D-${exercise.trainingTrend.length - index - 1}`,
          value,
          source: 'simulated',
        })),
      })),
    ],
    [astronautId],
  );
  const [selected, setSelected] = useState<string[]>(['heart-rate', 'sleep', 'squat']);
  const series: TrendSeries[] = options
    .filter((item) => selected.includes(item.id))
    .map((item, index) => {
      const baseline = item.points[0]?.value || 1;
      return {
        ...item,
        color: colors[index % colors.length],
        points: item.points.map((point) => ({
          ...point,
          value: Number(((point.value / baseline) * 100).toFixed(1)),
        })),
      };
    });
  const toggle = (id: string) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  return (
    <section className="panel physical-trends">
      <p className="eyebrow">COMBINED PHYSICAL TRENDS</p>
      <h3>Compare health and training patterns</h3>
      <p className="metric-trend">
        All series are indexed to their first displayed reading (100%) so different units can be
        compared safely.
      </p>
      <div className="trend-selector">
        {options.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggle(item.id)}
            />
            {item.label}
          </label>
        ))}
      </div>
      {series.length ? (
        <MultiTrendChart series={series} suffix="% baseline" />
      ) : (
        <p className="entry-note">Select one or more health or workout series to view trends.</p>
      )}
    </section>
  );
}
