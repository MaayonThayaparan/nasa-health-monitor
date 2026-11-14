import { useMemo, useState } from 'react';
import { Dumbbell, Plus } from 'lucide-react';
import { type ChartPoint } from './MetricTrendChart';
import { TrendPanel } from './TrendPanel';

export type Exercise = {
  id: string;
  device: string;
  name: string;
  category: 'Resistance' | 'Cardio';
  metricLabel: string;
  unit: string;
  target: string;
  note: string;
  defaultSets?: number;
  defaultReps?: number;
  defaultMinutes: number;
  trainingTrend: number[];
};
type Session = { date: string; value: number; sets?: number; reps?: number; minutes: number };
const localDateTime = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16);

export function ExerciseCard({
  astronautId,
  exercise,
  expanded = false,
  onFocus,
  onClose,
}: {
  astronautId: string;
  exercise: Exercise;
  expanded?: boolean;
  onFocus?: () => void;
  onClose?: () => void;
}) {
  const key = `mission-pulse:exercise:${astronautId}:${exercise.id}`;
  const [revision, setRevision] = useState(0);
  const [open, setOpen] = useState(false);
  const sessions = useMemo(() => {
    void revision;
    return JSON.parse(localStorage.getItem(key) ?? '[]') as Session[];
  }, [key, revision]);
  const trend: ChartPoint[] = [
    ...exercise.trainingTrend.map((value, index) => ({
      day: `D-${exercise.trainingTrend.length - index - 1}`,
      value,
      source: 'simulated',
    })),
    ...sessions.map((session) => ({
      day: new Date(session.date).toLocaleDateString(),
      value: session.value,
      source: 'manual',
    })),
  ];
  const latest = sessions.at(-1)?.value ?? exercise.trainingTrend.at(-1);
  return (
    <article className={`exercise-card ${expanded ? 'exercise-card-expanded' : ''}`}>
      <button
        className="exercise-card-head exercise-card-summary"
        onClick={onFocus}
        aria-label={`Open ${exercise.name}`}
      >
        <div>
          <p className="eyebrow">{exercise.device}</p>
          <h4>{exercise.name}</h4>
        </div>
        <span className={`exercise-category ${exercise.category.toLowerCase()}`}>
          {exercise.category}
        </span>
      </button>
      <p className="exercise-target">{exercise.target}</p>
      <p className="exercise-note">{exercise.note}</p>
      <div className="exercise-reading">
        <span>Latest {exercise.metricLabel.toLowerCase()}</span>
        <strong>
          {latest} {exercise.unit}
        </strong>
      </div>
      {expanded ? (
        <TrendPanel
          title={`${exercise.name} training history`}
          points={trend}
          unit={exercise.unit}
        />
      ) : (
        <p className="entry-note">Select to expand workout history and trend.</p>
      )}
      {expanded && (
        <button className="text-btn exercise-close" onClick={onClose}>
          Collapse workout
        </button>
      )}
      {expanded && (
        <button className="secondary exercise-log-button" onClick={() => setOpen(true)}>
          <Plus size={14} /> Log {exercise.name} session
        </button>
      )}
      {open && (
        <ExerciseSessionForm
          exercise={exercise}
          onClose={() => setOpen(false)}
          onSave={(session) => {
            localStorage.setItem(key, JSON.stringify([...sessions, session]));
            setRevision((value) => value + 1);
            setOpen(false);
          }}
        />
      )}
    </article>
  );
}

function ExerciseSessionForm({
  exercise,
  onSave,
  onClose,
}: {
  exercise: Exercise;
  onSave: (_session: Session) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState('');
  const [sets, setSets] = useState(String(exercise.defaultSets ?? ''));
  const [reps, setReps] = useState(String(exercise.defaultReps ?? ''));
  const [minutes, setMinutes] = useState(String(exercise.defaultMinutes));
  const [date, setDate] = useState(localDateTime);
  const future = new Date(date) > new Date();
  const isResistance = exercise.category === 'Resistance';
  return (
    <div className="modal-backdrop">
      <form
        className="modal"
        onSubmit={(event) => {
          event.preventDefault();
          if (!future && value)
            onSave({
              date,
              value: Number(value),
              sets: isResistance ? Number(sets) : undefined,
              reps: isResistance ? Number(reps) : undefined,
              minutes: Number(minutes),
            });
        }}
      >
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <p className="eyebrow">{exercise.device} SESSION</p>
        <h3>Log {exercise.name}</h3>
        <label>
          {exercise.metricLabel} ({exercise.unit})
          <input
            required
            type="number"
            min="0"
            step="0.1"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        {isResistance && (
          <div className="form-grid">
            <label>
              Sets
              <input
                type="number"
                min="1"
                value={sets}
                onChange={(event) => setSets(event.target.value)}
              />
            </label>
            <label>
              Reps
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(event) => setReps(event.target.value)}
              />
            </label>
          </div>
        )}
        <label>
          Duration (minutes)
          <input
            type="number"
            min="1"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
          />
        </label>
        <label>
          Date & time
          <input
            required
            type="datetime-local"
            value={date}
            max={localDateTime()}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        {future && <p className="form-error">Sessions cannot be dated in the future.</p>}
        <button className="primary" type="submit">
          <Dumbbell size={15} /> Save session
        </button>
      </form>
    </div>
  );
}
