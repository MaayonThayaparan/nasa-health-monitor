import { useState } from 'react';
import { AlertTriangle, ArrowRight, Earth, MapPin, Mars, Radio, Wind } from 'lucide-react';
import { environment, crew } from '../data/missionData';
import { scenarioCrew, scenarioLabels, type MissionMode } from '../data/commandScenarios';
import { EnvironmentMetrics } from './EnvironmentMetrics';
import type { CrewMember } from '../types/mission';

type CentreTab = 'cabin' | 'eva' | 'planet';
const trend = (score: number) => (score > 84 ? 'up' : score < 72 ? 'down' : 'neutral');
const completion = (done: boolean) => (done ? 'Complete' : 'Last: Sol 183');
export function CommandCentre({
  solar,
  onSolarToggle,
  onPersonal,
}: {
  solar: boolean;
  onSolarToggle: () => void;
  onPersonal: () => void;
}) {
  const [mode, setMode] = useState<MissionMode>('mixed');
  const [tab, setTab] = useState<CentreTab>('cabin');
  const [protocol, setProtocol] = useState(solar);
  const positions = scenarioCrew[mode];
  const tabCrew = crew.filter((person) => positions[person.id].location === tab);
  const locationCounts = {
    cabin: crew.filter((person) => positions[person.id].location === 'cabin').length,
    eva: crew.filter((person) => positions[person.id].location === 'eva').length,
    planet: crew.filter((person) => positions[person.id].location === 'planet').length,
  };
  return (
    <section className="command-centre">
      <div className="command-top">
        <div className="transit transit-hero">
          <div className="transit-copy">
            <p className="eyebrow">MISSION TRANSIT</p>
            <b>Earth → Mars transit</b>
            <small>142 days to Mars landing</small>
          </div>
          <div className="transit-route" aria-label="Earth to Mars mission route">
            <Earth size={42} aria-label="Earth" />
            <span />
            <ArrowRight size={24} />
            <span />
            <Mars size={42} aria-label="Mars" />
          </div>
        </div>
        <div className="command-controls">
          <select
            aria-label="Mission scenario"
            value={mode}
            onChange={(event) => setMode(event.target.value as MissionMode)}
          >
            {Object.entries(scenarioLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <button className={solar ? 'scenario is-solar' : 'scenario'} onClick={onSolarToggle}>
            {solar ? 'SOLAR EVENT' : 'NOMINAL SCENARIO'}
          </button>
          <select
            aria-label="Protocol state"
            value={protocol ? 'active' : 'none'}
            onChange={(event) => setProtocol(event.target.value === 'active')}
          >
            <option value="none">No protocol</option>
            <option value="active">Protocol active</option>
          </select>
          <button className="primary" onClick={onPersonal}>
            Personal login
          </button>
        </div>
      </div>
      <EnvironmentMetrics metrics={solar ? environment.solar : environment.normal} />
      <section className="panel command-crew">
        <div className="panel-head">
          <div>
            <p className="eyebrow">CREW OPERATIONS</p>
            <h3>Health, readiness & protocol status</h3>
          </div>
          <span className={protocol ? 'protocol-chip active' : 'protocol-chip'}>
            {protocol ? 'Protocol active' : 'No protocol'}
          </span>
        </div>
        <div className="physical-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'cabin'}
            className={tab === 'cabin' ? 'active' : ''}
            onClick={() => setTab('cabin')}
          >
            In spacecraft ({locationCounts.cabin})
          </button>
          <button
            role="tab"
            aria-selected={tab === 'eva'}
            className={tab === 'eva' ? 'active' : ''}
            onClick={() => setTab('eva')}
          >
            Outside craft / EVA ({locationCounts.eva})
          </button>
          <button
            role="tab"
            aria-selected={tab === 'planet'}
            className={tab === 'planet' ? 'active' : ''}
            onClick={() => setTab('planet')}
          >
            On planet ({locationCounts.planet})
          </button>
        </div>
        {tab === 'cabin' ? (
          <CabinTable crew={tabCrew} positions={positions} protocol={protocol} />
        ) : (
          <LiveTable crew={tabCrew} tab={tab} />
        )}
      </section>
    </section>
  );
}
function CabinTable({
  crew: people,
  positions,
  protocol,
}: {
  crew: CrewMember[];
  positions: Record<
    string,
    { workout: boolean; cardio: boolean; resilience: boolean; protocol: string }
  >;
  protocol: boolean;
}) {
  return (
    <div className="ops-table-wrap">
      <table className="ops-table">
        <thead>
          <tr>
            <th>Crew</th>
            <th>Workout</th>
            <th>Cardio</th>
            <th>Resilience</th>
            <th>Body</th>
            <th>Cardio score</th>
            <th>Metrics</th>
            <th>Mental</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            const state = positions[person.id];
            const scoreTrend = trend(person.score);
            const danger = person.status === 'urgent';
            return (
              <tr key={person.id}>
                <td>
                  <b>{person.name}</b>
                  <small>{person.location}</small>
                </td>
                <td className={state.workout ? 'complete' : 'incomplete'}>
                  {completion(state.workout)}
                </td>
                <td className={state.cardio ? 'complete' : 'incomplete'}>
                  {completion(state.cardio)}
                </td>
                <td className={state.resilience ? 'complete' : 'incomplete'}>
                  {completion(state.resilience)}
                </td>
                <td>
                  {person.score}
                  <Trend value={scoreTrend} />
                </td>
                <td>
                  {Math.max(55, person.score - 4)}
                  <Trend value={scoreTrend} />
                </td>
                <td className={danger ? 'metric-danger' : ''}>
                  {danger && (
                    <span title="Radiation dose and blood pressure elevated">
                      <AlertTriangle size={14} />
                    </span>
                  )}
                  {danger ? 'Alert' : 'Nominal'}
                  <Trend value={danger ? 'down' : 'neutral'} />
                </td>
                <td>
                  {person.mood}/5
                  <Trend value={person.mood >= 4 ? 'up' : person.mood <= 2 ? 'down' : 'neutral'} />
                </td>
                <td className={protocol && state.protocol !== 'none' ? 'protocol-cell' : ''}>
                  {protocol && state.protocol !== 'none'
                    ? state.protocol === 'complete'
                      ? 'Completed'
                      : 'Action due'
                    : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function LiveTable({ crew: people, tab }: { crew: CrewMember[]; tab: CentreTab }) {
  return people.length ? (
    <div className="live-grid">
      {people.map((person) => (
        <article className="live-card" key={person.id}>
          <div>
            <p className="eyebrow">LIVE {tab === 'eva' ? 'EVA' : 'PLANETARY'} TELEMETRY</p>
            <h3>{person.name}</h3>
            <p>
              <MapPin size={13} />{' '}
              {tab === 'eva' ? 'Truss B-14 · exterior repair' : 'Mawrth Vallis · rover 02'}
            </p>
          </div>
          <div className="live-readings">
            <span>
              <Wind /> O₂ {tab === 'eva' ? '71%' : '64%'}
            </span>
            <span>Pressure {tab === 'eva' ? '29.6 kPa' : '58.2 kPa'}</span>
            <span>Temp {tab === 'eva' ? '−18°C' : '−31°C'}</span>
            <span>
              <Radio /> Link nominal
            </span>
          </div>
        </article>
      ))}
    </div>
  ) : (
    <p className="entry-note">
      No crew members currently assigned to this operational environment in the selected scenario.
    </p>
  );
}
function Trend({ value }: { value: string }) {
  return (
    <span className={`score-trend ${value}`}>
      {value === 'up' ? '↑' : value === 'down' ? '↓' : '→'}
    </span>
  );
}
