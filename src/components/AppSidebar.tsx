import { Activity, Bell, HeartPulse, LogIn, ShieldAlert, Users } from 'lucide-react';
export function AppSidebar({
  view,
  onCommand,
  onPersonal,
}: {
  view: 'command' | 'personal';
  onCommand: () => void;
  onPersonal: () => void;
}) {
  return (
    <aside className="rail" aria-label="Application navigation">
      <div className="mark">
        <span>MP</span>
      </div>
      <div className="rail-line" />
      <button
        className={view === 'command' ? 'rail-active' : ''}
        aria-label="Command centre"
        onClick={onCommand}
      >
        <Activity />
      </button>
      <button
        aria-label="Personal"
        className={view === 'personal' ? 'rail-active' : ''}
        onClick={onPersonal}
      >
        <Users />
      </button>
      <button aria-label="Health" onClick={onPersonal}>
        <HeartPulse />
      </button>
      <button aria-label="Safety" onClick={onCommand}>
        <ShieldAlert />
      </button>
      <div className="rail-bottom">
        <button aria-label="Notifications">
          <Bell />
        </button>
        <button aria-label="Personal login" onClick={onPersonal}>
          <LogIn />
        </button>
      </div>
    </aside>
  );
}
