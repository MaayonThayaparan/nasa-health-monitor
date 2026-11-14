import { useState } from 'react';
import { MetricLog } from './MetricLog';
import { PhysicalTrends } from './PhysicalTrends';
import { WorkoutTracker } from './WorkoutTracker';

export function PhysicalHealthView({ astronautId }: { astronautId: string }) {
  const [section, setSection] = useState<'performance' | 'log' | 'trends'>('performance');
  return (
    <div className="health-view">
      <div className="physical-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={section === 'performance'}
          className={section === 'performance' ? 'active' : ''}
          onClick={() => setSection('performance')}
        >
          Training & performance
        </button>
        <button
          role="tab"
          aria-selected={section === 'log'}
          className={section === 'log' ? 'active' : ''}
          onClick={() => setSection('log')}
        >
          Metric log
        </button>
        <button
          role="tab"
          aria-selected={section === 'trends'}
          className={section === 'trends' ? 'active' : ''}
          onClick={() => setSection('trends')}
        >
          Trends
        </button>
      </div>
      {section === 'trends' ? (
        <PhysicalTrends astronautId={astronautId} />
      ) : section === 'log' ? (
        <MetricLog astronautId={astronautId} />
      ) : (
        <>
          <WorkoutTracker astronautId={astronautId} />
        </>
      )}
    </div>
  );
}
