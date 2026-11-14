import { Radiation } from 'lucide-react';
export function MissionHeader({ solar, onToggle }: { solar: boolean; onToggle: () => void }) {
  return (
    <header>
      <div>
        <p className="eyebrow">ARES TRANSIT · SOL 184</p>
        <h1>Mission Pulse</h1>
      </div>
      <div className="header-right">
        <div className="comm">
          <span className="pulse" />
          EARTH LINK · 12:34 DELAY
        </div>
        <button className={`scenario ${solar ? 'is-solar' : ''}`} onClick={onToggle}>
          <Radiation size={16} />
          {solar ? 'SOLAR EVENT' : 'NOMINAL SCENARIO'}
        </button>
      </div>
    </header>
  );
}
