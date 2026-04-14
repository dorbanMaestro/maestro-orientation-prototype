// MeetPodContent — "Meet Your Accountability Pod" orientation task
// 2-step flow: (1) View pod members, (2) Send first message
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

export default function MeetPodContent() {
  // --- State for the 2-step flow ---
  const [currentStep, setCurrentStep] = useState(1); // 1 or 2
  const [chatMessage, setChatMessage] = useState(''); // Step 2: user's first message
  const [messageSent, setMessageSent] = useState(false); // Step 2: tracks if they sent

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

  return (
    <div className="space-y-5">

      {/* ── Step indicator: "Step X of 2" + dots ── */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-tertiary font-medium">
          Step {currentStep} of 2
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2].map((step) => (
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
            /* Message sent — task complete */
            <div className="text-center py-2">
              <p className="text-sm text-green-400 font-medium">Message sent! You're all set.</p>
            </div>
          )}
        </>
      )}

      {/* ── Back button (step 2 only) ── */}
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
