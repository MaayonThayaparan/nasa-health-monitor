import { useMemo, useState } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { CrewDetail } from './components/CrewDetail';
import { CrewHealthPanel } from './components/CrewHealthPanel';
import { EnvironmentMetrics } from './components/EnvironmentMetrics';
import { MissionHeader } from './components/MissionHeader';
import { MissionHero } from './components/MissionHero';
import { PriorityQueue } from './components/PriorityQueue';
import { ScheduledTasks } from './components/ScheduledTasks';
import { Toast } from './components/Toast';
import { alertsFor, crew, environment } from './data/missionData';
export default function App() {
  const [solar, setSolar] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);
  const shownCrew = useMemo(
    () =>
      crew.map((person) =>
        solar && person.id === 'mateo'
          ? person
          : {
              ...person,
              status: 'stable' as const,
              score: person.id === 'leon' ? 89 : person.score,
            },
      ),
    [solar],
  );
  const activeCrew = selectedId ? shownCrew.find((person) => person.id === selectedId) : undefined;
  return (
    <main>
      <AppSidebar />
      <section className="shell">
        <MissionHeader solar={solar} onToggle={() => setSolar((current) => !current)} />
        {activeCrew ? (
          <CrewDetail person={activeCrew} solar={solar} onBack={() => setSelectedId(null)} />
        ) : (
          <>
            <MissionHero solar={solar} />
            <EnvironmentMetrics metrics={solar ? environment.solar : environment.normal} />
            <section className="grid">
              <CrewHealthPanel crew={shownCrew} onSelect={setSelectedId} />
              <div className="right-stack">
                <PriorityQueue alerts={alertsFor(solar)} onAction={() => setNotice(true)} />
                <ScheduledTasks />
              </div>
            </section>
          </>
        )}
      </section>
      {notice && <Toast onClose={() => setNotice(false)} />}
    </main>
  );
}
