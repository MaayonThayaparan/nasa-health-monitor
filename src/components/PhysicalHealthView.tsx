import { useMemo, useState, type ReactNode } from 'react';
import { Activity, Cable, Droplets, Plus, ShieldCheck } from 'lucide-react';
import { BodyMap, type BodyRegion } from './BodyMap';
import { ManualEntryModal, type ManualEntry } from './ManualEntryModal';
const details: Record<
  BodyRegion,
  { title: string; value: string; trend: string; advice: string[] }
> = {
  brain: {
    title: 'Brain / eyes',
    value: 'Vision check · nominal',
    trend: 'Cognitive check due in 2 days',
    advice: ['Complete visual and cognition check', 'Record headache or balance symptoms'],
  },
  heart: {
    title: 'Heart / circulation',
    value: '68 bpm · 118 / 76',
    trend: 'VO₂ max: 42 ml/kg/min',
    advice: ['Complete scheduled aerobic session', 'Log recovery and perceived exertion'],
  },
  lungs: {
    title: 'Lungs / respiration',
    value: '98% SpO₂ · 14 breaths/min',
    trend: 'Stable 7-day trend',
    advice: ['Complete respiratory symptom check', 'Try a paced-breathing recovery session'],
  },
  bones: {
    title: 'Bones / muscles',
    value: 'Bone density: 98% baseline',
    trend: 'Strength session due today',
    advice: [
      'Complete resistance workout',
      'Log mobility or pain observations',
      'Confirm nutrition protocol',
    ],
  },
  metabolism: {
    title: 'Metabolism',
    value: 'Glucose: 92 mg/dL',
    trend: 'Hydration target: 2.1 L',
    advice: ['Log hydration', 'Complete nutrition check'],
  },
  whole: {
    title: 'Whole body',
    value: 'Radiation: 0.21 mSv',
    trend: 'Sleep: 7.4 h',
    advice: ['Verify dosimeter', 'Protect scheduled sleep opportunity'],
  },
};
export function PhysicalHealthView({ astronautId }: { astronautId: string }) {
  const [region, setRegion] = useState<BodyRegion>('heart');
  const [manual, setManual] = useState(false);
  const [notice, setNotice] = useState('');
  const [entryRevision, setEntryRevision] = useState(0);
  const detail = details[region];
  const key = `mission-pulse:manual:${astronautId}:${region}`;
  const saved = useMemo(() => {
    void entryRevision;
    return JSON.parse(localStorage.getItem(key) ?? '[]') as ManualEntry[];
  }, [entryRevision, key]);
  const save = (entry: ManualEntry) => {
    const next = [...saved, entry].sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(key, JSON.stringify(next));
    setEntryRevision((revision) => revision + 1);
    setManual(false);
    setNotice('Manual entry saved and added to this metric’s trend.');
  };
  return (
    <div className="health-view">
      <div className="physical-layout">
        <section className="panel body-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">PHYSICAL SYSTEMS</p>
              <h3>Body map</h3>
            </div>
            <Activity size={18} />
          </div>
          <BodyMap selected={region} onSelect={setRegion} />
        </section>
        <section className="panel metric-detail">
          <p className="eyebrow">SELECTED REGION</p>
          <h3>{detail.title}</h3>
          <strong className="metric-reading">{detail.value}</strong>
          <p className="metric-trend">{detail.trend}</p>
          <div className="metric-actions">
            <button
              className="secondary"
              onClick={() =>
                setNotice(
                  'Device API is not implemented in this prototype. Use manual entry for now.',
                )
              }
            >
              <Cable size={15} /> Connect device
            </button>
            <button className="primary" onClick={() => setManual(true)}>
              <Plus size={15} /> Add manual entry
            </button>
          </div>
          <h4>Maintain & improve</h4>
          <ul className="advice-list">
            {detail.advice.map((advice) => (
              <li key={advice}>
                <input type="checkbox" /> {advice}
              </li>
            ))}
          </ul>
          {saved.length > 0 && (
            <div className="manual-history">
              <p className="entry-note">
                Manual trend · {saved.length} record{saved.length === 1 ? '' : 's'}
              </p>
              {saved.map((entry) => (
                <span key={`${entry.date}-${entry.value}`}>
                  {new Date(entry.date).toLocaleDateString()} · <b>{entry.value}</b>
                </span>
              ))}
            </div>
          )}
        </section>
      </div>
      <section className="panel samples">
        <div>
          <p className="eyebrow">SAMPLES & BLOODWORK</p>
          <h3>Mission collection schedule</h3>
        </div>
        <Sample icon={<Droplets size={18} />} name="Blood biomarker panel" due="Due Sol 186" />
        <Sample icon={<ShieldCheck size={18} />} name="Saliva immune sample" due="Complete" />
        <Sample icon={<Activity size={18} />} name="Urine nutrition sample" due="Due Sol 188" />
      </section>
      {notice && (
        <div className="inline-notice" role="status">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
      {manual && (
        <ManualEntryModal metric={detail.title} onSave={save} onClose={() => setManual(false)} />
      )}
    </div>
  );
}
function Sample({ icon, name, due }: { icon: ReactNode; name: string; due: string }) {
  return (
    <div className="sample">
      <span>{icon}</span>
      <b>{name}</b>
      <small>{due}</small>
      <button className="text-btn">Log collection</button>
    </div>
  );
}
