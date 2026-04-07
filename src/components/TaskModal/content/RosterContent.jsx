// RosterContent — Modal content for "Meet Your Cohort" enrollment task
// Shows a grid of classmate cards from mockRosterStudents

import { mockCohort, mockRosterStudents } from '../../../data/orientationData';
import Avatar from '../../shared/Avatar';

export default function RosterContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        {mockCohort.studentCount} students enrolled in your cohort.
      </p>

      {/* Student cards grid — 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {mockRosterStudents.map((student) => (
          <div
            key={student.id}
            className="bg-bg-elevated rounded-lg p-3 border border-neutral-dark/30"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-2.5 mb-2">
              <Avatar src={student.avatar} name={student.name} size="sm" />
              <span className="text-sm font-medium text-text-primary truncate">{student.name}</span>
            </div>

            {/* Bio */}
            <p className="text-xs text-text-tertiary leading-relaxed mb-2 line-clamp-2">
              {student.bio}
            </p>

            {/* Program tag */}
            <span className="inline-block text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {student.program}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
