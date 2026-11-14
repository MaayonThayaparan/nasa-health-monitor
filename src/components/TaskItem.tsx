export function TaskItem({
  label,
  time,
  done = false,
}: {
  label: string;
  time: string;
  done?: boolean;
}) {
  return (
    <div className="task">
      <span className={done ? 'done-box' : 'box'}>{done ? '✓' : ''}</span>
      <div>
        <b>{label}</b>
        <small>{time}</small>
      </div>
      {done ? <span className="complete">Complete</span> : <button>Begin</button>}
    </div>
  );
}
