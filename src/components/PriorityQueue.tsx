import { AlertTriangle, ChevronRight, Clock3 } from 'lucide-react';
import type { MissionAlert } from '../types/mission';
export function PriorityQueue({
  alerts,
  onAction,
}: {
  alerts: MissionAlert[];
  onAction: () => void;
}) {
  return (
    <div className="panel alert-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">PRIORITY QUEUE</p>
          <h3>Attention needed</h3>
        </div>
        <span className="count">{alerts.length}</span>
      </div>
      {alerts.map((alert) => (
        <div className={`alert ${alert.level}`} key={alert.title}>
          <div className="alert-icon">
            {alert.level === 'urgent' ? <AlertTriangle /> : <Clock3 />}
          </div>
          <div>
            <b>{alert.title}</b>
            <p>{alert.detail}</p>
            <button onClick={onAction}>
              {alert.action} <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
