// PreviewLessonContent — "Complete a Real Lesson" orientation task
// Matches the Maestro Learn page lesson detail view:
// - Breadcrumb
// - "Orientation Preview" badge — signals this is non-graded
// - Lesson label in gray above title
// - Large video area with play button
// - Key takeaways with simple checkmarks
// - Start Lesson button + 25 MP reward callout
// - Completion state: celebratory message + MP earned

import { useState } from 'react';
import { Play, Check, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';

// Key takeaways shown in the lesson preview
const takeaways = [
  'Understand what AI engineering is and why it matters today',
  'Learn the difference between AI, ML, and deep learning',
  'See real-world applications across industries',
  "Get a preview of the tools you'll master in this program",
];

export default function PreviewLessonContent() {
  // Track whether the student has "completed" the lesson
  // false = lesson preview view, true = completion/celebration view
  const [completed, setCompleted] = useState(false);

  // ──────────────────────────────────────────────
  // COMPLETION STATE — shown after clicking "Start Lesson"
  // Celebratory screen with the PRD's required message
  // ──────────────────────────────────────────────
  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
        {/* Big checkmark with a glowing ring */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-success/20 animate-ping" />
          {/* Solid icon circle */}
          <div className="relative w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle size={44} className="text-success" />
          </div>
        </div>

        {/* Main celebration message — straight from the PRD */}
        <div className="space-y-2 max-w-xs">
          <h3 className="text-xl font-semibold text-text-primary leading-snug">
            Lesson Complete!
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            You just did what Day 1 students do.{' '}
            <span className="text-text-primary font-medium">You're ready.</span>
          </p>
        </div>

        {/* +25 MP reward badge — gold accent with sparkle */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2.5">
          <Sparkles size={18} className="text-amber-400" />
          <span className="text-base font-semibold text-amber-400">
            +25 Mastery Points
          </span>
        </div>

        {/* Back to Tasks button */}
        <button
          onClick={() => setCompleted(false)}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-text-primary border border-neutral-dark/40 rounded-lg hover:border-neutral-dark hover:bg-bg-hover transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Tasks
        </button>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // LESSON PREVIEW STATE — the default view
  // ──────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Orientation Preview badge — subtle pill at the top */}
      {/* Signals this lesson is non-graded and part of orientation */}
      <div className="inline-flex items-center gap-1.5 border border-primary/30 rounded-full px-3 py-1">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-xs text-primary font-medium">
          Orientation Preview
        </span>
        <span className="text-xs text-text-tertiary">
          · Does not count toward grades
        </span>
      </div>

      {/* Breadcrumb */}
      <p className="text-xs text-text-tertiary">
        AI101 {'>'} Unit 1 {'>'} Lesson 1
      </p>

      {/* Lesson label in gray above the title */}
      <div>
        <p className="text-xs text-text-tertiary mb-1">Lesson 1 · 12 min</p>
        <h3 className="text-xl font-medium text-text-primary leading-snug">
          Introduction to AI & Machine Learning
        </h3>
      </div>

      {/* Video placeholder — dark area with centered play button */}
      <div className="relative bg-bg-elevated rounded-lg aspect-video flex items-center justify-center overflow-hidden cursor-pointer group">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-surface to-bg-primary" />

        {/* Play button — circular, large */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors">
          <Play size={28} className="text-white ml-1" fill="currentColor" />
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 z-10 text-[11px] font-medium text-text-primary bg-black/60 px-2 py-1 rounded">
          12:34
        </span>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Key takeaways — clean list with subtle checkmarks */}
      <div>
        <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-3">
          What you'll learn
        </p>
        <div className="space-y-3">
          {takeaways.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border border-neutral-dark/40 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-text-tertiary" />
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start Lesson button — triggers the completion state */}
      <button
        onClick={() => setCompleted(true)}
        className="w-full py-3 text-sm font-medium text-text-primary border border-neutral-dark/40 rounded-lg hover:border-neutral-dark hover:bg-bg-hover transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        Start Lesson
        <span className="text-text-tertiary">→</span>
      </button>

      {/* Mastery Points reward callout — shows what the student will earn */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 bg-primary/10 border border-primary/20 rounded-lg">
        <Sparkles size={14} className="text-primary" />
        <span className="text-xs font-medium text-primary">
          Earn 25 Mastery Points
        </span>
        <span className="text-xs text-text-tertiary">
          — your first MP reward
        </span>
      </div>
    </div>
  );
}
