import { useState } from 'react';
import { MentalHealthView } from './MentalHealthView';
import { PhysicalHealthView } from './PhysicalHealthView';
export function HealthProfileTabs({ astronautId }: { astronautId: string }) {
  const [tab, setTab] = useState<'physical' | 'mental'>('physical');
  return (
    <>
      <div className="health-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'physical'}
          className={tab === 'physical' ? 'active' : ''}
          onClick={() => setTab('physical')}
        >
          Physical
        </button>
        <button
          role="tab"
          aria-selected={tab === 'mental'}
          className={tab === 'mental' ? 'active' : ''}
          onClick={() => setTab('mental')}
        >
          Mental
        </button>
      </div>
      {tab === 'physical' ? (
        <PhysicalHealthView astronautId={astronautId} />
      ) : (
        <MentalHealthView astronautId={astronautId} />
      )}
    </>
  );
}
