import { useState } from 'react';
import { CheckCircle2, ChevronRight, Radio, ShieldAlert } from 'lucide-react';
const steps = [
  'Verify radiation dosimeter and repeat heart-rate reading',
  'Move to the shielded module and begin hydration protocol',
  'Reassess vitals after 30 minutes',
];
export function CareProtocol({ solar }: { solar: boolean }) {
  const [done, setDone] = useState<number[]>([]);
  const [escalate, setEscalate] = useState(false);
  if (!solar)
    return (
      <section className="panel protocol">
        <p className="eyebrow">AUTONOMOUS CARE PROTOCOL</p>
        <h3>Nominal operations</h3>
        <p className="metric-trend">No active protocol. Continue scheduled health checks.</p>
      </section>
    );
  return (
    <section className="panel protocol">
      <div className="panel-head">
        <div>
          <p className="eyebrow">AUTONOMOUS CARE PROTOCOL</p>
          <h3>Solar-event response</h3>
        </div>
        <ShieldAlert color="#ffb86c" />
      </div>
      <div className="risk-chain">
        <b>Risk chain</b>
        <span>Solar event</span>
        <ChevronRight />
        <span>Radiation exposure</span>
        <ChevronRight />
        <span>Fatigue / cardiovascular strain</span>
        <ChevronRight />
        <span>Reduced EVA readiness</span>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <button
              className={done.includes(index) ? 'step done' : 'step'}
              onClick={() =>
                setDone((current) =>
                  current.includes(index)
                    ? current.filter((item) => item !== index)
                    : [...current, index],
                )
              }
            >
              {done.includes(index) ? <CheckCircle2 /> : <span>{index + 1}</span>}
              {step}
            </button>
          </li>
        ))}
      </ol>
      <div className="protocol-footer">
        <button className="secondary">
          <Radio size={14} /> Start reassessment timer
        </button>
        <button className="text-btn" onClick={() => setEscalate(true)}>
          Prepare delayed ground message
        </button>
      </div>
      {escalate && (
        <p className="entry-note">
          Draft queued: radiation event, repeat-vitals result, completed countermeasures, and
          current EVA readiness.
        </p>
      )}
    </section>
  );
}
