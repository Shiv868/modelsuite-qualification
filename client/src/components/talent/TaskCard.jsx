import { claimTask } from '../../api/talent';

const STATUS_CLASS = {
  Open:      'status-badge-Open',
  Claimed:   'status-badge-Claimed',
  Submitted: 'status-badge-Submitted',
  Approved:  'status-badge-Approved',
  Rejected:  'status-badge-Rejected',
};
const fmtDate = (raw) => {
  if (!raw) return 'No due date';

  const d = new Date(raw);

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getDueBadge = (dueDate) => {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  if (due < today) {
    return {
      text: 'Overdue',
      className: 'bg-red-500/15 text-red-400',
    };
  }

  if (due.getTime() === today.getTime()) {
    return {
      text: 'Due Soon',
      className: 'bg-yellow-500/15 text-yellow-400',
    };
  }

  return null;
};



const TaskCard = ({ task, showClaimButton = false, onClaimed }) => {
  const dueBadge = getDueBadge(task.dueDate);
  const handleClaim = async () => {
    try {
      await claimTask(task._id);
      if (onClaimed) onClaimed();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to claim task');
    }
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-border-light hover:-translate-y-0.5 transition-all cursor-default">

      {/* Header: title + status */}
      <div className="flex items-start justify-between gap-2.5">
        <p className="text-[15px] font-semibold text-text-primary leading-snug">{task.title || 'Untitled Task'}</p>
        {task.status && (
          <span className={`shrink-0 inline-block px-2.5 py-[3px] rounded-full text-[11px] font-semibold tracking-[0.3px] ${STATUS_CLASS[task.status] || ''}`}>
            {task.status}
          </span>
        )}
      </div>

      
      {task.description && (
        <p className="text-[13px] text-text-muted leading-relaxed">{task.description}</p>
      )}

      {/* Meta row */}
      <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
        
      <div className="flex flex-col">
        <span className="text-[12px] text-text-faint">
          Due: {fmtDate(task.dueDate)}
        </span>

        {dueBadge && (
          <span
            className={`mt-1 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold ${dueBadge.className}`}
          >
            {dueBadge.text}
          </span>
        )}
      </div>
        {task.createdBy?.name && (
          <span className="text-[12px] text-text-faint">By {task.createdBy.name}</span>
        )}
      </div>

      {showClaimButton && (
        <button onClick={handleClaim}
          className="w-full py-2.5 rounded-lg border-none text-[13px] font-semibold text-white cursor-pointer btn-gradient font-sans mt-1">
          Claim Task →
        </button>
      )}
    </div>
  );
};

export default TaskCard;
