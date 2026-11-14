import { useMemo, useState } from 'react';
import { Activity } from 'lucide-react';
import { BodyMap, type BodyRegion } from './BodyMap';
import { MetricCard, type MetricDefinition } from './MetricCard';
import { personalizedSeries } from '../data/demoHistory';

const trend = (values: number[]) =>
  values.map((value, index) => ({
    day: `D-${values.length - index - 1}`,
    value,
    source: 'simulated',
  }));

const metrics: MetricDefinition[] = [
  {
    id: 'heart-rate',
    region: 'heart',
    group: 'Cardiovascular',
    name: 'Heart rate',
    value: 68,
    unit: 'bpm',
    status: 'nominal',
    detail: 'Resting heart-rate trend from scheduled cardiovascular checks.',
    trend: trend([64, 66, 65, 68, 69, 67, 68]),
  },
  {
    id: 'blood-pressure',
    region: 'heart',
    group: 'Cardiovascular',
    name: 'Systolic blood pressure',
    value: 118,
    unit: 'mmHg',
    status: 'nominal',
    detail: 'Record systolic pressure; diastolic can be recorded in the note.',
    trend: trend([116, 117, 119, 118, 120, 117, 118]),
  },
  {
    id: 'vo2-max',
    region: 'heart',
    group: 'Performance',
    name: 'VO₂ max',
    value: 42,
    unit: 'mL/kg/min',
    status: 'monitor',
    detail: 'Aerobic capacity measured during a scheduled performance assessment.',
    trend: trend([43, 43, 42, 42, 41, 42, 42]),
  },
  {
    id: 'oxygen-saturation',
    region: 'lungs',
    group: 'Respiratory',
    name: 'Oxygen saturation',
    value: 98,
    unit: '% SpO₂',
    status: 'nominal',
    detail: 'Pulse-oximetry result during the respiratory check.',
    trend: trend([98, 98, 97, 98, 98, 98, 98]),
  },
  {
    id: 'bone-density',
    region: 'bones',
    group: 'Bone / muscle',
    name: 'Bone density',
    value: 98,
    unit: '% baseline',
    status: 'nominal',
    detail: 'Relative measurement against the crew member’s preflight baseline.',
    trend: trend([100, 100, 99, 99, 98, 98, 98]),
  },
  {
    id: 'body-mass',
    region: 'whole',
    group: 'Body composition',
    name: 'Body mass',
    value: 72.4,
    unit: 'kg',
    status: 'nominal',
    detail: 'Body mass trend supports nutrition and training assessment.',
    trend: trend([72.9, 72.7, 72.6, 72.5, 72.4, 72.4, 72.4]),
  },
  {
    id: 'blood-glucose',
    region: 'metabolism',
    group: 'Metabolic',
    name: 'Blood glucose',
    value: 92,
    unit: 'mg/dL',
    status: 'nominal',
    detail: 'Fasting blood-glucose check; record context in the entry note.',
    trend: trend([88, 91, 94, 90, 92, 93, 92]),
  },
  {
    id: 'radiation-dose',
    region: 'whole',
    group: 'Exposure',
    name: 'Radiation dose',
    value: 0.21,
    unit: 'mSv',
    status: 'monitor',
    detail: 'Daily personal dosimeter reading; compare against mission exposure limits.',
    trend: trend([0.16, 0.18, 0.17, 0.19, 0.2, 0.22, 0.21]),
  },
  {
    id: 'sleep',
    region: 'brain',
    group: 'Recovery',
    name: 'Sleep duration',
    value: 7.4,
    unit: 'h',
    status: 'nominal',
    detail: 'Sleep duration from daily sleep log or connected sleep device.',
    trend: trend([7.1, 7.6, 7.2, 7.3, 7.8, 7.4, 7.4]),
  },
  {
    id: 'bloodwork-collection',
    region: 'metabolism',
    group: 'Samples',
    name: 'Blood biomarker collection',
    value: 1,
    unit: 'collection',
    status: 'monitor',
    detail: 'Scheduled blood collection for nutrition, immune, and metabolic biomarkers.',
    trend: trend([1, 1, 1, 1]),
  },
  {
    id: 'saliva-collection',
    region: 'lungs',
    group: 'Samples',
    name: 'Saliva immune sample',
    value: 2,
    unit: 'mL',
    status: 'nominal',
    detail: 'Saliva sample volume recorded for scheduled immune monitoring.',
    trend: trend([1.8, 2, 1.9, 2]),
  },
  {
    id: 'urine-collection',
    region: 'metabolism',
    group: 'Samples',
    name: 'Urine nutrition sample',
    value: 60,
    unit: 'mL',
    status: 'monitor',
    detail: 'Urine specimen volume recorded for nutrition and hydration assessment.',
    trend: trend([55, 58, 62, 60]),
  },
];

export function MetricLog({ astronautId }: { astronautId: string }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<BodyRegion>('heart');
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const crewMetrics = useMemo(
    () =>
      metrics.map((metric) => {
        const variation =
          metric.id === 'radiation-dose'
            ? 0.02
            : metric.id === 'blood-pressure'
              ? 1.4
              : metric.id === 'body-mass'
                ? 0.4
                : metric.id === 'bone-density'
                  ? 0.15
                  : metric.id === 'saliva-collection'
                    ? 0.08
                    : metric.id === 'urine-collection'
                      ? 2
                      : 0.6;
        const values = personalizedSeries(
          metric.trend.map((point) => point.value),
          astronautId,
          variation,
        );
        return {
          ...metric,
          value: values.at(-1) ?? metric.value,
          trend: metric.trend.map((point, index) => ({ ...point, value: values[index] })),
        };
      }),
    [astronautId],
  );
  const visible = useMemo(
    () =>
      crewMetrics.filter((metric) =>
        `${metric.group} ${metric.name}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [crewMetrics, query],
  );
  const focused = crewMetrics.find((metric) => metric.id === focusedId);
  const selectRegion = (next: BodyRegion) => {
    setRegion(next);
    setFocusedId(crewMetrics.find((metric) => metric.region === next)?.id ?? null);
  };
  return (
    <section className="metric-log-view">
      <div className="metric-log-map panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">PHYSICAL SYSTEMS</p>
            <h3>Metric map</h3>
          </div>
          <Activity size={18} />
        </div>
        <p className="metric-trend">Select a body region to focus its linked health metric.</p>
        <BodyMap selected={region} onSelect={selectRegion} />
      </div>
      <section className="panel metric-log">
        <div className="panel-head">
          <div>
            <p className="eyebrow">ALL METRICS</p>
            <h3>Metric log</h3>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search metrics"
            aria-label="Search metrics"
          />
        </div>
        <p className="metric-trend">
          Select a card to expand its trend and log a device or manual measurement.
        </p>
        {focused && (
          <div className="metric-focus">
            <MetricCard
              astronautId={astronautId}
              metric={focused}
              expanded
              onClose={() => setFocusedId(null)}
            />
          </div>
        )}
        <div className="metric-card-grid">
          {visible.map((metric) => (
            <MetricCard
              key={metric.id}
              astronautId={astronautId}
              metric={metric}
              onFocus={() => setFocusedId(metric.id)}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
