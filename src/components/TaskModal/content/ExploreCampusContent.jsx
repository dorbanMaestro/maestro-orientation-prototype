// ExploreCampusContent — "Explore Your Campus" orientation task
// Matches Maestro production Learn page:
// - Breadcrumb at top
// - Unit header: elevated dark card with purple square icon + unit label + title
// - Lessons connected by dotted vertical center line
// - Large circular icons (48px) per lesson, different colors
// - "Lesson N" label in gray above title
// - Locked lessons dimmed
// - Unit 2 separator with dashed line + centered label

import { Play, Lock } from 'lucide-react';

// Mock lessons for Unit 1
const unit1Lessons = [
  {
    id: 'l1',
    number: 1,
    title: 'What is AI? A 10,000-foot view',
    iconBg: '#6366F1',
    iconShape: 'diamond', // blue circle with diamond
    locked: false,
  },
  {
    id: 'l2',
    number: 2,
    title: 'The AI landscape: tools, models, and workflows',
    iconBg: '#3B82F6',
    iconShape: 'puzzle',
    locked: false,
  },
  {
    id: 'l3',
    number: 3,
    title: 'Your first conversation with ChatGPT',
    iconBg: '#6B7280',
    iconShape: 'play',
    locked: false,
  },
  {
    id: 'l4',
    number: 4,
    title: 'Prompt engineering basics',
    iconBg: '#374151',
    iconShape: 'grid',
    locked: true,
  },
  {
    id: 'l5',
    number: 5,
    title: 'Building your first AI workflow',
    iconBg: '#374151',
    iconShape: 'grid',
    locked: true,
  },
];

// SVG icon shapes for each lesson type
function LessonIcon({ shape, locked }) {
  const color = locked ? '#6B7280' : '#FFFFFF';

  if (shape === 'diamond') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="10" width="10" height="10" rx="1.5" transform="rotate(-45 3 10)" fill={color} fillOpacity={locked ? 0.4 : 0.9} />
        <rect x="6" y="10" width="6" height="6" rx="1" transform="rotate(-45 6 10)" fill={color} fillOpacity={locked ? 0.2 : 0.6} />
      </svg>
    );
  }
  if (shape === 'puzzle') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill={color} fillOpacity={locked ? 0.4 : 0.9} />
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill={color} fillOpacity={locked ? 0.3 : 0.6} />
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill={color} fillOpacity={locked ? 0.3 : 0.6} />
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill={color} fillOpacity={locked ? 0.2 : 0.4} />
      </svg>
    );
  }
  if (shape === 'play') {
    return <Play size={18} className={locked ? 'text-text-disabled' : 'text-white'} fill="currentColor" />;
  }
  if (shape === 'grid') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" fill={color} fillOpacity={locked ? 0.3 : 0.7} />
        <rect x="11" y="1" width="6" height="6" rx="1" fill={color} fillOpacity={locked ? 0.2 : 0.5} />
        <rect x="1" y="11" width="6" height="6" rx="1" fill={color} fillOpacity={locked ? 0.2 : 0.5} />
        <rect x="11" y="11" width="6" height="6" rx="1" fill={color} fillOpacity={locked ? 0.15 : 0.3} />
      </svg>
    );
  }
  return null;
}

export default function ExploreCampusContent() {
  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <p className="text-xs text-text-tertiary">
        AAS in AI Engineering {'>'} AI101 | Welcome to the AI-powered world
      </p>

      {/* Unit 1 header card — elevated dark card */}
      <div className="bg-bg-elevated rounded-lg p-5 flex items-center gap-4">
        {/* Purple square icon with layered diamonds */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#6366F1' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="12" width="12" height="12" rx="2" transform="rotate(-45 4 12)" fill="white" fillOpacity="0.9" />
            <rect x="7" y="12" width="8" height="8" rx="1.5" transform="rotate(-45 7 12)" fill="white" fillOpacity="0.5" />
          </svg>
        </div>

        <div>
          <p className="text-xs text-text-tertiary mb-1">Unit 1</p>
          <h3 className="text-lg font-medium text-text-primary">
            Welcome to the AI-powered world
          </h3>
        </div>
      </div>

      {/* Lessons with dotted vertical connector */}
      <div className="relative pl-6">
        {unit1Lessons.map((lesson, index) => {
          const isLast = index === unit1Lessons.length - 1;

          return (
            <div key={lesson.id} className="relative">
              {/* Dotted vertical line connector */}
              {!isLast && (
                <div
                  className="absolute left-[18px] top-[52px] w-[2px] h-[28px] border-l-2 border-dotted border-neutral-dark/40"
                />
              )}

              {/* Lesson row */}
              <div className={`flex items-center gap-4 py-3 ${lesson.locked ? 'opacity-50' : ''}`}>
                {/* Large circular icon (48px) */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: lesson.iconBg }}
                >
                  {lesson.locked ? (
                    <Lock size={18} className="text-text-disabled" />
                  ) : (
                    <LessonIcon shape={lesson.iconShape} locked={lesson.locked} />
                  )}
                </div>

                {/* Lesson label + title */}
                <div>
                  <p className="text-xs text-text-tertiary mb-0.5">
                    Lesson {lesson.number}
                  </p>
                  <p className={`text-sm font-medium ${lesson.locked ? 'text-text-disabled' : 'text-text-primary'}`}>
                    {lesson.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unit 2 separator — dashed line with centered label */}
      <div className="relative flex items-center py-4">
        <div className="flex-1 border-t border-dashed border-neutral-dark/40" />
        <div className="px-4">
          <p className="text-xs text-text-tertiary whitespace-nowrap">
            <span className="font-medium">Unit 2</span>
            {'  '}Talking to machines: prompt engineering 101
          </p>
        </div>
        <div className="flex-1 border-t border-dashed border-neutral-dark/40" />
      </div>

      {/* Footer hint */}
      <p className="text-xs text-text-tertiary text-center">
        Browse all 6 units in your campus
      </p>
    </div>
  );
}
