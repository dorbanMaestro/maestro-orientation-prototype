// OrientationTaskList — The "Weekly goals" section
// Matches Maestro production:
// - Bordered container (subtle 1px border, same style as Up Next card)
// - Section header inside: icon + "Weekly goals" text (white, semibold)
// - Progress counter showing "X of Y tasks complete"
// - Tab bar below the header
// - Task rows inside (no individual card borders)
// - Divider lines between task rows

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import WeekTabBar from '../WeekTabBar/WeekTabBar';
import OrientationTaskCard from '../OrientationTaskCard/OrientationTaskCard';

/**
 * Full "Weekly goals" section with bordered container.
 * @param {Array} tasks - Array of task objects
 * @param {Array} weekTabs - Tab bar data
 * @param {string} activeTab - Currently selected tab id
 * @param {function} onTabClick - Tab click handler
 * @param {function} onTaskClick - Task click handler
 */
export default function OrientationTaskList({
  tasks = [],
  weekTabs = [],
  activeTab,
  onTabClick,
  onTaskClick,
}) {
  // Split tasks into regular and bonus (optional) — production shows these separately
  const regularTasks = tasks.filter(t => !t.optional);
  const bonusTasks = tasks.filter(t => t.optional);

  // Calculate progress counter from regular tasks only
  const completed = regularTasks.filter(t => t.status === 'completed').length;
  const total = regularTasks.length;

  // Total bonus points available
  const bonusPointsTotal = bonusTasks.length * 8;
  const allBonusCompleted = bonusTasks.length > 0 && bonusTasks.every(t => t.status === 'completed');

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <section className="border border-border-default rounded-2xl bg-bg-surface">
      {/* Section header: icon + "Weekly goals" + progress counter */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <CheckCircle2 size={18} className="text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary" style={{ fontFamily: '"Wix Madefor Display", system-ui, sans-serif' }}>Weekly goals</h2>
        </div>

        {/* Progress counter — subtle gray text below the header */}
        <p className="text-sm text-text-tertiary ml-[30px] mb-5">
          {completed} of {total} tasks complete
        </p>

        {/* Tab bar */}
        <WeekTabBar tabs={weekTabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>

      {/* Thin separator line */}
      <div className="border-t border-border-default" />

      {/* Regular task rows */}
      <div className="px-6 pb-2">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {regularTasks.map((task, index) => (
            <motion.div key={task.id} variants={cardVariants}>
              <OrientationTaskCard task={task} onClick={onTaskClick} />
              {/* Divider between rows (not after last one) */}
              {index < regularTasks.length - 1 && (
                <div className="border-t border-border-subtle ml-15" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bonus section — dashed divider with centered "Bonus" label (production pattern) */}
      {bonusTasks.length > 0 && (
        <div className="px-6 pb-2">
          {/* Dashed divider with "Bonus" label */}
          <div className="relative my-3">
            <div className="border-t border-dashed border-border-default" />
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-bg-surface px-3 text-xs font-medium text-text-tertiary">
              Bonus
            </span>
          </div>

          {/* Bonus task rows */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {bonusTasks.map((task, index) => (
              <motion.div key={task.id} variants={cardVariants}>
                <OrientationTaskCard task={task} onClick={onTaskClick} />
                {index < bonusTasks.length - 1 && (
                  <div className="border-t border-border-subtle ml-15" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* "Complete all to unlock" locked row (if bonus tasks not all done) */}
          {!allBonusCompleted && bonusTasks.length > 0 && (
            <div className="flex items-center justify-center gap-2 py-3 mt-1 rounded-lg bg-bg-elevated/50 text-text-tertiary text-sm">
              <span>Complete all to unlock</span>
              <span className="text-warning font-medium">+{bonusPointsTotal} &#x25C6;</span>
            </div>
          )}
        </div>
      )}

    </section>
  );
}
