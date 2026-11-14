import { useState } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { CommandCentre } from './components/CommandCentre';
import { MissionHeader } from './components/MissionHeader';
import { PersonalLogin } from './components/PersonalLogin';
import { PersonalWorkspace } from './components/PersonalWorkspace';
import { crew } from './data/missionData';

export default function App() {
  const [solar, setSolar] = useState(true);
  const [view, setView] = useState<'command' | 'personal'>('command');
  const [loggedInId, setLoggedInId] = useState<string | null>(null);
  const person = crew.find((member) => member.id === loggedInId);
  return (
    <main>
      <AppSidebar
        view={view}
        onCommand={() => setView('command')}
        onPersonal={() => setView('personal')}
      />
      <section className="shell">
        <MissionHeader solar={solar} onToggle={() => setSolar((current) => !current)} />
        {view === 'command' ? (
          <CommandCentre
            solar={solar}
            onSolarToggle={() => setSolar((current) => !current)}
            onPersonal={() => setView('personal')}
          />
        ) : person ? (
          <PersonalWorkspace person={person} solar={solar} onLogout={() => setLoggedInId(null)} />
        ) : (
          <PersonalLogin crew={crew} onLogin={setLoggedInId} />
        )}
      </section>
    </main>
  );
}
