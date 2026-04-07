// WelcomeContent — Modal content for "Welcome & Get Started" enrollment task
// Shows celebration message, cohort info, and what to expect

import { Users, Calendar, Sparkles } from 'lucide-react';
import { mockCohort, mockStudent, formatDate } from '../../../data/orientationData';

export default function WelcomeContent() {
  return (
    <div className="space-y-6">
      {/* Celebration header */}
      <div className="text-center py-4">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          You're in, {mockStudent.name}!
        </h3>
        <p className="text-sm text-text-secondary">
          Welcome to the {mockCohort.name} cohort. Here's what's coming up.
        </p>
      </div>

      {/* Cohort info cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 bg-bg-elevated rounded-lg p-4">
          <Users size={20} className="text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">{mockCohort.studentCount} students</p>
            <p className="text-xs text-text-tertiary">Joining {mockStudent.program}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-bg-elevated rounded-lg p-4">
          <Calendar size={20} className="text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">Cohort starts {formatDate(mockCohort.startDate)}</p>
            <p className="text-xs text-text-tertiary">Orientation begins {formatDate(mockCohort.orientationStartDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-bg-elevated rounded-lg p-4">
          <Sparkles size={20} className="text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">Complete enrollment tasks</p>
            <p className="text-xs text-text-tertiary">Finish your profile, meet classmates, and get ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
