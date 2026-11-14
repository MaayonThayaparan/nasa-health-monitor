export function MissionHero({ solar }: { solar: boolean }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">CREW AUTONOMY CONSOLE</p>
        <h2>{solar ? 'Shield, assess, recover.' : 'Crew health is nominal.'}</h2>
        <p>
          {solar
            ? 'An elevated radiation event requires a focused crew response.'
            : 'All connected health and habitat indicators are within their mission baselines.'}
        </p>
      </div>
      <div className={`readiness ${solar ? 'warn' : ''}`}>
        <span>MISSION READINESS</span>
        <strong>
          {solar ? '76' : '93'}
          <em>/100</em>
        </strong>
        <small>{solar ? '2 items need attention' : 'Ready for planned operations'}</small>
      </div>
    </section>
  );
}
