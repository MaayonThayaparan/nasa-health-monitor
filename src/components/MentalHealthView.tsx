import { useMemo, useState } from 'react';
import { MultiTrendChart, type TrendSeries } from './MultiTrendChart';

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
type CheckIn = { date: string; activities?: string[] } & Record<WellnessMetric, number>;
type JournalEntry = { id: string; date: string; text: string };
const colors = ['#6ea8ff', '#ffb86c', '#48d6b8', '#a980ff', '#ff7b89'];
const seed: Record<WellnessMetric, number[]> = {
  Mood: [3, 4, 3, 4, 4],
  Stress: [3, 3, 2, 3, 2],
  Energy: [3, 3, 4, 3, 4],
  'Sleep quality': [3, 3, 4, 3, 4],
  Connection: [2, 3, 3, 4, 4],
};
const resilienceSeed = [1, 3, 2, 5, 4];
const dayKey = (date: string) => new Date(date).toLocaleDateString('en-CA');

export function MentalHealthView({ astronautId }: { astronautId: string }) {
  const checkInKey = `mission-pulse:wellness-checkins:${astronautId}`;
  const journalKey = `mission-pulse:journal-entries:${astronautId}`;
  const [tab, setTab] = useState<'check-in' | 'trends' | 'journal'>('check-in');
  const [revision, setRevision] = useState(0);
  const [journalRevision, setJournalRevision] = useState(0);
  const [scores, setScores] = useState<Record<WellnessMetric, number>>({
    Mood: 3,
    Stress: 3,
    Energy: 3,
    'Sleep quality': 3,
    Connection: 3,
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [journalText, setJournalText] = useState('');
  const checkIns = useMemo(() => {
    void revision;
    return JSON.parse(localStorage.getItem(checkInKey) ?? '[]') as CheckIn[];
  }, [checkInKey, revision]);
  const entries = useMemo(() => {
    void journalRevision;
    return JSON.parse(localStorage.getItem(journalKey) ?? '[]') as JournalEntry[];
  }, [journalKey, journalRevision]);
  const today = dayKey(new Date().toISOString());
  const completedToday = checkIns.some((item) => dayKey(item.date) === today);
  const series: TrendSeries[] = [
    ...wellnessMetrics.map((metric, index) => ({
      id: metric,
      label: metric,
      color: colors[index],
      points: [
        ...seed[metric].map((value, point) => ({
          day: `D-${seed[metric].length - point - 1}`,
          value,
          source: 'simulated',
        })),
        ...checkIns.map((checkIn) => ({
          day: new Date(checkIn.date).toLocaleDateString(),
          value: checkIn[metric],
          source: 'manual',
        })),
      ],
    })),
    {
      id: 'resilience',
      label: 'Resilience activities completed',
      color: '#b8d26e',
      points: [
        ...resilienceSeed.map((value, point) => ({
          day: `D-${resilienceSeed.length - point - 1}`,
          value,
          source: 'simulated',
        })),
        ...checkIns.map((checkIn) => ({
          day: new Date(checkIn.date).toLocaleDateString(),
          value: checkIn.activities?.length ?? 0,
          source: 'manual',
        })),
      ],
      axis: 'right',
      suffix: ' activities',
    },
  ];
  const toggleActivity = (activity: string) =>
    setActivities((items) =>
      items.includes(activity) ? items.filter((item) => item !== activity) : [...items, activity],
    );
  const saveCheckIn = () => {
    const now = new Date().toISOString();
    localStorage.setItem(
      checkInKey,
      JSON.stringify([
        ...checkIns.filter((item) => dayKey(item.date) !== today),
        { ...scores, activities, date: now },
      ]),
    );
    setRevision((value) => value + 1);
    window.dispatchEvent(new Event('mission-pulse:update'));
  };
  const saveJournal = () => {
    const text = journalText.trim();
    if (!text) return;
    localStorage.setItem(
      journalKey,
      JSON.stringify([
        { id: crypto.randomUUID(), date: new Date().toISOString(), text },
        ...entries,
      ]),
    );
    setJournalText('');
    setJournalRevision((value) => value + 1);
    window.dispatchEvent(new Event('mission-pulse:update'));
  };
  return (
    <div className="health-view">
      <div className="physical-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'check-in'}
          className={tab === 'check-in' ? 'active' : ''}
          onClick={() => setTab('check-in')}
        >
          Daily check-in
        </button>
        <button
          role="tab"
          aria-selected={tab === 'trends'}
          className={tab === 'trends' ? 'active' : ''}
          onClick={() => setTab('trends')}
        >
          Trends
        </button>
        <button
          role="tab"
          aria-selected={tab === 'journal'}
          className={tab === 'journal' ? 'active' : ''}
          onClick={() => setTab('journal')}
        >
          Journal
        </button>
      </div>
      {tab === 'check-in' && (
        <section className="panel questionnaire daily-checkin">
          <p className="eyebrow">DAILY WELLNESS CHECK-IN</p>
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
          <h4 className="checkin-subhead">Today’s resilience activities</h4>
          <div className="checkin-activities">
            {habits.map((activity) => (
              <label className="habit" key={activity}>
                <input
                  type="checkbox"
                  checked={activities.includes(activity)}
                  onChange={() => toggleActivity(activity)}
                />
                {activity}
              </label>
            ))}
          </div>
          <button className="primary" onClick={saveCheckIn}>
            {completedToday ? 'Update today’s check-in' : 'Save today’s check-in'}
          </button>
          <p className="entry-note">
            One check-in is saved per day. Activity completion is included with today’s wellness
            record.
          </p>
        </section>
      )}
      {tab === 'trends' && (
        <section className="panel mental-trends">
          <p className="eyebrow">WELLNESS & RESILIENCE TRENDS</p>
          <h3>Daily check-in relationships</h3>
          <p className="metric-trend">
            Left axis: wellness scores from 1–5. Right axis: number of resilience activities
            completed that day, from 0–6.
          </p>
          <MultiTrendChart
            series={series}
            suffix=" / 5"
            leftAxisLabel="Wellness score (1–5)"
            rightAxis={{ label: 'Activities completed (0–6)', max: habits.length }}
          />
        </section>
      )}
      {tab === 'journal' && (
        <section className="panel journal journal-log">
          <p className="eyebrow">JOURNAL</p>
          <h3>Capture a reflection any time</h3>
          <textarea
            value={journalText}
            onChange={(event) => setJournalText(event.target.value)}
            placeholder="Write an entry…"
          />
          <button className="primary" onClick={saveJournal}>
            Save journal entry
          </button>
          <div className="journal-history">
            {entries.length ? (
              entries.map((entry) => (
                <article key={entry.id}>
                  <time>{new Date(entry.date).toLocaleString()}</time>
                  <p>{entry.text}</p>
                </article>
              ))
            ) : (
              <p className="entry-note">
                No journal entries yet. You can add more than one entry each day.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
