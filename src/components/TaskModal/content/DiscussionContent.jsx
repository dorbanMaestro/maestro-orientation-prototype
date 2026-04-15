// DiscussionContent — Reusable discussion component for orientation weeks
// Supports 3 discussion types via the `discussionType` prop:
//   - "expectations" (Week 2): What are you hoping to get out of this program?
//   - "fears" (Week 3): What are you most nervous about?
//   - "friends" (Week 4): Who have you connected with so far?
// Pattern: prompt + textarea + mock community posts + Post button

import { useState } from 'react';
import { CheckCircle, MessageCircle, MoreHorizontal, Smile } from 'lucide-react';

// ─── Discussion type configurations ─────────────────────────────────
const DISCUSSION_CONFIG = {
  expectations: {
    weekLabel: 'Week 2',
    title: 'Share Your Expectations',
    prompt: 'What are you most hoping to get out of this program? What does success look like for you?',
    placeholder: 'e.g. I want to build real AI projects and land a job in ML engineering within a year...',
    mockPosts: [
      {
        id: 'exp1',
        name: 'Sarah Johnson',
        initials: 'SJ',
        color: '#E87B6F',
        timestamp: '6h ago',
        text: "I'm hoping to gain practical skills I can use right away at work. Success for me means being able to build and deploy a machine learning model by the end of the term.",
        reactions: [{ emoji: '❤️', count: 8 }, { emoji: '💡', count: 3 }],
        upvotes: 5,
      },
      {
        id: 'exp2',
        name: 'Mike Chen',
        initials: 'MC',
        color: '#5B9BD5',
        timestamp: '4h ago',
        text: "For me, success is switching careers. I want to leave my current job and work in AI full-time. This program is my bridge to get there.",
        reactions: [{ emoji: '🔥', count: 11 }, { emoji: '💪', count: 6 }],
        upvotes: 9,
      },
      {
        id: 'exp3',
        name: 'Priya Patel',
        initials: 'PP',
        color: '#F59E0B',
        timestamp: '2h ago',
        text: "I just want to understand the AI my team is building. I'm a PM and I'm tired of nodding along in technical meetings. By the end, I want to actually contribute to architecture discussions.",
        reactions: [{ emoji: '👏', count: 5 }, { emoji: '💡', count: 7 }],
        upvotes: 7,
      },
    ],
  },
  fears: {
    weekLabel: 'Week 3',
    title: 'Share Your Fears',
    prompt: "What are you most nervous about as you start this program? What worries keep coming up?",
    placeholder: "e.g. I'm worried about falling behind because I'm working full-time and have kids...",
    mockPosts: [
      {
        id: 'fear1',
        name: 'Emma Davis',
        initials: 'ED',
        color: '#A78BFA',
        timestamp: '8h ago',
        text: "Honestly, I'm terrified of the math. I haven't done calculus since college and I hear ML is heavy on linear algebra. Anyone else feeling this way?",
        reactions: [{ emoji: '🫂', count: 14 }, { emoji: '❤️', count: 6 }],
        upvotes: 11,
      },
      {
        id: 'fear2',
        name: 'James Wilson',
        initials: 'JW',
        color: '#10B981',
        timestamp: '5h ago',
        text: "My biggest fear is imposter syndrome. Everyone seems so experienced already. I keep thinking I'm the only one starting from scratch.",
        reactions: [{ emoji: '🫂', count: 18 }, { emoji: '💪', count: 9 }],
        upvotes: 15,
      },
      {
        id: 'fear3',
        name: 'Maria Garcia',
        initials: 'MG',
        color: '#EC4899',
        timestamp: '3h ago',
        text: "Time management is my worry. I'm a single parent working full-time. I'm scared I won't be able to keep up with the pace. But I'm determined to try!",
        reactions: [{ emoji: '❤️', count: 12 }, { emoji: '💪', count: 8 }],
        upvotes: 10,
      },
    ],
  },
  friends: {
    weekLabel: 'Week 4',
    title: 'Making Friends',
    prompt: "Who have you connected with so far? Tag someone you'd like to study with or stay in touch with during the program.",
    placeholder: "e.g. I've been chatting with @Sarah and @Mike — we have a study group on Wednesdays...",
    mockPosts: [
      {
        id: 'friend1',
        name: 'Alex Thompson',
        initials: 'AT',
        color: '#6366F1',
        timestamp: '10h ago',
        text: "Shoutout to @Mike Chen and @Emma Davis — we started a study group and it's been amazing. We meet every Wednesday at 7pm EST. Anyone is welcome to join!",
        reactions: [{ emoji: '🎉', count: 9 }, { emoji: '❤️', count: 7 }],
        upvotes: 8,
      },
      {
        id: 'friend2',
        name: 'Sarah Johnson',
        initials: 'SJ',
        color: '#E87B6F',
        timestamp: '7h ago',
        text: "My pod has been incredible! @Priya Patel — you're the best accountability partner ever. We've been keeping each other on track every single day.",
        reactions: [{ emoji: '❤️', count: 13 }, { emoji: '🔥', count: 4 }],
        upvotes: 11,
      },
      {
        id: 'friend3',
        name: 'Priya Patel',
        initials: 'PP',
        color: '#F59E0B',
        timestamp: '4h ago',
        text: "Aww @Sarah! Right back at you! Also want to tag @James Wilson — your explanations in the discussion forum have helped me so much. You should be a TA!",
        reactions: [{ emoji: '👏', count: 7 }, { emoji: '❤️', count: 5 }],
        upvotes: 6,
      },
    ],
  },
};

// ─── Main component ─────────────────────────────────────────────────
export default function DiscussionContent({ discussionType = 'expectations' }) {
  const config = DISCUSSION_CONFIG[discussionType] || DISCUSSION_CONFIG.expectations;

  const [postText, setPostText] = useState('');
  const [hasPosted, setHasPosted] = useState(false);

  const canPost = postText.trim().length >= 20;

  const handlePost = () => {
    if (!canPost) return;
    console.log(`Discussion post (${discussionType}):`, postText);
    setHasPosted(true);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <p className="text-xs text-text-tertiary">
        Discussions / {config.weekLabel}
      </p>

      {/* Week label */}
      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-success">
        {config.weekLabel}
      </span>

      {/* Title */}
      <h3 className="text-xl font-medium text-text-primary leading-snug">
        {config.title}
      </h3>

      {/* Prompt */}
      <p className="text-sm text-text-tertiary leading-relaxed">
        {config.prompt}
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
          <span className="text-text-tertiary">{config.mockPosts.length + 12} participants</span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* ===== Post form or success state ===== */}
      {!hasPosted ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-text-secondary">
            Share your thoughts
          </p>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={config.placeholder}
            rows={4}
            className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary/60 resize-none transition-colors"
          />
          <div className="flex items-center justify-between">
            <span className={`text-xs ${postText.trim().length > 0 && !canPost ? 'text-warning' : 'text-text-tertiary'}`}>
              {postText.trim().length}/20 min characters
            </span>
            <button
              onClick={handlePost}
              disabled={!canPost}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                canPost
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-neutral-dark/20 text-text-disabled cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 bg-success/10 border border-success/20 rounded-lg px-4 py-3">
          <CheckCircle size={20} className="text-success shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              Your response has been posted!
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Check back to see what your classmates shared.
            </p>
          </div>
        </div>
      )}

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* ===== Existing community posts ===== */}
      <p className="text-xs text-text-tertiary">
        {config.mockPosts.length} replies from your cohort
      </p>

      <div>
        {config.mockPosts.map((post, index) => (
          <div
            key={post.id}
            className={`py-4 ${index < config.mockPosts.length - 1 ? 'border-b border-neutral-dark/20' : ''}`}
          >
            <div className="flex gap-3">
              <div className="flex-1 min-w-0">
                {/* Author row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: post.color }}
                    >
                      <span className="text-white text-xs font-semibold">{post.initials}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-semibold text-text-primary">{post.name}</span>
                      <span className="text-text-tertiary">·</span>
                      <span className="text-text-tertiary text-xs">{post.timestamp}</span>
                    </div>
                  </div>
                  <button className="text-text-disabled hover:text-text-tertiary transition-colors cursor-pointer">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Post text */}
                <p className="text-sm text-text-secondary leading-relaxed mb-3 pl-[46px]">
                  {post.text}
                </p>

                {/* Reactions */}
                <div className="flex items-center gap-2 pl-[46px]">
                  {post.reactions.map((reaction, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-dark/30 hover:border-neutral-dark/50 transition-colors cursor-pointer text-xs"
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-text-tertiary">{reaction.count}</span>
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
                <span className="text-xs text-text-tertiary font-medium">{post.upvotes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
