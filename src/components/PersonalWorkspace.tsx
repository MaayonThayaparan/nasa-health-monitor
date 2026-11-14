import { useEffect, useMemo, useState } from 'react';
import { CrewDetail } from './CrewDetail';
import type { CrewMember } from '../types/mission';

const dayKey = (date: string) => new Date(date).toLocaleDateString('en-CA');
export function PersonalWorkspace({
  person,
  solar,
  onLogout,
}: {
  person: CrewMember;
  solar: boolean;
  onLogout: () => void;
}) {
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener('mission-pulse:update', refresh);
    return () => window.removeEventListener('mission-pulse:update', refresh);
  }, []);
  const reminders = useMemo(() => {
    void revision;
    const today = dayKey(new Date().toISOString());
    const workouts = JSON.parse(
      localStorage.getItem(`mission-pulse:exercise:${person.id}:squat`) ?? '[]',
    ) as { date: string }[];
    const cardio = JSON.parse(
      localStorage.getItem(`mission-pulse:exercise:${person.id}:t2-intervals`) ?? '[]',
    ) as { date: string }[];
    const checks = JSON.parse(
      localStorage.getItem(`mission-pulse:wellness-checkins:${person.id}`) ?? '[]',
    ) as { date: string; activities?: string[] }[];
    const journal = JSON.parse(
      localStorage.getItem(`mission-pulse:journal-entries:${person.id}`) ?? '[]',
    ) as { date: string }[];
    const todayCheck = checks.find((item) => dayKey(item.date) === today);
    return [
      ['Workout', workouts.some((item) => dayKey(item.date) === today)],
      ['Cardio', cardio.some((item) => dayKey(item.date) === today)],
      ['Daily check-in', Boolean(todayCheck)],
      ['Resilience', Boolean(todayCheck?.activities?.length)],
      ['Journal', journal.some((item) => dayKey(item.date) === today)],
    ] as const;
  }, [person.id, revision]);
  return (
    <section className="personal-workspace">
      <div className="personal-top">
        <div>
          <p className="eyebrow">PERSONAL CREW WORKSPACE</p>
          <h2>{person.name}</h2>
        </div>
        <button className="secondary" onClick={onLogout}>
          Sign out
        </button>
      </div>
      <div className="reminder-strip">
        {reminders.map(([label, done]) => (
          <button
            key={label}
            className={done ? 'reminder done' : 'reminder'}
            onClick={() => setRevision((value) => value + 1)}
          >
            <i />
            {label}
            <small>{done ? 'Done today' : 'Due today'}</small>
          </button>
        ))}
      </div>
      <CrewDetail person={person} solar={solar} onBack={() => undefined} embedded />
    </section>
  );
}
