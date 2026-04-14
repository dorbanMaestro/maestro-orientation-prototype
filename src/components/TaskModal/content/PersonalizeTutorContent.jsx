// PersonalizeTutorContent — "Personalize Your Tutor" orientation task
// 8 tap-to-select questions about learning preferences
// At the end, shows a generated tutor profile paragraph + editable textarea
// Dark theme, same patterns as QuestionnaireContent

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

// ---- Question definitions ----
const QUESTIONS = [
  {
    key: 'learn_best',
    question: 'How do you learn best?',
    type: 'single',
    options: [
      { id: 'examples', label: 'Show me real-world examples' },
      { id: 'theory', label: 'Explain the theory first, then practice' },
      { id: 'doing', label: 'Let me try it and learn from mistakes' },
      { id: 'steps', label: 'Walk me through step-by-step' },
    ],
  },
  {
    key: 'when_stuck',
    question: "When you're stuck, what helps most?",
    type: 'single',
    options: [
      { id: 'hint', label: 'A small hint to nudge me forward' },
      { id: 'analogy', label: 'An analogy or comparison to something I know' },
      { id: 'solution', label: 'Show me the full solution and explain it' },
      { id: 'question', label: 'Ask me a guiding question' },
    ],
  },
  {
    key: 'detail_level',
    question: 'How detailed should explanations be?',
    type: 'single',
    options: [
      { id: 'brief', label: 'Brief and to the point' },
      { id: 'moderate', label: 'Moderate detail with key concepts' },
      { id: 'thorough', label: 'Thorough and in-depth' },
    ],
  },
  {
    key: 'tone',
    question: 'What tone do you prefer?',
    type: 'single',
    options: [
      { id: 'encouraging', label: 'Warm and encouraging' },
      { id: 'direct', label: 'Direct and no-nonsense' },
      { id: 'casual', label: 'Casual and conversational' },
      { id: 'academic', label: 'Professional and academic' },
    ],
  },
  {
    key: 'wrong_response',
    question: 'When you get something wrong, how should the tutor respond?',
    type: 'single',
    options: [
      { id: 'gentle', label: 'Gently point out the mistake and guide me' },
      { id: 'challenge', label: 'Challenge me to find the error myself' },
      { id: 'explain', label: 'Explain what went wrong and why' },
    ],
  },
  {
    key: 'english_primary',
    question: 'Is English your primary language?',
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    // If "No", show follow-up about comfort level
    followUp: {
      trigger: 'no',
      question: 'How comfortable are you with English?',
      options: [
        { id: 'fluent', label: 'Fluent — no issues' },
        { id: 'good', label: 'Good — occasional tricky words' },
        { id: 'developing', label: 'Developing — simpler language helps' },
      ],
    },
  },
  {
    key: 'background',
    question: "What's your background with AI Engineering?",
    type: 'single',
    options: [
      { id: 'none', label: 'Complete beginner — never tried it' },
      { id: 'dabbled', label: 'Dabbled a bit — used ChatGPT or similar' },
      { id: 'some', label: 'Some experience — taken a course or two' },
      { id: 'experienced', label: 'Experienced — worked with AI professionally' },
    ],
  },
  {
    key: 'current_role',
    question: "What's your current role or field?",
    type: 'freetext',
    placeholder: 'e.g. Marketing Manager, Software Developer, Student...',
  },
];

const TOTAL_QUESTIONS = QUESTIONS.length;

// ---- Option pill button ----
function OptionPill({ label, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer
        ${isSelected
          ? 'border-primary/50 bg-primary/8 text-text-primary'
          : 'border-neutral-dark/30 bg-bg-elevated text-text-secondary hover:border-neutral-dark/50 hover:bg-bg-hover'
        }
      `}
    >
      <span className="text-sm font-medium flex items-center justify-between">
        {label}
        {isSelected && <Check size={16} className="text-primary shrink-0 ml-2" />}
      </span>
    </button>
  );
}

// ---- Progress bar ----
function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="mb-5">
      <p className="text-xs text-text-tertiary mb-2">Question {current + 1} of {total}</p>
      <div className="h-1.5 bg-neutral-dark/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ---- Generate a tutor profile paragraph from answers ----
function generateTutorProfile(answers) {
  // Build a readable paragraph based on selections
  const parts = [];

  // Tone
  const toneMap = {
    encouraging: 'warm and encouraging',
    direct: 'direct and concise',
    casual: 'casual and friendly',
    academic: 'professional and thorough',
  };
  if (answers.tone) {
    parts.push(`Your AI tutor will communicate in a ${toneMap[answers.tone] || answers.tone} style.`);
  }

  // Learning style
  const learnMap = {
    examples: 'It will prioritize real-world examples to illustrate concepts.',
    theory: 'It will explain the theory first before diving into practice.',
    doing: 'It will encourage hands-on experimentation and learning from mistakes.',
    steps: 'It will guide you through concepts step-by-step.',
  };
  if (answers.learn_best) {
    parts.push(learnMap[answers.learn_best] || '');
  }

  // Detail level
  const detailMap = {
    brief: 'Explanations will be brief and focused on key takeaways.',
    moderate: 'Explanations will be balanced -- covering key concepts without overwhelming detail.',
    thorough: 'Explanations will be thorough and in-depth, leaving no stone unturned.',
  };
  if (answers.detail_level) {
    parts.push(detailMap[answers.detail_level] || '');
  }

  // When stuck
  const stuckMap = {
    hint: 'When you get stuck, it will give you a small nudge to keep you moving.',
    analogy: 'When you get stuck, it will use analogies and comparisons to help you connect the dots.',
    solution: 'When you get stuck, it will walk you through the full solution with explanations.',
    question: 'When you get stuck, it will ask you guiding questions to help you figure it out yourself.',
  };
  if (answers.when_stuck) {
    parts.push(stuckMap[answers.when_stuck] || '');
  }

  // Wrong response
  const wrongMap = {
    gentle: 'Mistakes will be handled gently, with guidance toward the right answer.',
    challenge: 'When you make a mistake, it will challenge you to find the error yourself.',
    explain: 'When you make a mistake, it will clearly explain what went wrong and why.',
  };
  if (answers.wrong_response) {
    parts.push(wrongMap[answers.wrong_response] || '');
  }

  // Language
  if (answers.english_comfort === 'developing') {
    parts.push('It will use simpler language and check for understanding frequently.');
  }

  // Background
  const bgMap = {
    none: 'Since you\'re a complete beginner, it will start from the fundamentals and build up gradually.',
    dabbled: 'Since you\'ve dabbled with AI tools, it will build on what you already know.',
    some: 'Given your existing coursework, it will move at a moderate pace and fill in gaps.',
    experienced: 'Given your professional experience, it will focus on deepening and refining your knowledge.',
  };
  if (answers.background) {
    parts.push(bgMap[answers.background] || '');
  }

  return parts.join(' ') || 'Complete the questions above to generate your tutor profile.';
}

// ---- Main component ----
export default function PersonalizeTutorContent() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  // Track whether the follow-up for "english_primary" is showing
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [profileText, setProfileText] = useState('');

  const currentQ = QUESTIONS[step];

  // Handle selecting an option
  const handleSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQ.key]: optionId }));

    // Check for follow-up (english_primary -> "no" shows comfort level)
    if (currentQ.followUp && optionId === currentQ.followUp.trigger) {
      setShowFollowUp(true);
    } else if (currentQ.followUp) {
      setShowFollowUp(false);
    }
  };

  const handleFollowUpSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, english_comfort: optionId }));
  };

  const handleFreetextChange = (e) => {
    setAnswers(prev => ({ ...prev, [currentQ.key]: e.target.value }));
  };

  // Can advance?
  const canAdvance = () => {
    if (currentQ.type === 'freetext') {
      return (answers[currentQ.key] || '').trim().length > 0;
    }
    if (showFollowUp && currentQ.followUp) {
      return answers[currentQ.key] != null && answers.english_comfort != null;
    }
    return answers[currentQ.key] != null;
  };

  // Navigation
  const goNext = () => {
    if (step < TOTAL_QUESTIONS - 1) {
      setStep(step + 1);
      setShowFollowUp(false);
    } else {
      // Done — generate profile
      console.log('Personalize Tutor answers:', answers);
      const profile = generateTutorProfile(answers);
      setProfileText(profile);
      setIsDone(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setShowFollowUp(false);
    }
  };

  // ---- Done state: show generated tutor profile ----
  if (isDone) {
    return (
      <div className="space-y-5">
        {/* Success header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <Sparkles size={28} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Your Tutor Profile</h3>
          <p className="text-xs text-text-tertiary">
            Here's how your AI tutor will work with you. Feel free to edit it!
          </p>
        </div>

        {/* Generated profile — editable textarea */}
        <textarea
          value={profileText}
          onChange={(e) => setProfileText(e.target.value)}
          rows={7}
          className="w-full bg-bg-elevated border border-neutral-dark/30 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:border-primary/50 transition-colors"
          placeholder="Your tutor profile will appear here..."
        />

        {/* Tip */}
        <p className="text-xs text-text-tertiary text-center">
          You can update these preferences anytime in Settings.
        </p>
      </div>
    );
  }

  // ---- Render current question ----
  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <ProgressBar current={step} total={TOTAL_QUESTIONS} />

      {/* Question text */}
      <h3 className="text-lg font-semibold text-text-primary">
        {currentQ.question}
      </h3>

      {/* Options or freetext input */}
      {currentQ.type === 'freetext' ? (
        <input
          type="text"
          value={answers[currentQ.key] || ''}
          onChange={handleFreetextChange}
          placeholder={currentQ.placeholder}
          className="w-full bg-bg-elevated border border-neutral-dark/30 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
        />
      ) : (
        <div className="space-y-2">
          {currentQ.options.map((opt) => (
            <OptionPill
              key={opt.id}
              label={opt.label}
              isSelected={answers[currentQ.key] === opt.id}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>
      )}

      {/* Follow-up question (e.g. English comfort level) */}
      {showFollowUp && currentQ.followUp && (
        <div className="space-y-3 pt-2 border-t border-neutral-dark/20">
          <h4 className="text-sm font-medium text-text-secondary">
            {currentQ.followUp.question}
          </h4>
          <div className="space-y-2">
            {currentQ.followUp.options.map((opt) => (
              <OptionPill
                key={opt.id}
                label={opt.label}
                isSelected={answers.english_comfort === opt.id}
                onClick={() => handleFollowUpSelect(opt.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation: Back + Next */}
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
          {step === TOTAL_QUESTIONS - 1 ? (
            <>Generate Profile <Sparkles size={15} /></>
          ) : (
            <>Next <ChevronRight size={15} /></>
          )}
        </button>
      </div>
    </div>
  );
}
