import { ChevronRight } from 'lucide-react';
export function GuidedResponse({ isAtRisk }: { isAtRisk: boolean }) {
  return (
    <div className="panel action-panel">
      <p className="eyebrow">GUIDED RESPONSE</p>
      <h3>{isAtRisk ? 'Solar event response' : 'Routine self-assessment'}</h3>
      <p>
        {isAtRisk
          ? 'Move to the shielded module, confirm dosimeter reading, hydrate, and repeat vitals in 30 minutes.'
          : 'Continue scheduled health protocol and record any symptoms.'}
      </p>
      <button className="primary">
        Open response checklist <ChevronRight size={16} />
      </button>
    </div>
  );
}
