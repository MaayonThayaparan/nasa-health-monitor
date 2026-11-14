import type { CrewMember, HealthStatus } from '../types/mission';
import { StatusBadge } from './StatusBadge';
interface Vital {
  label: string;
  value: string;
  status: HealthStatus;
}
export function VitalsPanel({ person, solar }: { person: CrewMember; solar: boolean }) {
  const atRisk = solar && person.id === 'mateo';
  const readings: Vital[] = [
    { label: 'Heart rate', value: `${person.hr} bpm`, status: atRisk ? 'monitor' : 'stable' },
    { label: 'Blood pressure', value: person.bp, status: 'stable' },
    { label: 'Sleep', value: person.sleep, status: atRisk ? 'urgent' : 'stable' },
    { label: 'Mood check-in', value: `${person.mood}/5`, status: atRisk ? 'monitor' : 'stable' },
    { label: 'Radiation dose', value: person.dose, status: atRisk ? 'urgent' : 'stable' },
  ];
  return (
    <div className="panel vital-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">INDICATORS</p>
          <h3>Latest readings</h3>
        </div>
      </div>
      {readings.map((reading) => (
        <div className="vital" key={reading.label}>
          <span>{reading.label}</span>
          <b>{reading.value}</b>
          <StatusBadge status={reading.status} />
        </div>
      ))}
    </div>
  );
}
