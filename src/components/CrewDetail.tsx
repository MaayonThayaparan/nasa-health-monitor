import { ArrowLeft } from 'lucide-react';
import type { CrewMember } from '../types/mission';
import { HealthProfileTabs } from './HealthProfileTabs';
import { StatusBadge } from './StatusBadge';

export function CrewDetail({
  person,
  solar,
  onBack,
}: {
  person: CrewMember;
  solar: boolean;
  onBack: () => void;
}) {
  return (
    <section className="detail">
      <button className="back" onClick={onBack}>
        <ArrowLeft size={17} /> Back to mission overview
      </button>
      <div className="profile">
        <div className="avatar large" style={{ background: person.color }}>
          {person.initials}
        </div>
        <div>
          <p className="eyebrow">CREW HEALTH PROFILE</p>
          <h2>{person.name}</h2>
          <p>
            {person.role} · {person.location} · last checked {person.checked}
          </p>
        </div>
        <div className="profile-score">
          <span>READINESS</span>
          <strong>{person.score}</strong>
          <StatusBadge status={person.status} />
        </div>
      </div>
      <HealthProfileTabs astronautId={person.id} solar={solar} />
    </section>
  );
}
