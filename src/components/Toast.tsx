import { CircleCheck } from 'lucide-react';
export function Toast({ onClose }: { onClose: () => void }) {
  return (
    <div className="toast" role="status">
      <CircleCheck />
      Response plan opened for crew review.
      <button onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}
