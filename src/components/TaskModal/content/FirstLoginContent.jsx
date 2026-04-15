// FirstLoginContent — "First Login" auto-complete milestone
// Simple celebratory screen that shows when the student logs in for the first time
// Auto-completed — no user action needed, just a welcome moment

import { CheckCircle, Sparkles } from 'lucide-react';
import { mockStudent, mockCohort } from '../../../data/orientationData';

export default function FirstLoginContent() {
  return (
    <div className="text-center py-8 space-y-5">
      {/* Celebratory icon */}
      <div className="relative w-20 h-20 mx-auto">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-success/10 animate-pulse" />
        {/* Inner circle with checkmark */}
        <div className="absolute inset-2 rounded-full bg-success/15 flex items-center justify-center">
          <CheckCircle size={36} className="text-success" />
        </div>
      </div>

      {/* Sparkle accent */}
      <div className="flex items-center justify-center gap-1 text-primary/60">
        <Sparkles size={14} />
        <span className="text-[11px] font-bold uppercase tracking-widest">Milestone Unlocked</span>
        <Sparkles size={14} />
      </div>

      {/* Welcome heading */}
      <h3 className="text-xl font-semibold text-text-primary">
        Welcome to your cohort!
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
        This task auto-completed when you logged in for the first time. You're officially part of the{' '}
        <span className="font-medium text-text-primary">{mockCohort.name}</span> cohort.
      </p>

      {/* Student info card */}
      <div className="inline-flex items-center gap-3 border border-neutral-dark/20 rounded-lg px-5 py-3 mt-2">
        {/* Avatar initials */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#7C6FEB' }}
        >
          <span className="text-white text-sm font-semibold">
            {mockStudent.fullName.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-text-primary">{mockStudent.fullName}</p>
          <p className="text-xs text-text-tertiary">
            Enrolled {new Date(mockStudent.enrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Encouraging footer */}
      <p className="text-xs text-text-tertiary italic pt-2">
        "Every expert was once a beginner." — Let's get started!
      </p>
    </div>
  );
}
