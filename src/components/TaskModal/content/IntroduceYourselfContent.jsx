// IntroduceYourselfContent — "Introduce Yourself" orientation task
// Two states:
//   1. FORM STATE: Guided 3-prompt intro form at top, existing replies below as context
//   2. POSTED STATE: Success message + 3 recommended student intros to comment on

import { useState } from 'react';
import { Smile, MoreHorizontal, Plus, CheckCircle, MessageCircle } from 'lucide-react';

// The 3 guided prompts for the intro form
const PROMPTS = [
  {
    id: 'location',
    label: 'Where are you based, and what do you do right now?',
    placeholder: 'e.g. Based in Austin, TX — currently a data analyst at a fintech startup',
  },
  {
    id: 'why',
    label: 'Why did you enroll in Maestro?',
    placeholder: 'e.g. I want to transition into AI/ML engineering and build real-world projects',
  },
  {
    id: 'skills',
    label: "What's one skill you could teach someone, and one you want to learn?",
    placeholder: 'e.g. I can teach SQL and data visualization — I want to learn deep learning',
  },
];

// Mock replies — existing discussion posts (shown as context below the form)
const mockReplies = [
  {
    id: 'r1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    color: '#E87B6F',
    timestamp: '15h ago',
    text: "Hi everyone! I'm Sarah, a career switcher from marketing. I've been self-studying Python for 6 months and I'm so excited to go deeper into AI. Can't wait to meet you all and learn together this term!",
    truncated: true,
    reactions: [
      { emoji: '❤️', count: 12 },
      { emoji: '💡', count: 4 },
    ],
    upvotes: 8,
  },
  {
    id: 'r2',
    name: 'Mike Chen',
    initials: 'MC',
    color: '#5B9BD5',
    timestamp: '12h ago',
    text: "Hey folks! Mike here — software dev with 3 years of experience. Looking to specialize in ML and eventually work on autonomous systems. Who else is into robotics?",
    truncated: false,
    reactions: [
      { emoji: '💡', count: 7 },
      { emoji: '👏', count: 3 },
    ],
    upvotes: 5,
  },
  {
    id: 'r3',
    name: 'Emma Davis',
    initials: 'ED',
    color: '#A78BFA',
    timestamp: '8h ago',
    text: "Hello! Fresh grad here, studied statistics in college. My dream is to work on healthcare AI — imagine helping doctors diagnose diseases faster. This cohort is the perfect next step!",
    truncated: true,
    reactions: [
      { emoji: '❤️', count: 9 },
      { emoji: '🔥', count: 2 },
    ],
    upvotes: 6,
  },
];

// 3 recommended intros to comment on (shown after posting)
const recommendedIntros = [
  {
    id: 'rec1',
    name: 'Priya Patel',
    initials: 'PP',
    color: '#F59E0B',
    text: "Hey! I'm Priya from Toronto — product manager at a health-tech company. I enrolled because I want to actually understand the AI my team is building, not just manage it. I can teach product strategy, and I want to learn prompt engineering!",
    commented: false,
  },
  {
    id: 'rec2',
    name: 'James Wright',
    initials: 'JW',
    color: '#10B981',
    text: "What's up everyone! James here, based in London. I'm a mechanical engineer pivoting to software. Maestro's hands-on approach is exactly what I need. I can teach CAD and 3D modeling — looking to learn Python and ML basics.",
    commented: false,
  },
  {
    id: 'rec3',
    name: 'Aisha Okafor',
    initials: 'AO',
    color: '#EC4899',
    text: "Hi all! Aisha from Lagos, Nigeria. I run a small e-commerce business and want to use AI to personalize customer experiences. I can teach digital marketing and growth hacking — I want to learn recommendation systems!",
    commented: false,
  },
];

export default function IntroduceYourselfContent() {
  // Form field values for the 3 prompts
  const [formValues, setFormValues] = useState({
    location: '',
    why: '',
    skills: '',
  });

  // Whether the user has "posted" their intro
  const [hasPosted, setHasPosted] = useState(false);

  // Track which recommended intros the user has "commented" on
  const [commentedIds, setCommentedIds] = useState([]);

  // Update a single form field by its key
  const handleFieldChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  // Check if all 3 fields have content (for enabling the Post button)
  const allFieldsFilled = PROMPTS.every(
    (p) => formValues[p.id].trim().length > 0
  );

  // "Post" the intro (mock — just flips the state)
  const handlePost = () => {
    if (!allFieldsFilled) return;
    console.log('Intro posted:', formValues);
    setHasPosted(true);
  };

  // "Comment" on a recommended intro (mock — just tracks the id)
  const handleComment = (introId) => {
    setCommentedIds((prev) =>
      prev.includes(introId) ? prev : [...prev, introId]
    );
    console.log('Commented on:', introId);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <p className="text-xs text-text-tertiary">
        Discussions / Orientation Week
      </p>

      {/* Week label — olive/green small caps */}
      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-success">
        Orientation Week
      </span>

      {/* Large question title */}
      <h3 className="text-xl font-medium text-text-primary leading-snug">
        Introduce yourself to your cohort
      </h3>

      {/* Description */}
      <p className="text-sm text-text-tertiary leading-relaxed">
        Share your name, background, and what you're most excited to learn.
        Then react to at least 3 classmates' posts to complete this task.
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#7C6FEB' }}
        >
          <span className="text-white text-xs font-semibold">M</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-text-primary">Maestro Team</span>
          <span className="text-text-tertiary">·</span>
          <span className="text-text-tertiary">2 days ago</span>
          <span className="text-text-tertiary">·</span>
          <span className="text-text-tertiary">47 participants</span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* ===== SECTION: Guided Form OR Success State ===== */}
      {!hasPosted ? (
        /* --- FORM STATE: 3-prompt guided form --- */
        <div className="space-y-4">
          {/* Section heading */}
          <p className="text-sm font-medium text-text-secondary">
            Write your introduction
          </p>

          {/* 3 prompt fields */}
          {PROMPTS.map((prompt) => (
            <div key={prompt.id} className="space-y-1.5">
              {/* Label */}
              <label className="block text-xs text-text-tertiary">
                {prompt.label}
              </label>
              {/* Text area */}
              <textarea
                value={formValues[prompt.id]}
                onChange={(e) => handleFieldChange(prompt.id, e.target.value)}
                placeholder={prompt.placeholder}
                rows={2}
                className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary/60 resize-none transition-colors"
              />
            </div>
          ))}

          {/* Post button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handlePost}
              disabled={!allFieldsFilled}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                allFieldsFilled
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-neutral-dark/20 text-text-disabled cursor-not-allowed'
              }`}
            >
              Post Your Intro →
            </button>
          </div>
        </div>
      ) : (
        /* --- POSTED STATE: success + recommended intros to comment on --- */
        <div className="space-y-5">
          {/* Success banner */}
          <div className="flex items-start gap-3 bg-success/10 border border-success/20 rounded-lg px-4 py-3">
            <CheckCircle size={20} className="text-success shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Your introduction has been posted!
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Now comment on 3 other students' intros to complete this task.
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <p className="text-xs text-text-tertiary">
            {commentedIds.length} of 3 comments made
          </p>

          {/* 3 recommended intros */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-text-secondary">
              Recommended intros for you
            </p>

            {recommendedIntros.map((intro) => {
              const isCommented = commentedIds.includes(intro.id);
              return (
                <div
                  key={intro.id}
                  className="border border-neutral-dark/20 rounded-lg px-4 py-3 space-y-2"
                >
                  {/* Author row */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: intro.color }}
                    >
                      <span className="text-white text-[11px] font-semibold">
                        {intro.initials}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      {intro.name}
                    </span>
                  </div>

                  {/* Intro text */}
                  <p className="text-sm text-text-secondary leading-relaxed pl-[42px]">
                    {intro.text}
                  </p>

                  {/* Comment button */}
                  <div className="pl-[42px]">
                    {isCommented ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-success">
                        <CheckCircle size={14} />
                        Commented
                      </span>
                    ) : (
                      <button
                        onClick={() => handleComment(intro.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        Leave a comment
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Separator before existing replies */}
      <div className="border-b border-neutral-dark/20" />

      {/* ===== SECTION: Existing replies (always visible as context) ===== */}
      <p className="text-xs text-text-tertiary">
        {mockReplies.length} replies from your cohort
      </p>

      <div>
        {mockReplies.map((reply, index) => (
          <div
            key={reply.id}
            className={`py-4 ${
              index < mockReplies.length - 1
                ? 'border-b border-neutral-dark/20'
                : ''
            }`}
          >
            {/* Reply layout: content on left, upvote on right */}
            <div className="flex gap-3">
              {/* Avatar + content */}
              <div className="flex-1 min-w-0">
                {/* Author row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: reply.color }}
                    >
                      <span className="text-white text-xs font-semibold">
                        {reply.initials}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-semibold text-text-primary">
                        {reply.name}
                      </span>
                      <span className="text-text-tertiary">·</span>
                      <span className="text-text-tertiary text-xs">
                        {reply.timestamp}
                      </span>
                    </div>
                  </div>

                  <button className="text-text-disabled hover:text-text-tertiary transition-colors cursor-pointer">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Post text */}
                <p className="text-sm text-text-secondary leading-relaxed mb-3 pl-[46px]">
                  {reply.truncated ? (
                    <>
                      {reply.text.slice(0, 120)}...{' '}
                      <button className="text-primary text-sm hover:underline cursor-pointer">
                        See more
                      </button>
                    </>
                  ) : (
                    reply.text
                  )}
                </p>

                {/* Reactions row */}
                <div className="flex items-center gap-2 pl-[46px]">
                  {reply.reactions.map((reaction, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-dark/30 hover:border-neutral-dark/50 transition-colors cursor-pointer text-xs"
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-text-tertiary">
                        {reaction.count}
                      </span>
                    </button>
                  ))}

                  <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-bg-hover transition-colors cursor-pointer">
                    <Smile size={14} className="text-text-disabled" />
                  </button>
                </div>
              </div>

              {/* Upvote */}
              <div className="shrink-0 flex flex-col items-center gap-0.5 pt-10">
                <button className="text-text-disabled hover:text-primary transition-colors cursor-pointer text-sm">
                  ▲
                </button>
                <span className="text-xs text-text-tertiary font-medium">
                  {reply.upvotes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
