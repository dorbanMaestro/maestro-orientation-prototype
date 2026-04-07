// MeetCurriculumContent — "Meet Your Curriculum" orientation task
// Full program overview using the same visual language as the Learn page:
// - Program breadcrumb
// - "What you'll know by graduation" outcomes section (NEW)
// - Unit cards connected by dotted lines
// - Preview lesson CTA at the bottom
// - Spacious, clean layout — no nested cards

import { Lock, Sparkles, Play } from 'lucide-react';

// Program-specific graduation outcomes — what students will be able to do
// These should feel aspirational but concrete
const graduationOutcomes = [
  'Build and deploy production-ready ML models',
  'Design neural network architectures from scratch',
  'Master Python for data science and AI',
  'Implement NLP and computer vision solutions',
  'Create an AI portfolio that impresses employers',
  'Understand ethical AI and responsible deployment',
];

// Mock units for the full program
const programUnits = [
  {
    id: 'u1',
    number: 1,
    title: 'Welcome to the AI-powered world',
    lessons: 5,
    iconBg: '#6366F1',
    locked: false,
    current: true,
  },
  {
    id: 'u2',
    number: 2,
    title: 'Talking to machines: prompt engineering 101',
    lessons: 7,
    iconBg: '#3B82F6',
    locked: false,
    current: false,
  },
  {
    id: 'u3',
    number: 3,
    title: 'Data wrangling with Python',
    lessons: 8,
    iconBg: '#10B981',
    locked: false,
    current: false,
  },
  {
    id: 'u4',
    number: 4,
    title: 'Machine learning fundamentals',
    lessons: 9,
    iconBg: '#F59E0B',
    locked: true,
    current: false,
  },
  {
    id: 'u5',
    number: 5,
    title: 'Deep learning & neural networks',
    lessons: 8,
    iconBg: '#374151',
    locked: true,
    current: false,
  },
  {
    id: 'u6',
    number: 6,
    title: 'Capstone: build your AI portfolio',
    lessons: 5,
    iconBg: '#374151',
    locked: true,
    current: false,
  },
];

// SVG icon for each unit — layered diamond shape
function UnitIcon({ bg, locked }) {
  return (
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: locked ? '#374151' : bg }}
    >
      {locked ? (
        <Lock size={18} className="text-text-disabled" />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="12" width="12" height="12" rx="2" transform="rotate(-45 4 12)" fill="white" fillOpacity="0.9" />
          <rect x="7" y="12" width="8" height="8" rx="1.5" transform="rotate(-45 7 12)" fill="white" fillOpacity="0.5" />
        </svg>
      )}
    </div>
  );
}

export default function MeetCurriculumContent() {
  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <p className="text-xs text-text-tertiary">
        AAS in AI Engineering {'>'} Full Program Overview
      </p>

      {/* Program title */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          AAS in AI Engineering
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          16 weeks · 6 units · 42 lessons
        </p>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* NEW: "What you'll know by graduation" outcomes section      */}
      {/* Shows 6 aspirational outcomes with sparkle icons            */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="bg-neutral-dark/30 rounded-xl p-4 space-y-3">
        {/* Section header with sparkle icon */}
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent-primary" />
          <h4 className="text-sm font-medium text-text-primary">
            What you'll know by graduation
          </h4>
        </div>

        {/* Outcomes list — clean, spacious, small text */}
        <ul className="space-y-2 pl-1">
          {graduationOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-2.5">
              {/* Small sparkle/diamond marker — subtle accent color */}
              <span className="text-accent-primary text-xs mt-0.5 shrink-0">
                ✦
              </span>
              <span className="text-sm text-text-secondary leading-snug">
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Separator between outcomes and units list */}
      <div className="border-b border-neutral-dark/20" />

      {/* Units list — connected by dotted lines */}
      <div className="relative pl-6">
        {programUnits.map((unit, index) => {
          const isLast = index === programUnits.length - 1;

          return (
            <div key={unit.id} className="relative">
              {/* Dotted vertical line connector */}
              {!isLast && (
                <div
                  className="absolute left-[18px] top-[56px] w-[2px] h-[24px] border-l-2 border-dotted border-neutral-dark/40"
                />
              )}

              {/* Unit row */}
              <div className={`flex items-center gap-4 py-3 ${unit.locked ? 'opacity-40' : ''}`}>
                {/* Unit icon */}
                <UnitIcon bg={unit.iconBg} locked={unit.locked} />

                {/* Unit label + title + lesson count */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs text-text-tertiary">
                      Unit {unit.number}
                    </p>
                    {unit.current && (
                      <span className="text-[10px] font-medium text-success">
                        Current
                      </span>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${unit.locked ? 'text-text-disabled' : 'text-text-primary'}`}>
                    {unit.title}
                  </p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {unit.lessons} lessons
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* NEW: Preview Lesson CTA                                     */}
      {/* Ghost/outlined button — hints at the 10-min preview unlock  */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="border-t border-neutral-dark/20 pt-4 space-y-3">
        <button
          className="w-full flex items-center justify-center gap-2 py-3 px-4
                     rounded-xl border border-accent-primary/40 text-accent-primary
                     text-sm font-medium hover:bg-accent-primary/10
                     transition-colors duration-200"
          onClick={() => console.log('Preview lesson clicked — would unlock 10-min preview')}
        >
          <Play size={16} />
          Preview a Lesson
        </button>

        {/* Subtle helper text below button */}
        <p className="text-xs text-text-tertiary text-center">
          Try a free 10-minute lesson to see how learning works at Maestro
        </p>
      </div>
    </div>
  );
}
