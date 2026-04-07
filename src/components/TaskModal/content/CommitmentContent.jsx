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

  return (
    <div className="space-y-6">
      {/* Header — clean, left-aligned */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          Make Your Commitment
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          Launch your pod challenge, share your goal with the cohort, and preview Day 1.
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
          Starting Day 1, your pod will work together to complete{' '}
          <span className="font-semibold text-text-primary">
            {mockPod.week1Goal.targetLessons} lessons
          </span>{' '}
          in Week 1.
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
            {mockPod.members.length} pod members
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
          placeholder="I commit to..."
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
          <span className="font-medium text-text-secondary">{mockCohort.studentCount} students</span>{' '}
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

        {/* Lesson info rows */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-tertiary">First lesson</span>
            <span className="text-sm font-medium text-text-primary">
              Introduction to AI Foundations
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-tertiary">Duration</span>
            <span className="text-sm text-text-secondary">~15 min</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-tertiary">Access</span>
            <span className="text-sm text-text-secondary text-right max-w-[60%]">
              Available on your Learn page when your cohort starts
            </span>
          </div>
        </div>
      </div>

      {/* Inspirational quote — clean, minimal */}
      <div className="pt-1">
        <p className="text-sm text-text-secondary italic leading-relaxed">
          "The moment you make a public commitment, you've already changed.
          You've told the world — and yourself — that you're serious."
        </p>
        <p className="text-xs text-text-tertiary mt-2">
          — Dr. Robert Cialdini
        </p>
      </div>

      {/* Share button — ghost/outlined when disabled, solid when ready */}
      <button
        disabled={commitment.length < 10}
        className={`w-full py-3 font-medium text-sm rounded-lg transition-colors cursor-pointer ${
          commitment.length >= 10
            ? 'text-text-primary border border-text-primary/40 hover:bg-bg-hover'
            : 'text-text-disabled border border-neutral-dark/30 cursor-not-allowed'
        }`}
      >
        Share My Commitment
      </button>
    </div>
  );
}
