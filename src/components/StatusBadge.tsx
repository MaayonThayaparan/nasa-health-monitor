import type { HealthStatus } from '../types/mission';
export function StatusBadge({ status }: { status: HealthStatus }) {
  return (
    <span className={`badge ${status}`}>
      <i />
      {status === 'stable' ? 'Nominal' : status === 'monitor' ? 'Monitor' : 'Action needed'}
    </span>
  );
}
