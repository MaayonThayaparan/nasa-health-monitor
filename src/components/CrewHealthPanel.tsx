import { ChevronRight } from 'lucide-react';
import type { CrewMember } from '../types/mission';
import { StatusBadge } from './StatusBadge';
export function CrewHealthPanel({
  crew,
  onSelect,
}: {
  crew: CrewMember[];
  onSelect: (_id: string) => void;
}) {
  return (
    <div className="panel crew-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">CREW HEALTH</p>
          <h3>Daily readiness</h3>
        </div>
        <button className="text-btn">
          Crew roster <ChevronRight size={16} />
        </button>
      </div>
      <div className="crew-list">
        {crew.map((person) => (
          <button className="crew-row" onClick={() => onSelect(person.id)} key={person.id}>
            <div className="avatar" style={{ background: person.color }}>
              {person.initials}
            </div>
            <div className="crew-name">
              <b>{person.name}</b>
              <span>
                {person.role} · {person.location}
              </span>
            </div>
            <div className="mini-score">
              <strong>{person.score}</strong>
              <span>readiness</span>
            </div>
            <StatusBadge status={person.status} />
            <ChevronRight className="arrow" size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
