import { useState } from 'react';
export interface ManualEntry {
  value: string;
  date: string;
  note: string;
}
export function ManualEntryModal({
  metric,
  onSave,
  onClose,
}: {
  metric: string;
  onSave: (_entry: ManualEntry) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [note, setNote] = useState('');
  const future = new Date(date) > new Date();
  return (
    <div className="modal-backdrop" role="presentation">
      <form
        className="modal"
        onSubmit={(event) => {
          event.preventDefault();
          if (value && !future) onSave({ value, date, note });
        }}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close manual entry"
        >
          ×
        </button>
        <p className="eyebrow">MANUAL ENTRY</p>
        <h3>{metric}</h3>
        <label>
          Reading
          <input
            required
            value={value}
            inputMode="decimal"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter value"
          />
        </label>
        <label>
          Date and time
          <input
            required
            type="datetime-local"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label>
          Optional note
          <textarea value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
        {future && <p className="form-error">Entries cannot be dated in the future.</p>}
        <button className="primary" type="submit">
          Save manual entry
        </button>
      </form>
    </div>
  );
}
