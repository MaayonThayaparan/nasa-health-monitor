import { useState } from 'react';
import type { CrewMember } from '../types/mission';
export function PersonalLogin({
  crew,
  onLogin,
}: {
  crew: CrewMember[];
  onLogin: (_id: string) => void;
}) {
  const [username, setUsername] = useState('mira');
  const [password, setPassword] = useState('mission2026');
  const [error, setError] = useState('');
  return (
    <section className="login-card panel">
      <p className="eyebrow">PERSONAL ACCESS</p>
      <h2>Sign in to your crew workspace</h2>
      <p
        className="metric-trend"
        title="Demo accounts: mira, leon, sara, mateo. Password for every account: mission2026."
      >
        Hover for demo credentials
      </p>
      <label>
        Username
        <select value={username} onChange={(event) => setUsername(event.target.value)}>
          {crew.map((person) => (
            <option key={person.id} value={person.id}>
              {person.id}
            </option>
          ))}
        </select>
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button
        className="primary"
        onClick={() =>
          password === 'mission2026'
            ? onLogin(username)
            : setError('Use the demo password shown in the hint.')
        }
      >
        Sign in
      </button>
    </section>
  );
}
