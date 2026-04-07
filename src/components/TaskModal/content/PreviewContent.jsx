// PreviewContent — Modal content for "Preview Orientation Tasks" enrollment task
// Shows the 8 orientation tasks as a preview list (non-interactive)

import {
  Compass, BookOpen, HandMetal, Users, PenLine, GraduationCap, Target, UserPlus,
} from 'lucide-react';
import { mockOrientationTasks, formatDate, mockCohort } from '../../../data/orientationData';

const iconMap = {
  compass: Compass,
  'book-open': BookOpen,
  'hand-metal': HandMetal,
  users: Users,
  'pen-line': PenLine,
  'graduation-cap': GraduationCap,
  target: Target,
  'user-plus': UserPlus,
};

export default function PreviewContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        Your orientation tasks unlock on {formatDate(mockCohort.orientationStartDate)}. Complete them before Day 1.
      </p>

      {/* Task preview list */}
      <div className="space-y-1">
        {mockOrientationTasks.map((task) => {
          const Icon = iconMap[task.icon] || Compass;
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 py-3 border-b border-neutral-dark/20 last:border-0"
            >
              {/* Icon square */}
              <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
                <Icon size={16} className="text-text-secondary" />
              </div>

              {/* Task name + goal */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {task.name}
                  {task.optional && (
                    <span className="text-text-disabled font-normal ml-1">(optional)</span>
                  )}
                </p>
                <p className="text-xs text-text-tertiary truncate">{task.goal}</p>
              </div>

              {/* Duration */}
              <span className="text-xs text-text-disabled shrink-0">{task.duration}min</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
