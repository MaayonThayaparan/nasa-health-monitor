import { TaskItem } from './TaskItem';
export function ScheduledTasks() {
  return (
    <div className="panel task-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">TODAY'S PROTOCOL</p>
          <h3>Scheduled tasks</h3>
        </div>
        <span className="date">SOL 184</span>
      </div>
      <TaskItem label="Radiation dosimeter sync" time="12:45 UTC" done />
      <TaskItem label="Crew mood check-in" time="13:00 UTC" />
      <TaskItem label="Blood pressure round" time="18:00 UTC" />
    </div>
  );
}
