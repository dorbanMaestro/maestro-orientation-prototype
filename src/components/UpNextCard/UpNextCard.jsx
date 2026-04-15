// UpNextCard — "Up next" card highlighting current task
// Matches Maestro production: bordered card (1px border), rounded corners
// Layout: header row with icon + "Up next" label
// Content row: rounded square icon | week label + name + subtitle | ghost "Continue" button
// UPDATED: new icons for 4-week structure, week label instead of ENROLL/ORIENT

import {
  ClipboardList,
  Compass,
  BookOpen,
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
  MessageCircle,
  LogIn,
  Bot,
  Flag,
  HandMetal,
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
  'message-circle': MessageCircle,
  'log-in': LogIn,
  bot: Bot,
  flag: Flag,
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

  // Week label for orientation tasks, or "ENROLL" for enrollment tasks
  const phaseLabel = task.week ? `WEEK ${task.week}` : (task.modalType ? 'ENROLL' : 'ORIENT');

  return (
    <div className="border border-border-default rounded-2xl bg-bg-surface p-6">
      {/* Header: small clipboard icon + "Up next" label */}
      <div className="flex items-center gap-2 mb-5">
        <ClipboardList size={16} className="text-text-tertiary" />
        <span className="text-sm text-text-tertiary font-medium">
          Up next
        </span>
      </div>

      {/* Content row: icon square | text info | ghost button */}
      <div className="flex items-center gap-4">
        {/* Circular icon — 48px, dark bg (production uses circles) */}
        <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center shrink-0">
          <TaskIcon size={22} className="text-text-primary" />
        </div>

        {/* Text info — two lines */}
        <div className="flex-1 min-w-0">
          {/* Line 1: phase code (gray) + name (white bold) */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-tertiary">{phaseLabel}</span>
            <span className="text-sm text-text-tertiary">·</span>
            <span className="text-sm font-semibold text-text-primary truncate">
              {task.name}
            </span>
          </div>
          {/* Line 2: goal description */}
          <p className="text-sm text-text-tertiary mt-1 truncate">
            {task.goal}
          </p>
        </div>

        {/* Outlined/secondary button — matches production (NOT solid fill) */}
        <button
          onClick={() => onStart?.(task)}
          className="shrink-0 flex items-center gap-1.5 px-6 py-2.5 bg-transparent text-text-primary text-sm font-medium rounded-full transition-all hover:border-border-strong hover:bg-white/5 cursor-pointer border border-border-default"
        >
          {buttonText}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
