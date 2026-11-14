import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { CareProtocol } from './CareProtocol';
import { MissionReadiness } from './MissionReadiness';

export function ProtocolView({ solar }: { solar: boolean }) {
  return (
    <section className={`protocol-view ${solar ? 'protocol-critical' : ''}`}>
      <div className="panel protocol-status">
        <div>
          <p className="eyebrow">AUTONOMOUS CARE RESPONSE</p>
          <h3>{solar ? 'Active event-driven protocol' : 'Nominal operations'}</h3>
          <p className="metric-trend">
            {solar
              ? 'Solar radiation event detected. Prioritize the active protocol below.'
              : 'No active protocols. Monitoring continues in the background.'}
          </p>
        </div>
        {solar ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
      </div>
      <div className="autonomy-grid">
        <CareProtocol solar={solar} />
        <MissionReadiness solar={solar} />
      </div>
    </section>
  );
}
