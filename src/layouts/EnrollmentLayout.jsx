// EnrollmentLayout — centered card layout for the enrollment/onboarding wizard
// Full screen dark bg with a centered surface card + step indicator dots

import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

/**
 * Enrollment wizard layout with step indicator.
 * @param {React.ReactNode} children - Step content
 * @param {number} step - Current step (1-based)
 * @param {number} totalSteps - Total number of steps
 */
export default function EnrollmentLayout({
  children,
  step = 1,
  totalSteps = 4,
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6">
      {/* Maestro "M" logo above the card */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <LayoutGrid size={24} className="text-white" />
        </div>
      </div>

      {/* Centered card with fade-in animation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        // "key" forces re-animate when step changes
        key={step}
        className="w-full max-w-lg bg-bg-surface rounded-2xl p-8 border border-border-default"
      >
        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < step;
            const isCurrent = stepNum === step;

            return (
              <div
                key={stepNum}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    isCurrent
                      ? 'w-8 bg-primary'          // Current step: wider + accent color
                      : isCompleted
                        ? 'w-2 bg-primary/60'      // Completed: small + faded accent
                        : 'w-2 bg-bg-hover'        // Upcoming: small + muted
                  }
                `}
              />
            );
          })}
        </div>

        {/* Step content */}
        {children}
      </motion.div>
    </div>
  );
}
