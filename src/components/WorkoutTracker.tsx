import { useState } from 'react';
import { ExerciseCard, type Exercise } from './ExerciseCard';
import { personalizedSeries } from '../data/demoHistory';

const exercises: Exercise[] = [
  {
    id: 'squat',
    device: 'ARED',
    name: 'Squat',
    category: 'Resistance',
    metricLabel: 'Resistance',
    unit: 'lb equivalent',
    target: 'Mission prescription: 4 × 8',
    note: 'Lower-body strength and loading countermeasure.',
    defaultSets: 4,
    defaultReps: 8,
    defaultMinutes: 12,
    trainingTrend: [132, 136, 138, 140, 142, 140],
  },
  {
    id: 'deadlift',
    device: 'ARED',
    name: 'Deadlift',
    category: 'Resistance',
    metricLabel: 'Resistance',
    unit: 'lb equivalent',
    target: 'Mission prescription: 3 × 10',
    note: 'Posterior-chain strength and functional lifting countermeasure.',
    defaultSets: 3,
    defaultReps: 10,
    defaultMinutes: 12,
    trainingTrend: [112, 116, 118, 120, 122, 120],
  },
  {
    id: 'heel-raise',
    device: 'ARED',
    name: 'Heel Raise',
    category: 'Resistance',
    metricLabel: 'Resistance',
    unit: 'lb equivalent',
    target: 'Mission prescription: 4 × 12',
    note: 'Calf loading for lower-leg strength and bone health.',
    defaultSets: 4,
    defaultReps: 12,
    defaultMinutes: 8,
    trainingTrend: [182, 188, 190, 195, 198, 200],
  },
  {
    id: 'bench-press',
    device: 'ARED',
    name: 'Bench Press',
    category: 'Resistance',
    metricLabel: 'Resistance',
    unit: 'lb equivalent',
    target: 'Mission prescription: 3 × 10',
    note: 'Upper-body pushing strength countermeasure.',
    defaultSets: 3,
    defaultReps: 10,
    defaultMinutes: 10,
    trainingTrend: [108, 112, 115, 118, 120, 122],
  },
  {
    id: 'rowing',
    device: 'ARED',
    name: 'Rowing',
    category: 'Resistance',
    metricLabel: 'Resistance',
    unit: 'lb equivalent',
    target: 'Mission prescription: 3 × 10',
    note: 'Upper-back pulling strength and posture support.',
    defaultSets: 3,
    defaultReps: 10,
    defaultMinutes: 10,
    trainingTrend: [98, 102, 105, 106, 110, 112],
  },
  {
    id: 't2-intervals',
    device: 'T2 TREADMILL',
    name: 'Interval Run',
    category: 'Cardio',
    metricLabel: 'Average speed',
    unit: 'mph',
    target: 'Mission prescription: 27 min intervals',
    note: 'Harness-supported aerobic and neuromuscular training.',
    defaultMinutes: 27,
    trainingTrend: [5.8, 6.0, 6.1, 6.2, 6.1, 6.3],
  },
  {
    id: 'cevis-intervals',
    device: 'CEVIS',
    name: 'Cycle Intervals',
    category: 'Cardio',
    metricLabel: 'Average power',
    unit: 'W',
    target: 'Mission prescription: 26 min, prescribed watts',
    note: 'Cycle-ergometer aerobic capacity countermeasure.',
    defaultMinutes: 26,
    trainingTrend: [124, 128, 132, 130, 136, 137],
  },
];

export function WorkoutTracker({ astronautId }: { astronautId: string }) {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const crewExercises = exercises.map((exercise) => ({
    ...exercise,
    trainingTrend: personalizedSeries(
      exercise.trainingTrend,
      astronautId,
      exercise.category === 'Resistance' ? 2.5 : 0.1,
    ),
  }));
  const focused = crewExercises.find((exercise) => exercise.id === focusedId);
  return (
    <section className="panel workout-tracker">
      <div className="panel-head">
        <div>
          <p className="eyebrow">ZERO-GRAVITY FITNESS PLAN</p>
          <h3>Training & performance</h3>
        </div>
      </div>
      <p className="metric-trend">
        Exercise templates reflect NASA’s ISS countermeasure categories. Session targets are
        simulated mission prescriptions and should be individualized by flight medicine.
      </p>
      {focused && (
        <div className="exercise-focus">
          <ExerciseCard
            astronautId={astronautId}
            exercise={focused}
            expanded
            onClose={() => setFocusedId(null)}
          />
        </div>
      )}
      <div className="exercise-grid">
        {crewExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            astronautId={astronautId}
            exercise={exercise}
            onFocus={() => setFocusedId(exercise.id)}
          />
        ))}
      </div>
    </section>
  );
}
