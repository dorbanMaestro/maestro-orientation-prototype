// PodPreferencesContent — "Pod Preferences" multi-step questionnaire
// 7 tap-to-select questions about accountability and social preferences
// Used to match students with the right accountability pod
// Follows the same multi-step pattern as QuestionnaireContent

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// ─── Step definitions ───────────────────────────────────────────────
const STEPS = [
  {
    key: 'accountability',
    question: 'How do you want your pod to keep you accountable?',
    type: 'single',
    options: [
      { id: 'daily', emoji: '📅', label: 'Daily check-ins', sub: 'Quick daily updates to stay on track' },
      { id: 'weekly', emoji: '📆', label: 'Weekly updates', sub: 'A weekly recap of progress' },
      { id: 'watching', emoji: '👀', label: 'Just knowing others are watching', sub: 'Passive accountability is enough' },
    ],
  },
  {
    key: 'support',
    question: 'What kind of support do you prefer from study partners?',
    type: 'single',
    options: [
      { id: 'encouragement', emoji: '🎉', label: 'Encouragement and cheerleading', sub: 'Positive vibes and motivation' },
      { id: 'honest_push', emoji: '💪', label: 'Honest push when I slack', sub: 'Direct, no-nonsense nudges' },
      { id: 'mix', emoji: '⚖️', label: 'A mix of both', sub: 'Balance of support and directness' },
    ],
  },
  {
    key: 'social',
    question: 'How social do you want your pod to be?',
    type: 'single',
    options: [
      { id: 'business', emoji: '📚', label: 'All business — focus on coursework', sub: 'Keep it professional and efficient' },
      { id: 'social', emoji: '🎈', label: 'Social — get to know each other', sub: 'Build real friendships along the way' },
      { id: 'mix', emoji: '🤝', label: 'A mix of both', sub: 'Balance of work and fun' },
    ],
  },
  {
    key: 'motivation',
    question: 'What motivates you more?',
    type: 'single',
    options: [
      { id: 'competition', emoji: '🏆', label: 'Friendly competition', sub: 'Leaderboards and challenges push me' },
      { id: 'support', emoji: '❤️', label: 'Mutual support', sub: 'Lifting each other up is my thing' },
    ],
  },
  {
    key: 'video',
    question: 'Would you be open to video calls with your pod?',
    type: 'single',
    options: [
      { id: 'yes', emoji: '📹', label: "Yes, I'd love that", sub: 'Face-to-face builds connection' },
      { id: 'maybe', emoji: '🤔', label: 'Maybe occasionally', sub: "I'm open to it sometimes" },
      { id: 'text_only', emoji: '💬', label: 'I prefer text-only', sub: 'Chat is more comfortable for me' },
    ],
  },
  {
    key: 'language',
    question: 'What language do you prefer communicating in?',
    type: 'single',
    options: [
      { id: 'english', emoji: '🇬🇧', label: 'English', sub: null },
      { id: 'spanish', emoji: '🇪🇸', label: 'Spanish', sub: null },
      { id: 'portuguese', emoji: '🇧🇷', label: 'Portuguese', sub: null },
      { id: 'arabic', emoji: '🇸🇦', label: 'Arabic', sub: null },
      { id: 'other', emoji: '🌍', label: 'Other', sub: null },
    ],
  },
  {
    key: 'life_situation',
    question: 'What best describes your current life situation?',
    type: 'single',
    options: [
      { id: 'full_time', emoji: '💼', label: 'Working full-time', sub: null },
      { id: 'part_time', emoji: '🕐', label: 'Working part-time', sub: null },
      { id: 'student', emoji: '🎓', label: 'Full-time student', sub: null },
      { id: 'parent', emoji: '👨‍👧', label: 'Parent or caregiver', sub: null },
      { id: 'self_employed', emoji: '🚀', label: 'Self-employed or freelancing', sub: null },
      { id: 'other', emoji: '✨', label: 'Other', sub: null },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

// ─── Option button (tap to select) ─────────────────────────────────
function OptionButton({ option, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left cursor-pointer
        ${isSelected
          ? 'border-primary/50 bg-primary/5'
          : 'border-neutral-dark/30 bg-transparent hover:border-neutral-dark/50'
        }
      `}
    >
      {/* Emoji icon on the left */}
      <span className="text-base shrink-0 w-6 text-center">{option.emoji}</span>

      {/* Label + optional subtitle */}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-text-primary">{option.label}</span>
        {option.sub && (
          <span className="block text-xs text-text-tertiary mt-0.5">{option.sub}</span>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <Check size={16} className="text-primary shrink-0" />
      )}
    </button>
  );
}

// ─── Step indicator dots ────────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`
            h-1.5 rounded-full transition-all
            ${i === current
              ? 'w-6 bg-primary'
              : i < current
                ? 'w-1.5 bg-primary/50'
                : 'w-1.5 bg-neutral-dark/40'
            }
          `}
        />
      ))}
    </div>
  );
}

// ─── Main PodPreferencesContent component ───────────────────────────
export default function PodPreferencesContent() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isDone, setIsDone] = useState(false);

  const currentStep = STEPS[step];

  // ── Selection handler (all single-select) ──
  const handleSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentStep.key]: optionId }));
  };

  // ── Can user advance? ──
  const canAdvance = () => {
    return answers[currentStep.key] != null;
  };

  // ── Navigation ──
  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      console.log('Pod preferences completed! Answers:', answers);
      setIsDone(true);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // ── Done state ──
  if (isDone) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto">
          <Check size={28} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Thanks!</h3>
        <p className="text-sm text-text-secondary max-w-xs mx-auto">
          We'll use your preferences to match you with the right pod.
        </p>
      </div>
    );
  }

  // ── Render current step ──
  return (
    <div className="space-y-5">
      {/* Step indicator dots */}
      <StepDots current={step} total={TOTAL_STEPS} />

      {/* Step question */}
      <h3 className="text-lg font-semibold text-text-primary">
        {currentStep.question}
      </h3>

      {/* Options */}
      <div className="space-y-2">
        {currentStep.options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            isSelected={answers[currentStep.key] === opt.id}
            onClick={() => handleSelect(opt.id)}
          />
        ))}
      </div>

      {/* Navigation row: Back + Next */}
      <div className="flex items-center justify-between pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance()}
          className={`
            flex items-center gap-1.5 px-5 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer
            ${canAdvance()
              ? 'border-primary/50 text-primary hover:bg-primary/5'
              : 'border-neutral-dark/20 text-text-tertiary/50 cursor-not-allowed'
            }
          `}
        >
          {step === TOTAL_STEPS - 1 ? (
            <>Done <Check size={15} /></>
          ) : (
            <>Next <ChevronRight size={15} /></>
          )}
        </button>
      </div>
    </div>
  );
}
