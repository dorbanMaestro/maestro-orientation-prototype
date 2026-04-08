// OrientationTaskCard — A single task ROW inside the Weekly Goals section
// Matches Maestro production:
// - NO individual card borders — these are rows inside the section container
// - Left: rounded square icon (~44px) with dark bg and white icon
// - Middle: task name (white, ~15px) + time estimate + optional badge + segmented progress bar below
// - Right: "8 diamond" points text
// - Segmented bar: ~8 thin rectangular segments with small gaps
// - Filled = blue (#6366f1), unfilled = dark gray
// - Generous vertical spacing between rows

import { Check } from 'lucide-react';
import {
  ClipboardList,
  Compass,
  BookOpen,
  HandMetal,
  Users,
  PenLine,
  GraduationCap,
  Target,
  UserPlus,
  PartyPopper,
  UserCircle,
  UsersRound,
  ListChecks,
} from 'lucide-react';

const iconMap = {
  compass: Compass,
  'book-open': BookOpen,
  'hand-metal': HandMetal,
  users: Users,
  'pen-line': PenLine,
  'graduation-cap': GraduationCap,
  target: Target,
  'user-plus': UserPlus,
  party: PartyPopper,
  'user-circle': UserCircle,
  'users-round': UsersRound,
  'list-checks': ListChecks,
  'clipboard-list': ClipboardList,
};

// 8 segments to match the Maestro design
const SEGMENT_COUNT = 8;

/**
 * Segmented progress bar — 8 thin rectangular segments with gaps.
 * Filled segments = indigo, unfilled = dark gray.
 */
function SegmentedProgressBar({ status }) {
  let filledCount = 0;
  if (status === 'completed') filledCount = SEGMENT_COUNT;
  if (status === 'in_progress') filledCount = 3; // ~40% visual

  return (
    <div className="flex items-center gap-[3px] mt-2">
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`h-[4px] rounded-[2px] flex-1 ${
            i < filledCount
              ? 'bg-primary'
              : 'bg-bg-elevated'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * A single task row (not a card — no individual borders).
 * @param {object} task - Task object (includes .duration in minutes, .optional boolean)
 * @param {function} onClick - Called when row is clicked
 * @param {boolean} interactive - If false, row is dimmed
 */
export default function OrientationTaskCard({
  task,
  onClick,
  interactive = true,
}) {
  const TaskIcon = iconMap[task.icon] || Compass;
  const isCompleted = task.status === 'completed';
  const isLocked = task.status === 'locked';

  const taskPoints = 8;

  return (
    <button
      onClick={() => interactive && !isLocked && onClick?.(task)}
      disabled={!interactive || isLocked}
      className={`
        w-full flex items-center gap-4 py-4 text-left transition-colors
        ${interactive && !isLocked ? 'hover:bg-bg-hover/30 cursor-pointer' : ''}
        ${isLocked ? 'opacity-35 cursor-not-allowed' : ''}
      `}
    >
      {/* Left: Circular icon — 44px, dark bg (production uses circles, not rounded squares) */}
      <div
        className={`
          w-11 h-11 rounded-full flex items-center justify-center shrink-0
          ${isCompleted ? 'bg-primary/15' : 'bg-bg-elevated'}
        `}
      >
        {/* Completed: checkmark replaces original icon inside the circle */}
        {isCompleted ? (
          <Check size={20} className="text-primary" />
        ) : (
          <TaskIcon
            size={20}
            className="text-text-primary"
          />
        )}
      </div>

      {/* Middle: Task name + time estimate + optional badge + segmented progress bar */}
      <div className="flex-1 min-w-0">
        {/* Task name row — name + optional badge on same line */}
        <div className="flex items-center gap-2">
          <span
            className={`
              text-[15px] font-medium truncate
              ${isCompleted ? 'text-text-secondary' : 'text-text-primary'}
            `}
          >
            {task.name}
          </span>

          {/* "Optional" pill badge — only shown when task.optional is true */}
          {task.optional && (
            <span className="text-xs text-text-tertiary bg-bg-elevated px-2 py-0.5 rounded-full shrink-0">
              Optional
            </span>
          )}
        </div>

        {/* Time estimate — subtle gray text below the name */}
        {task.duration && (
          <span className="text-xs text-text-tertiary mt-0.5 block">
            ~{task.duration} min
          </span>
        )}

        <SegmentedProgressBar status={task.status} />
      </div>

      {/* Right: Points with diamond symbol (production shows points for all states, no separate green check) */}
      <div className="shrink-0 flex items-center">
        <span className={`text-sm flex items-center gap-1 ${isCompleted ? 'text-text-tertiary/50' : 'text-text-tertiary'}`}>
          {taskPoints} <span className="text-warning">&#x25C6;</span>
        </span>
      </div>
    </button>
  );
}
