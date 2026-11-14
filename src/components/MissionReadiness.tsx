import type { HealthStatus } from '../types/mission';
const tasks: { name: string; status: HealthStatus; reason: string }[] = [
  { name: 'EVA', status: 'urgent', reason: 'Radiation protocol unresolved' },
  { name: 'Rover excursion', status: 'monitor', reason: 'Repeat vitals required' },
  { name: 'High-focus operations', status: 'stable', reason: 'Crew readiness nominal' },
];
export function MissionReadiness({ solar }: { solar: boolean }) {
  return (
    <section className="panel readiness-panel">
      <p className="eyebrow">MISSION TASK READINESS</p>
      <h3>Can this crew member safely proceed?</h3>
      <div className="readiness-list">
        {tasks.map((task) => {
          const status = solar ? task.status : 'stable';
          return (
            <div key={task.name}>
              <b>{task.name}</b>
              <span className={`badge ${status}`}>
                <i />
                {status === 'stable'
                  ? 'Ready'
                  : status === 'monitor'
                    ? 'Needs review'
                    : 'Not ready'}
              </span>
              <small>{solar ? task.reason : 'No current blockers'}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
