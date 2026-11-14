import { useMemo, useState } from 'react';
import { TrendPanel } from './TrendPanel';

const habits = [
  'Mindful breathing',
  'Journal reflection',
  'Peer conversation',
  'Message home',
  'Window observation',
  'Exercise or stretch',
];
const wellnessMetrics = ['Mood', 'Stress', 'Energy', 'Sleep quality', 'Connection'] as const;
type WellnessMetric = (typeof wellnessMetrics)[number];
type CheckIn = { date: string } & Record<WellnessMetric, number>;
const seed: Record<WellnessMetric, number[]> = {
  Mood: [3, 4, 3, 4, 4],
  Stress: [3, 3, 2, 3, 2],
  Energy: [3, 3, 4, 3, 4],
  'Sleep quality': [3, 3, 4, 3, 4],
  Connection: [2, 3, 3, 4, 4],
};

export function MentalHealthView({ astronautId }: { astronautId: string }) {
  const key = `mission-pulse:wellness-checkins:${astronautId}`;
  const [revision, setRevision] = useState(0);
  const [scores, setScores] = useState<Record<WellnessMetric, number>>({
    Mood: 3,
    Stress: 3,
    Energy: 3,
    'Sleep quality': 3,
    Connection: 3,
  });
  const [active, setActive] = useState<WellnessMetric>('Mood');
  const [journal, setJournal] = useState(
    () => localStorage.getItem(`mission-pulse:journal:${astronautId}`) ?? '',
  );
  const [checked, setChecked] = useState<string[]>(
    () =>
      JSON.parse(localStorage.getItem(`mission-pulse:habits:${astronautId}`) ?? '[]') as string[],
  );
  const checkIns = useMemo(() => {
    void revision;
    return JSON.parse(localStorage.getItem(key) ?? '[]') as CheckIn[];
  }, [key, revision]);
  const toggle = (habit: string) =>
    setChecked((items) => {
      const next = items.includes(habit)
        ? items.filter((item) => item !== habit)
        : [...items, habit];
      localStorage.setItem(`mission-pulse:habits:${astronautId}`, JSON.stringify(next));
      return next;
    });
  const points = [
    ...seed[active].map((value, index) => ({
      day: `D-${seed[active].length - index - 1}`,
      value,
      source: 'simulated',
    })),
    ...checkIns.map((checkIn) => ({
      day: new Date(checkIn.date).toLocaleDateString(),
      value: checkIn[active],
      source: 'manual',
    })),
  ];
  return (
    <div className="mental-grid">
      <section className="panel questionnaire">
        <p className="eyebrow">PRIVATE WELLNESS CHECK-IN</p>
        <h3>How are you feeling today?</h3>
        {wellnessMetrics.map((item) => (
          <label className="scale" key={item}>
            {item}
            <input
              type="range"
              min="1"
              max="5"
              value={scores[item]}
              onChange={(event) =>
                setScores((current) => ({ ...current, [item]: Number(event.target.value) }))
              }
            />
            <span>{scores[item]} / 5</span>
          </label>
        ))}
        <button
          className="primary"
          onClick={() => {
            localStorage.setItem(
              key,
              JSON.stringify([...checkIns, { ...scores, date: new Date().toISOString() }]),
            );
            setRevision((value) => value + 1);
          }}
        >
          Save private check-in
        </button>
        <p className="entry-note">Private wellness scores are stored locally in this prototype.</p>
      </section>
      <section className="panel wellness-trends">
        <p className="eyebrow">WELLNESS TRENDS</p>
        <h3>Private check-in history</h3>
        <div className="wellness-metric-buttons">
          {wellnessMetrics.map((metric) => (
            <button
              key={metric}
              className={active === metric ? 'active' : ''}
              onClick={() => setActive(metric)}
            >
              {metric}
              <b>{scores[metric]} / 5</b>
            </button>
          ))}
        </div>
        <TrendPanel
          title={`${active} over time`}
          description="1 is low and 5 is high; use patterns to start a private check-in or request support."
          points={points}
          unit="/ 5"
        />
      </section>
      <section className="panel routine">
        <p className="eyebrow">TODAY’S RESILIENCE ROUTINE</p>
        <h3>Small actions, meaningful recovery</h3>
        {habits.map((habit) => (
          <label className="habit" key={habit}>
            <input
              type="checkbox"
              checked={checked.includes(habit)}
              onChange={() => toggle(habit)}
            />
            {habit}
          </label>
        ))}
        <p className="metric-trend">
          A short breathing prompt is available as a recovery routine, not medical treatment.
        </p>
      </section>
      <section className="panel journal">
        <p className="eyebrow">PRIVATE JOURNAL</p>
        <h3>What helped you feel connected today?</h3>
        <textarea
          value={journal}
          onChange={(event) => setJournal(event.target.value)}
          placeholder="Visible only in this astronaut’s profile…"
        />
        <button
          className="primary"
          onClick={() => localStorage.setItem(`mission-pulse:journal:${astronautId}`, journal)}
        >
          Save private entry
        </button>
      </section>
    </div>
  );
}
