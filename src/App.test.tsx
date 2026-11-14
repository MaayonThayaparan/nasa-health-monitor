import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Mission Pulse command centre', () => {
  it('shows public cabin health and mission transit status', () => {
    render(<App />);

    expect(screen.getByText('Earth → Mars transit')).toBeInTheDocument();
    expect(screen.getByText('142 days to Mars landing')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Workout' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Protocol' })).toBeInTheDocument();
  });

  it('switches scenario environments and protocol state', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mission scenario' }), 'eva');
    await user.click(screen.getByRole('tab', { name: /Outside craft \/ EVA/ }));
    expect(screen.getByText('LIVE EVA TELEMETRY')).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Protocol state' }), 'none');
    expect(screen.getAllByText('No protocol').length).toBeGreaterThan(0);
  });

  it('requires demo login for the personal workspace', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Personal' }));
    expect(screen.getByText('Sign in to your crew workspace')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByText('PERSONAL CREW WORKSPACE')).toBeInTheDocument();
    expect(screen.getByText('Daily check-in')).toBeInTheDocument();
  });
});
