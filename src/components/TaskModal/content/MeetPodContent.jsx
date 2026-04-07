// MeetPodContent — "Meet Your Accountability Pod" orientation task
// 3-step flow: (1) View pod members, (2) Send first message, (3) Confirm shared goal
// Clean Maestro aesthetic: no nested cards, thin separators, spacious layout

import { useState } from 'react';
import { mockPod, mockStudent, mockRosterStudents } from '../../../data/orientationData';

// Enrich pod members with bios from roster data
const enrichedMembers = mockPod.members.map((member) => {
  const rosterMatch = mockRosterStudents.find((s) => s.id === member.id);
  return {
    ...member,
    bio: rosterMatch?.bio || 'Excited to learn together!',
  };
});

// Default goal lesson count from mock data
const DEFAULT_LESSON_COUNT = mockPod.week1Goal.targetLessons;

export default function MeetPodContent() {
  // --- State for the 3-step flow ---
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, or 3
  const [chatMessage, setChatMessage] = useState(''); // Step 2: user's first message
  const [messageSent, setMessageSent] = useState(false); // Step 2: tracks if they sent
  const [lessonCount, setLessonCount] = useState(DEFAULT_LESSON_COUNT); // Step 3: editable goal
  const [goalConfirmed, setGoalConfirmed] = useState(false); // Step 3: tracks confirmation

  // Initials helper (same as before)
  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Chat message validation — needs at least 10 characters
  const isMessageValid = chatMessage.trim().length >= 10;

  // Handle sending the chat message
  const handleSendMessage = () => {
    if (!isMessageValid) return;
    console.log('Pod message sent:', chatMessage);
    setMessageSent(true);
  };

  // Handle confirming the shared goal
  const handleConfirmGoal = () => {
    console.log('Goal confirmed:', lessonCount, 'lessons');
    setGoalConfirmed(true);
  };

  // Clamp lesson count between 1 and 20
  const handleLessonCountChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setLessonCount('');
      return;
    }
    setLessonCount(Math.max(1, Math.min(20, val)));
  };

  return (
    <div className="space-y-5">

      {/* ── Step indicator: "Step X of 3" + dots ── */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-tertiary font-medium">
          Step {currentStep} of 3
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === currentStep
                  ? 'w-5 bg-primary'          // active dot — wider + purple
                  : step < currentStep
                  ? 'w-1.5 bg-primary/60'     // completed dot — small + faded purple
                  : 'w-1.5 bg-neutral-dark/30' // upcoming dot — small + gray
              }`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STEP 1: View pod members
         ══════════════════════════════════════════ */}
      {currentStep === 1 && (
        <>
          {/* Pod header */}
          <div>
            <h3 className="text-xl font-medium text-text-primary">
              Your Accountability Pod
            </h3>
            <p className="text-sm text-text-tertiary mt-1">
              5 members &middot; matched by timezone &amp; program
            </p>
          </div>

          <div className="border-b border-neutral-dark/20" />

          {/* Pod members list */}
          <div>
            {/* Current student (you) */}
            <div className="flex items-center gap-4 py-4 border-b border-neutral-dark/20">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#7C6FEB' }}
              >
                <span className="text-white text-sm font-semibold">
                  {getInitials(mockStudent.fullName)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {mockStudent.fullName}
                  </span>
                  <span className="text-[10px] font-medium text-primary">You</span>
                </div>
                <p className="text-xs text-text-tertiary mt-0.5 truncate">
                  Ready to start this journey!
                </p>
              </div>
            </div>

            {/* Other pod members */}
            {enrichedMembers.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center gap-4 py-4 ${
                  index < enrichedMembers.length - 1
                    ? 'border-b border-neutral-dark/20'
                    : ''
                }`}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#7C6FEB' }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-text-primary">
                    {member.name}
                  </span>
                  <p className="text-xs text-text-tertiary mt-0.5 truncate">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Continue
          </button>
        </>
      )}

      {/* ══════════════════════════════════════════
          STEP 2: Pod chat — send first message
         ══════════════════════════════════════════ */}
      {currentStep === 2 && (
        <>
          <div>
            <h3 className="text-xl font-medium text-text-primary">
              Say Hi to Your Pod
            </h3>
            <p className="text-sm text-text-tertiary mt-1">
              Send your first message to break the ice.
            </p>
          </div>

          <div className="border-b border-neutral-dark/20" />

          {/* Mock chat area */}
          <div className="space-y-3">
            {/* System welcome message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-dark/20 flex items-center justify-center shrink-0">
                <span className="text-xs text-text-tertiary">M</span>
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-text-tertiary">Maestro Bot</span>
                <p className="text-sm text-text-secondary mt-0.5">
                  Welcome to your pod chat! Say hi to your pod mates.
                </p>
              </div>
            </div>

            {/* If message was sent, show it in the chat */}
            {messageSent && (
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#7C6FEB' }}
                >
                  <span className="text-white text-[10px] font-semibold">
                    {getInitials(mockStudent.fullName)}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-primary">You</span>
                  <p className="text-sm text-text-primary mt-0.5">{chatMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Message input (hidden after sending) */}
          {!messageSent ? (
            <div className="space-y-2">
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your first message..."
                rows={3}
                className="w-full px-3 py-2.5 text-sm text-text-primary bg-transparent border border-neutral-dark/40 rounded-lg resize-none placeholder:text-text-tertiary focus:outline-none focus:border-primary transition-colors"
              />
              {/* Character counter */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs ${
                    chatMessage.trim().length > 0 && !isMessageValid
                      ? 'text-red-400'
                      : 'text-text-tertiary'
                  }`}
                >
                  {chatMessage.trim().length}/10 min characters
                </span>
                <button
                  onClick={handleSendMessage}
                  disabled={!isMessageValid}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isMessageValid
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-neutral-dark/20 text-text-tertiary cursor-not-allowed'
                  }`}
                >
                  Send Message
                </button>
              </div>
            </div>
          ) : (
            /* Continue to Step 3 after sending */
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Continue
            </button>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════
          STEP 3: Confirm or edit shared Week 1 goal
         ══════════════════════════════════════════ */}
      {currentStep === 3 && (
        <>
          <div>
            <h3 className="text-xl font-medium text-text-primary">
              Set Your Shared Goal
            </h3>
            <p className="text-sm text-text-tertiary mt-1">
              Confirm or adjust your pod's Week 1 target.
            </p>
          </div>

          <div className="border-b border-neutral-dark/20" />

          {/* Editable goal */}
          {!goalConfirmed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary">Complete</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={lessonCount}
                  onChange={handleLessonCountChange}
                  className="w-16 px-2 py-1.5 text-sm text-center text-text-primary bg-transparent border border-neutral-dark/40 rounded-lg focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-sm text-text-secondary">lessons together in Week 1</span>
              </div>

              <p className="text-xs text-text-tertiary">
                Work together, hold each other accountable, and celebrate wins.
              </p>

              <button
                onClick={handleConfirmGoal}
                className="w-full py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Confirm Goal
              </button>
            </div>
          ) : (
            /* Confirmed state */
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Complete {lessonCount} lessons together in Week 1
                </span>
              </div>
              <p className="text-xs text-green-400/80">
                Goal confirmed! You're all set.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Back button (steps 2 & 3 only) ── */}
      {currentStep > 1 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="w-full py-2 text-xs font-medium text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
        >
          &larr; Back
        </button>
      )}
    </div>
  );
}
