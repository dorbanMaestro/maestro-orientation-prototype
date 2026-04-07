// ReflectionContent — "Write Your Pre-Course Reflection" orientation task
// Matches the Profile page's clean aesthetic:
// - Clean labels above spacious inputs
// - Thin separators between sections
// - Ghost/outlined style for interactive elements
// - No colored backgrounds or card-in-card nesting

import { useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['Morning', 'Afternoon', 'Evening'];

export default function ReflectionContent() {
  const [whyEnrolled, setWhyEnrolled] = useState('');
  const [successVision, setSuccessVision] = useState('');
  // Study schedule state: which days are toggled on, and which time slot is picked
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Toggle a day on/off in the selectedDays array
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header — clean and spacious */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          Pre-Course Reflection
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          Set your intentions before Day 1. This reflection is just for you.
        </p>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Prompt 1: Why did you enroll? (min 50 chars) */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Why did you enroll? Write 2–3 sentences.
        </label>
        <textarea
          value={whyEnrolled}
          onChange={(e) => setWhyEnrolled(e.target.value)}
          placeholder="What motivated you to start this program..."
          rows={3}
          className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-neutral-dark transition-colors resize-none"
        />
        {/* Character counter — warning color when below 50 */}
        <p
          className={`text-xs mt-1 text-right ${
            whyEnrolled.length < 50 ? 'text-warning' : 'text-text-tertiary'
          }`}
        >
          {whyEnrolled.length} / 50 min
        </p>
      </div>

      {/* Thin separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Prompt 2: What does success look like? (min 30 chars) */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          What does success look like for you by the end of this term?
        </label>
        <textarea
          value={successVision}
          onChange={(e) => setSuccessVision(e.target.value)}
          placeholder="Where do you see yourself after completing the program..."
          rows={3}
          className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-neutral-dark transition-colors resize-none"
        />
        {/* Character counter — warning color when below 30 */}
        <p
          className={`text-xs mt-1 text-right ${
            successVision.length < 30 ? 'text-warning' : 'text-text-tertiary'
          }`}
        >
          {successVision.length} / 30 min
        </p>
      </div>

      {/* Thin separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Prompt 3: Study schedule picker (days + time slot) */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          When will you study each week?
        </label>
        <p className="text-xs text-text-tertiary mb-4">
          We'll send you reminders on your selected days.
        </p>

        {/* Day selector — 7 pill buttons, multi-select toggle */}
        <div className="flex flex-wrap gap-2 mb-4">
          {days.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Time slot selector — single-select radio-style pills */}
        <div className="flex gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Motivational quote — clean, no background card */}
      <div className="border-t border-neutral-dark/20 pt-4 text-center">
        <p className="text-xs text-text-tertiary italic">
          "The secret of getting ahead is getting started." — Mark Twain
        </p>
      </div>
    </div>
  );
}
