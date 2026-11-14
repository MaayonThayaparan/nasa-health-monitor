import { useState } from 'react';
const habits = [
  'Mindful breathing',
  'Journal reflection',
  'Peer conversation',
  'Message home',
  'Window observation',
  'Exercise or stretch',
];
export function MentalHealthView({ astronautId }: { astronautId: string }) {
  const [saved, setSaved] = useState(false);
  const [journal, setJournal] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (habit: string) =>
    setChecked((items) =>
      items.includes(habit) ? items.filter((item) => item !== habit) : [...items, habit],
    );
  return (
    <div className="mental-grid">
      <section className="panel questionnaire">
        <p className="eyebrow">PRIVATE WELLNESS CHECK-IN</p>
        <h3>How are you feeling today?</h3>
        {['Mood', 'Stress', 'Energy', 'Sleep quality', 'Connection'].map((item) => (
          <label className="scale" key={item}>
            {item}
            <input type="range" min="1" max="5" defaultValue="3" />
            <span>1 — 5</span>
          </label>
        ))}
        <button className="primary" onClick={() => setSaved(true)}>
          Save private check-in
        </button>
        {saved && <p className="entry-note">Private check-in saved for this astronaut.</p>}
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
          onClick={() => {
            localStorage.setItem(`mission-pulse:journal:${astronautId}`, journal);
            setSaved(true);
          }}
        >
          Save private entry
        </button>
      </section>
    </div>
  );
}
