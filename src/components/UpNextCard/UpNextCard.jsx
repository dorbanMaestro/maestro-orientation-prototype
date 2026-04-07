// UpNextCard — "Up next" card highlighting current task
// Matches Maestro production: bordered card (1px border), rounded corners
// Layout: header row with icon + "Up next" label
// Content row: rounded square icon | course code + name + subtitle | ghost "Continue" button

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
  ArrowRight,
  PartyPopper,
  UserCircle,
  UsersRound,
  ListChecks,
} from 'lucide-react';

// Map icon string names to lucide components
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

/**
 * "Up next" card — highlights the current/next task.
 * @param {object} task - The orientation task object
 * @param {function} onStart - Called when user clicks the action button
 */
export default function UpNextCard({ task, onStart }) {
  if (!task) return null;

  const TaskIcon = iconMap[task.icon] || Compass;
  const buttonText = task.status === 'in_progress' ? 'Continue' : 'Start';

  return (
    <div className="border border-neutral-dark/40 rounded-md bg-transparent p-6">
      {/* Header: small clipboard icon + "Up next" label */}
      <div className="flex items-center gap-2 mb-5">
        <ClipboardList size={16} className="text-text-tertiary" />
        <span className="text-sm text-text-tertiary font-medium">
          Up next
        </span>
      </div>

      {/* Content row: icon square | text info | ghost button */}
      <div className="flex items-center gap-4">
        {/* Rounded square icon — 48px, dark bg */}
        <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
          <TaskIcon size={22} className="text-text-primary" />
        </div>

        {/* Text info — two lines */}
        <div className="flex-1 min-w-0">
          {/* Line 1: phase code (gray) + name (white bold) */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-tertiary">{task.modalType ? 'ENROLL' : 'ORIENT'}</span>
            <span className="text-sm text-text-tertiary">·</span>
            <span className="text-sm font-semibold text-text-primary truncate">
              {task.name}
            </span>
          </div>
          {/* Line 2: lesson info + description */}
          <p className="text-sm text-text-tertiary mt-1 truncate">
            {task.goal}
          </p>
        </div>

        {/* Ghost/outlined button with border — NOT filled */}
        <button
          onClick={() => onStart?.(task)}
          className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 border border-neutral-dark/60 hover:border-text-tertiary text-text-primary text-sm font-medium rounded-lg transition-colors cursor-pointer bg-transparent"
        >
          {buttonText}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
