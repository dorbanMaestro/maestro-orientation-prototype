// QuestionnaireContent — "Tell Us About You" multi-step onboarding questionnaire
// Inspired by Duolingo/Brilliant/Codecademy onboarding flows
// 6 steps: motivation, time commitment, learning style, challenges, past helpers, expectations
// Dark theme, clean Maestro aesthetic — emoji as small left icon, ghost option buttons

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// ─── Step definitions ───────────────────────────────────────────────
const STEPS = [
  {
    key: 'motivation',
    question: 'What brings you to Maestro?',
    helperText: null,
    type: 'single', // single-select
    options: [
      { id: 'career_switch', emoji: '🔄', label: 'Career switch', sub: 'I want to switch into tech/AI' },
      { id: 'upskill', emoji: '📈', label: 'Upskill at work', sub: 'I want to grow in my current role' },
      { id: 'degree', emoji: '🎓', label: 'Degree/certification', sub: 'I need a formal credential' },
      { id: 'curiosity', emoji: '🧠', label: 'Curiosity', sub: 'I want to learn for fun' },
      { id: 'business', emoji: '💼', label: 'Start a business', sub: 'I want to build something of my own' },
    ],
  },
  {
    key: 'time',
    question: 'How much time can you dedicate?',
    helperText: 'Most successful students study 10–15 hrs across 4–5 days',
    type: 'composite', // special layout: hours + days
    hoursOptions: [5, 10, 15, 20, '25+'],
    dayOptions: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    key: 'learningStyle',
    question: 'How do you learn best?',
    helperText: 'Pick all that apply',
    type: 'multi',
    options: [
      { id: 'video', emoji: '🎬', label: 'Video lessons', sub: 'I learn by watching' },
      { id: 'reading', emoji: '📖', label: 'Reading & articles', sub: 'I prefer written content' },
      { id: 'projects', emoji: '🛠️', label: 'Hands-on projects', sub: 'I learn by doing' },
      { id: 'group', emoji: '👥', label: 'Group discussions', sub: 'I learn from peers' },
      { id: 'ai_tutor', emoji: '🤖', label: 'AI tutor / chatbot', sub: 'I like interactive Q&A' },
      { id: 'quizzes', emoji: '📝', label: 'Practice quizzes', sub: 'I learn through testing' },
    ],
  },
  {
    key: 'challenges',
    question: 'Any learning challenges we should know about?',
    helperText: 'This helps us adapt your experience. Your answers are private.',
    type: 'multi',
    options: [
      { id: 'time_mgmt', emoji: '⏱️', label: 'Time management', sub: 'I struggle to stay on schedule' },
      { id: 'adhd', emoji: '🧠', label: 'ADHD / focus issues', sub: 'I find it hard to concentrate for long' },
      { id: 'dyslexia', emoji: '📚', label: 'Dyslexia', sub: 'Reading-heavy content is challenging' },
      { id: 'test_anxiety', emoji: '😰', label: 'Test anxiety', sub: 'Exams and assessments stress me out' },
      { id: 'esl', emoji: '🌍', label: 'English is not my first language', sub: null },
      { id: 'none', emoji: '✅', label: 'None of these apply to me', sub: null },
    ],
  },
  {
    key: 'pastHelpers',
    question: "What's helped you learn in the past?",
    helperText: 'Pick all that apply',
    type: 'multi',
    options: [
      { id: 'buddy', emoji: '👯', label: 'Study buddy / accountability partner', sub: null },
      { id: 'summaries', emoji: '📋', label: 'Summaries & cheat sheets', sub: null },
      { id: 'schedule', emoji: '📅', label: 'Structured daily schedule', sub: null },
      { id: 'goals', emoji: '🎯', label: 'Clear goals & milestones', sub: null },
      { id: 'forums', emoji: '💬', label: 'Asking questions in forums', sub: null },
      { id: 'gamification', emoji: '🏆', label: 'Gamification & rewards', sub: null },
      { id: 'spaced_rep', emoji: '🔁', label: 'Spaced repetition / flashcards', sub: null },
    ],
  },
  {
    key: 'expectations',
    question: 'What do you expect from Maestro?',
    helperText: 'Pick all that apply',
    type: 'multi',
    options: [
      { id: 'degree_cert', emoji: '🎓', label: 'Get a recognized degree/certification', sub: null },
      { id: 'career_services', emoji: '💼', label: 'Career services & job placement', sub: null },
      { id: 'community', emoji: '👥', label: 'A supportive learning community', sub: null },
      { id: 'mentorship', emoji: '🧑‍🏫', label: 'Mentorship from industry experts', sub: null },
      { id: 'ai_learning', emoji: '🤖', label: 'AI-powered personalized learning', sub: null },
      { id: 'progress', emoji: '📊', label: 'Track my progress clearly', sub: null },
      { id: 'self_paced', emoji: '🏃', label: 'Self-paced, flexible schedule', sub: null },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

// ─── Option button (used for both single & multi select) ───────────
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
              ? 'w-6 bg-primary'           // current step — wider, full color
              : i < current
                ? 'w-1.5 bg-primary/50'    // completed — dot, half opacity
                : 'w-1.5 bg-neutral-dark/40' // future — dot, dim
            }
          `}
        />
      ))}
    </div>
  );
}

// ─── Time commitment step (composite layout) ────────────────────────
function TimeStep({ answers, setAnswers }) {
  const { hoursPerWeek, preferredDays } = answers;

  const toggleDay = (day) => {
    const current = preferredDays || [];
    const next = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];
    setAnswers(prev => ({ ...prev, preferredDays: next }));
  };

  return (
    <div className="space-y-6">
      {/* Hours per week */}
      <div>
        <p className="text-sm text-text-secondary mb-3">Hours per week</p>
        <div className="flex gap-2">
          {STEPS[1].hoursOptions.map((hrs) => (
            <button
              key={hrs}
              type="button"
              onClick={() => setAnswers(prev => ({ ...prev, hoursPerWeek: hrs }))}
              className={`
                flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                ${hoursPerWeek === hrs
                  ? 'border-primary/50 bg-primary/5 text-text-primary'
                  : 'border-neutral-dark/30 bg-transparent text-text-secondary hover:border-neutral-dark/50'
                }
              `}
            >
              {hrs}{typeof hrs === 'number' ? 'h' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred days */}
      <div>
        <p className="text-sm text-text-secondary mb-3">Which days work best?</p>
        <div className="flex gap-2">
          {STEPS[1].dayOptions.map((day) => {
            const isActive = (preferredDays || []).includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`
                  flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                  ${isActive
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
      </div>
    </div>
  );
}

// ─── Main QuestionnaireContent component ────────────────────────────
export default function QuestionnaireContent() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    motivation: null,
    hoursPerWeek: null,
    preferredDays: [],
    learningStyle: [],
    challenges: [],
    pastHelpers: [],
    expectations: [],
  });
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

      // Special: "None" clears everything, selecting anything else clears "none"
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

  // ── Can user advance? ──
  const canAdvance = () => {
    if (currentStep.type === 'single') {
      return answers[currentStep.key] != null;
    }
    if (currentStep.type === 'composite') {
      return answers.hoursPerWeek != null; // days are optional
    }
    // multi-select
    return (answers[currentStep.key] || []).length > 0;
  };

  // ── Navigation ──
  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      // Last step — done!
      console.log('Questionnaire completed! Answers:', answers);
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
        <h3 className="text-lg font-semibold text-text-primary">Thank you!</h3>
        <p className="text-sm text-text-secondary max-w-xs mx-auto">
          We'll use your answers to personalize your learning experience.
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

      {/* Helper text */}
      {currentStep.helperText && (
        <p className="text-xs text-text-tertiary -mt-2">
          {currentStep.helperText}
        </p>
      )}

      {/* Options area */}
      {currentStep.type === 'composite' ? (
        <TimeStep answers={answers} setAnswers={setAnswers} />
      ) : (
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

      {/* Navigation row: Back (text) + Next (ghost button) */}
      <div className="flex items-center justify-between pt-2">
        {/* Back button — only visible after step 0 */}
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
          <div /> // spacer
        )}

        {/* Next / Done button */}
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
