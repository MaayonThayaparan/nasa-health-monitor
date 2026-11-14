import type { EnvironmentMetric } from '../types/mission';
import { StatusBadge } from './StatusBadge';
export function EnvironmentMetrics({ metrics }: { metrics: EnvironmentMetric[] }) {
  return (
    <section className="metrics" aria-label="Habitat environment metrics">
      {metrics.map(({ label, value, status, icon: Icon }) => (
        <article key={label} className={`metric ${status}`}>
          <div className="metric-icon">
            <Icon size={18} />
          </div>
          <div>
            <span>{label}</span>
            <b>{value}</b>
          </div>
          <StatusBadge status={status} />
        </article>
      ))}
    </section>
  );
}
