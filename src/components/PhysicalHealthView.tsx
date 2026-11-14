import { useState } from 'react';
import { MetricLog } from './MetricLog';
import { WorkoutTracker } from './WorkoutTracker';

export function PhysicalHealthView({ astronautId }: { astronautId: string }) {
  const [section, setSection] = useState<'performance' | 'log'>('performance');
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
      </div>
      {section === 'log' ? (
        <MetricLog astronautId={astronautId} />
      ) : (
        <>
          <WorkoutTracker astronautId={astronautId} />
        </>
      )}
    </div>
  );
}
