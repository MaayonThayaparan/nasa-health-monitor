import { Activity, Bell, HeartPulse, ShieldAlert, Users } from 'lucide-react';
export function AppSidebar() {
  return (
    <aside className="rail" aria-label="Application navigation">
      <div className="mark">
        <span>MP</span>
      </div>
      <div className="rail-line" />
      <button className="rail-active" aria-label="Mission overview">
        <Activity />
      </button>
      <button aria-label="Crew">
        <Users />
      </button>
      <button aria-label="Health">
        <HeartPulse />
      </button>
      <button aria-label="Safety">
        <ShieldAlert />
      </button>
      <div className="rail-bottom">
        <button aria-label="Notifications">
          <Bell />
        </button>
        <div className="tiny-avatar">MN</div>
      </div>
    </aside>
  );
}
