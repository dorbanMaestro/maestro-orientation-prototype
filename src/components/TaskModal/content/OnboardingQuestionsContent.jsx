// OnboardingQuestionsContent — "Onboarding Questions" multi-step questionnaire
// 7 questions about goals, study habits, concerns, and confidence
// Different from enrollment QuestionnaireContent (which has 5 motivation/time/challenges questions)
// Follows the same multi-step pattern with step dots and Back/Next nav

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// ─── Step definitions ───────────────────────────────────────────────
const STEPS = [
  {
    key: 'goal',
    question: "What's your #1 goal for this degree?",
    type: 'single',
    options: [
      { id: 'career_change', emoji: '🔄', label: 'Career change', sub: 'Move into a new field entirely' },
      { id: 'promotion', emoji: '📈', label: 'Promotion', sub: 'Advance in my current career' },
      { id: 'new_skills', emoji: '🛠️', label: 'Learn new skills', sub: 'Add specific skills to my toolkit' },
      { id: 'personal_growth', emoji: '🌱', label: 'Personal growth', sub: 'Challenge myself and grow' },
      { id: 'other', emoji: '✨', label: 'Other', sub: null },
    ],
  },
  {
    key: 'hours',
    question: 'How many hours per week can you realistically dedicate?',
    type: 'single',
    options: [
      { id: '5_10', emoji: '🕐', label: '5–10 hours', sub: 'A few sessions per week' },
      { id: '10_15', emoji: '🕑', label: '10–15 hours', sub: 'Steady daily commitment' },
      { id: '15_20', emoji: '🕒', label: '15–20 hours', sub: 'Serious daily study blocks' },
      { id: '20_plus', emoji: '🕓', label: '20+ hours', sub: 'Full commitment mode' },
    ],
  },
  {
    key: 'days',
    question: 'Which days work best for studying?',
    helperText: 'Pick all that apply',
    type: 'days', // special multi-select day picker
    dayOptions: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    key: 'time_of_day',
    question: 'What time of day do you prefer to study?',
    type: 'single',
    options: [
      { id: 'morning', emoji: '🌅', label: 'Morning', sub: 'Early bird gets the worm' },
      { id: 'afternoon', emoji: '☀️', label: 'Afternoon', sub: 'Midday focus sessions' },
      { id: 'evening', emoji: '🌆', label: 'Evening', sub: 'After work/dinner wind-down' },
      { id: 'late_night', emoji: '🌙', label: 'Late night', sub: 'Night owl study sessions' },
    ],
  },
  {
    key: 'concern',
    question: "What's your biggest concern about starting?",
    type: 'single',
    options: [
      { id: 'pace', emoji: '⏱️', label: 'Keeping up with the pace', sub: "Worried the program moves too fast" },
      { id: 'balance', emoji: '⚖️', label: 'Balancing with work/family', sub: 'Time management is my worry' },
      { id: 'material', emoji: '📚', label: 'Understanding the material', sub: 'Some topics seem really hard' },
      { id: 'motivation', emoji: '🔋', label: 'Staying motivated', sub: 'Worried about losing steam' },
      { id: 'alone', emoji: '🫂', label: 'Feeling alone', sub: "Worried I won't connect with others" },
      { id: 'other', emoji: '💭', label: 'Other', sub: null },
    ],
  },
  {
    key: 'learning_needs',
    question: 'Do you have any learning needs we should know about?',
    helperText: 'This helps us adapt your experience. Your answers are private.',
    type: 'multi',
    options: [
      { id: 'adhd', emoji: '🧠', label: 'ADHD / focus issues', sub: null },
      { id: 'dyslexia', emoji: '📖', label: 'Dyslexia', sub: null },
      { id: 'visual_hearing', emoji: '👁️', label: 'Visual / hearing needs', sub: null },
      { id: 'none', emoji: '✅', label: 'None', sub: null },
    ],
    // After this step, show a reassurance message before advancing
    showReassurance: true,
  },
  {
    key: 'confidence',
    question: 'How confident are you feeling about starting?',
    type: 'scale', // visual emoji scale 1-5
    scaleOptions: [
      { value: 1, emoji: '😰', label: 'Very nervous' },
      { value: 2, emoji: '😟', label: 'A bit worried' },
      { value: 3, emoji: '😊', label: 'Cautiously optimistic' },
      { value: 4, emoji: '😄', label: 'Feeling good' },
      { value: 5, emoji: '🤩', label: 'Super excited' },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

// ─── Option button ──────────────────────────────────────────────────
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
      <span className="text-base shrink-0 w-6 text-center">{option.emoji}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-text-primary">{option.label}</span>
        {option.sub && (
          <span className="block text-xs text-text-tertiary mt-0.5">{option.sub}</span>
        )}
      </div>
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

// ─── Confidence scale (emoji faces) ─────────────────────────────────
function ConfidenceScale({ value, onChange }) {
  const options = STEPS[6].scaleOptions;
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`
              flex-1 flex flex-col items-center gap-2 py-4 rounded-lg border transition-all cursor-pointer
              ${value === opt.value
                ? 'border-primary/50 bg-primary/5'
                : 'border-neutral-dark/30 bg-transparent hover:border-neutral-dark/50'
              }
            `}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-[10px] text-text-tertiary text-center leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main OnboardingQuestionsContent component ──────────────────────
export default function OnboardingQuestionsContent() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: null,
    hours: null,
    days: [],
    time_of_day: null,
    concern: null,
    learning_needs: [],
    confidence: null,
  });
  const [showReassurance, setShowReassurance] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const currentStep = STEPS[step];

  // ── Selection handlers ──
  const handleSingleSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentStep.key]: optionId }));
  };

  const handleMultiSelect = (optionId) => {
    const key = currentStep.key;
    setAnswers(prev => {
      const current = prev[key] || [];
      if (optionId === 'none') {
        return { ...prev, [key]: current.includes('none') ? [] : ['none'] };
      }
      const withoutNone = current.filter(id => id !== 'none');
      const next = withoutNone.includes(optionId)
        ? withoutNone.filter(id => id !== optionId)
        : [...withoutNone, optionId];
      return { ...prev, [key]: next };
    });
  };

  const toggleDay = (day) => {
    setAnswers(prev => {
      const current = prev.days || [];
      const next = current.includes(day)
        ? current.filter(d => d !== day)
        : [...current, day];
      return { ...prev, days: next };
    });
  };

  // ── Can user advance? ──
  const canAdvance = () => {
    if (currentStep.type === 'single') return answers[currentStep.key] != null;
    if (currentStep.type === 'multi') return (answers[currentStep.key] || []).length > 0;
    if (currentStep.type === 'days') return (answers.days || []).length > 0;
    if (currentStep.type === 'scale') return answers[currentStep.key] != null;
    return false;
  };

  // ── Navigation ──
  const goNext = () => {
    // Show reassurance after learning_needs step before advancing
    if (currentStep.showReassurance && !showReassurance) {
      setShowReassurance(true);
      return;
    }

    if (showReassurance) {
      setShowReassurance(false);
    }

    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      console.log('Onboarding questions completed! Answers:', answers);
      setIsDone(true);
    }
  };

  const goBack = () => {
    if (showReassurance) {
      setShowReassurance(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  // ── Done state (summary screen) ──
  if (isDone) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto">
          <Check size={28} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">All set!</h3>
        <p className="text-sm text-text-secondary max-w-xs mx-auto">
          We'll use your answers to personalize your experience.
        </p>
        <p className="text-xs text-text-tertiary max-w-xs mx-auto">
          You can update these anytime in My Account.
        </p>
      </div>
    );
  }

  // ── Reassurance screen (after learning needs) ──
  if (showReassurance) {
    return (
      <div className="space-y-5">
        <StepDots current={step} total={TOTAL_STEPS} />

        <div className="text-center py-6 space-y-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-2xl">💜</span>
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Thank you for sharing
          </h3>
          <p className="text-sm text-text-secondary max-w-xs mx-auto">
            This helps us support you better. Everything you shared is kept private and used only to improve your learning experience.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer border-primary/50 text-primary hover:bg-primary/5"
          >
            Continue <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // ── Render current step ──
  return (
    <div className="space-y-5">
      <StepDots current={step} total={TOTAL_STEPS} />

      <h3 className="text-lg font-semibold text-text-primary">
        {currentStep.question}
      </h3>

      {currentStep.helperText && (
        <p className="text-xs text-text-tertiary -mt-2">
          {currentStep.helperText}
        </p>
      )}

      {/* Render based on step type */}
      {currentStep.type === 'days' ? (
        // Day picker (multi-select pill buttons)
        <div className="flex flex-wrap gap-2">
          {currentStep.dayOptions.map((day) => {
            const isSelected = (answers.days || []).includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`
                  px-5 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                  ${isSelected
                    ? 'border-primary/50 bg-primary/5 text-text-primary'
                    : 'border-neutral-dark/30 bg-transparent text-text-secondary hover:border-neutral-dark/50'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      ) : currentStep.type === 'scale' ? (
        // Confidence scale (emoji faces)
        <ConfidenceScale
          value={answers.confidence}
          onChange={(val) => setAnswers(prev => ({ ...prev, confidence: val }))}
        />
      ) : (
        // Standard option buttons (single or multi select)
        <div className="space-y-2">
          {currentStep.options.map((opt) => {
            const isSelected = currentStep.type === 'single'
              ? answers[currentStep.key] === opt.id
              : (answers[currentStep.key] || []).includes(opt.id);
            return (
              <OptionButton
                key={opt.id}
                option={opt}
                isSelected={isSelected}
                onClick={() =>
                  currentStep.type === 'single'
                    ? handleSingleSelect(opt.id)
                    : handleMultiSelect(opt.id)
                }
              />
            );
          })}
        </div>
      )}

      {/* Navigation row */}
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
