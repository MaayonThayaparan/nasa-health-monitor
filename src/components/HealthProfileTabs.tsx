import { useState } from 'react';
import { MentalHealthView } from './MentalHealthView';
import { PhysicalHealthView } from './PhysicalHealthView';
import { ProtocolView } from './ProtocolView';
export function HealthProfileTabs({ astronautId, solar }: { astronautId: string; solar: boolean }) {
  const [tab, setTab] = useState<'physical' | 'mental' | 'protocols'>('physical');
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
        <button
          role="tab"
          aria-selected={tab === 'protocols'}
          className={tab === 'protocols' ? 'active' : ''}
          onClick={() => setTab('protocols')}
        >
          Protocols
        </button>
      </div>
      {tab === 'physical' ? (
        <PhysicalHealthView astronautId={astronautId} />
      ) : tab === 'mental' ? (
        <MentalHealthView astronautId={astronautId} />
      ) : (
        <ProtocolView solar={solar} />
      )}
    </>
  );
}
