import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Mission Pulse', () => {
  it('switches between solar event and nominal scenarios', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText('Radiation exposure elevated')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'SOLAR EVENT' }));
    expect(screen.getByText('All priority indicators nominal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'NOMINAL SCENARIO' })).toBeInTheDocument();
  });

  it('opens a crew health profile and returns to the overview', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Dr. Mira Nwosu/ }));
    expect(screen.getByText('CREW HEALTH PROFILE')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Back to mission overview/ }));
    expect(screen.getByText('Daily readiness')).toBeInTheDocument();
  });

  it('shows and dismisses the response notification', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Open response plan/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Response plan opened for crew review.');
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows physical device guidance and a private mental tab', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Dr. Mira Nwosu/ }));
    await user.click(screen.getByRole('tab', { name: 'Metric log' }));
    await user.click(screen.getByRole('button', { name: 'Open Heart rate' }));
    await user.click(screen.getByRole('button', { name: /Connect device/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Device API is not implemented');
    await user.click(screen.getByRole('tab', { name: 'Mental' }));
    expect(screen.getByText('PRIVATE WELLNESS CHECK-IN')).toBeInTheDocument();
    expect(screen.getByText('PRIVATE JOURNAL')).toBeInTheDocument();
  });

  it('logs a session from its individual exercise card', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Dr. Mira Nwosu/ }));
    await user.click(screen.getByRole('button', { name: 'Open Squat' }));
    await user.click(screen.getByRole('button', { name: /Log Squat session/ }));
    expect(screen.getByText('Log Squat')).toBeInTheDocument();
    expect(screen.getByLabelText('Resistance (lb equivalent)')).toBeInTheDocument();
    expect(screen.getByLabelText('Date & time')).toHaveAttribute('max');
  });

  it('opens a metric detail from the metric log', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Dr. Mira Nwosu/ }));
    await user.click(screen.getByRole('tab', { name: 'Metric log' }));
    await user.click(screen.getByRole('button', { name: 'Open Heart rate' }));
    expect(screen.getByRole('button', { name: /Connect device/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add manual entry/ })).toBeInTheDocument();
  });

  it('separates autonomous response into an event-driven protocol tab', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Dr. Mira Nwosu/ }));
    await user.click(screen.getByRole('tab', { name: 'Protocols' }));
    expect(screen.getByText('Active event-driven protocol')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'SOLAR EVENT' }));
    expect(
      screen.getByText('No active protocols. Monitoring continues in the background.'),
    ).toBeInTheDocument();
  });
});
