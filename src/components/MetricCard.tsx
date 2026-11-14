import { useMemo, useState } from 'react';
import { Cable, Plus, X } from 'lucide-react';
import { ManualEntryModal, type ManualEntry } from './ManualEntryModal';
import { type ChartPoint } from './MetricTrendChart';
import { TrendPanel } from './TrendPanel';

export type MetricDefinition = {
  id: string;
  region: 'brain' | 'heart' | 'lungs' | 'bones' | 'metabolism' | 'whole';
  group: string;
  name: string;
  value: number;
  unit: string;
  status: 'nominal' | 'monitor' | 'attention';
  detail: string;
  trend: ChartPoint[];
};

export function MetricCard({
  astronautId,
  metric,
  expanded = false,
  onFocus,
  onClose,
}: {
  astronautId: string;
  metric: MetricDefinition;
  expanded?: boolean;
  onFocus?: () => void;
  onClose?: () => void;
}) {
  const key = `mission-pulse:metric:${astronautId}:${metric.id}`;
  const [revision, setRevision] = useState(0);
  const [manual, setManual] = useState(false);
  const [notice, setNotice] = useState('');
  const entries = useMemo(() => {
    void revision;
    return JSON.parse(localStorage.getItem(key) ?? '[]') as ManualEntry[];
  }, [key, revision]);
  const points = [
    ...metric.trend,
    ...entries.map((entry) => ({
      day: new Date(entry.date).toLocaleDateString(),
      value: Number(entry.value),
      source: 'manual',
    })),
  ].filter((point) => Number.isFinite(point.value));
  const latest = entries.at(-1);
  const reading = latest ? Number(latest.value) : metric.value;

  const save = (entry: ManualEntry) => {
    localStorage.setItem(
      key,
      JSON.stringify([...entries, entry].sort((a, b) => a.date.localeCompare(b.date))),
    );
    setRevision((value) => value + 1);
    setManual(false);
  };

  return (
    <article className={`metric-card ${expanded ? 'metric-card-expanded' : ''}`}>
      <button className="metric-card-summary" onClick={onFocus} aria-label={`Open ${metric.name}`}>
        <span className={`status-dot ${metric.status}`} aria-hidden="true" />
        <span className="metric-card-group">{metric.group}</span>
        <strong>{metric.name}</strong>
        <b>
          {reading} <small>{metric.unit}</small>
        </b>
        <em className={metric.status}>{metric.status}</em>
      </button>
      {expanded && (
        <div className="metric-focus-content">
          <div className="metric-focus-title">
            <div>
              <p className="eyebrow">{metric.group}</p>
              <h3>{metric.name}</h3>
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close metric detail">
              <X size={16} />
            </button>
          </div>
          <p className="metric-trend">{metric.detail}</p>
          <TrendPanel title={`${metric.name} history`} points={points} unit={metric.unit} />
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
          {notice && (
            <p className="device-notice" role="status">
              {notice}
            </p>
          )}
          <p className="entry-note">
            {entries.length} manual record{entries.length === 1 ? '' : 's'} · metric values are
            stored locally for this prototype.
          </p>
        </div>
      )}
      {manual && (
        <ManualEntryModal
          metric={metric.name}
          unit={metric.unit}
          onSave={save}
          onClose={() => setManual(false)}
        />
      )}
    </article>
  );
}
