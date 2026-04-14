// CommitmentContent — "Make Your Commitment" orientation task
// Three sections per the PRD:
//   1. Pod Challenge Launch (top)
//   2. Cohort Commitment Wall (middle) — already existed
//   3. Day 1 Preview (bottom)
// Clean Maestro dark-theme aesthetic throughout.

import { useState } from 'react';
import { Target, BookOpen } from 'lucide-react';
import { mockCohort, mockPod } from '../../../data/orientationData';

export default function CommitmentContent() {
  const [commitment, setCommitment] = useState('');
  const [shared, setShared] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header — clean, left-aligned */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          Make Your Commitment
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          Commit to your pod and set the tone for Week 1.
        </p>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* ── Section 1: Pod Challenge ── */}
      <div className="border border-neutral-dark/30 rounded-lg bg-bg-elevated p-4 space-y-3">
        {/* Section heading with icon */}
        <div className="flex items-center gap-2">
          <Target size={16} className="text-text-secondary shrink-0" />
          <h4 className="text-sm font-medium text-text-primary">
            Your Pod's First Challenge
          </h4>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          Complete the first week of the degree together and{' '}
          <span className="font-semibold text-text-primary">
            make sure no one is left behind
          </span>.
        </p>

        {/* Pod member avatar stack */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex -space-x-2">
            {mockPod.members.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="w-7 h-7 rounded-full border-2 border-bg-elevated object-cover"
              />
            ))}
          </div>
          <span className="text-xs text-text-tertiary ml-1">
            {mockPod.members.length} pod students
          </span>
        </div>
      </div>

      {/* ── Section 2: Commitment Wall (existing) ── */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Your commitment
        </label>
        <textarea
          value={commitment}
          onChange={(e) => setCommitment(e.target.value.slice(0, 280))}
          placeholder="I commit to help my pod achieve our first challenge by..."
          rows={5}
          className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-neutral-dark transition-colors resize-none"
        />
        <span className="text-[11px] text-text-disabled mt-1 block text-right">
          {commitment.length}/280
        </span>
      </div>

      {/* Cohort context */}
      <div className="flex items-center gap-3 py-3 border-t border-b border-neutral-dark/20">
        <p className="text-sm text-text-tertiary">
          Your <span className="font-medium text-text-secondary">{mockPod.members.length} pod students</span>{' '}
          will see your commitment
        </p>
      </div>

      {/* ── Section 3: Day 1 Preview ── */}
      <div className="border border-neutral-dark/30 rounded-lg bg-bg-elevated p-4 space-y-3">
        {/* Section heading with icon */}
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-text-secondary shrink-0" />
          <h4 className="text-sm font-medium text-text-primary">
            Your Day 1 Preview
          </h4>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          Your cohort starts on{' '}
          <span className="font-semibold text-text-primary">
            {new Date(mockCohort.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>. Get ready!
        </p>
      </div>

      {/* Share button — shows success after clicking */}
      {!shared ? (
        <button
          onClick={() => {
            console.log('Commitment shared:', commitment);
            setShared(true);
          }}
          disabled={commitment.length < 10}
          className={`w-full py-3 font-medium text-sm rounded-lg transition-colors cursor-pointer ${
            commitment.length >= 10
              ? 'text-text-primary border border-text-primary/40 hover:bg-bg-hover'
              : 'text-text-disabled border border-neutral-dark/30 cursor-not-allowed'
          }`}
        >
          Share My Commitment
        </button>
      ) : (
        <div className="text-center py-3">
          <p className="text-sm text-green-400 font-medium">Commitment shared with your pod!</p>
        </div>
      )}
    </div>
  );
}
