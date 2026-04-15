// OrientationTaskList — The "Weekly goals" section
// RESTRUCTURED: Now shows tasks grouped by 4-week orientation
// - Week title shown as subheader (e.g. "Set Up & Settle In")
// - Locked weeks show a lock message instead of tasks
// - Progress counter shows total across all weeks ("X of 15 tasks complete")

import { CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import WeekTabBar from '../WeekTabBar/WeekTabBar';
import OrientationTaskCard from '../OrientationTaskCard/OrientationTaskCard';

/**
 * Full "Weekly goals" section with bordered container.
 * @param {Array} tasks - Array of task objects FOR THE ACTIVE WEEK only
 * @param {Array} weekTabs - Tab bar data (4 weeks)
 * @param {string} activeTab - Currently selected tab id (e.g. "week-1")
 * @param {object} activeWeekMeta - Metadata for active week { title, startDate, status }
 * @param {function} onTabClick - Tab click handler
 * @param {function} onTaskClick - Task click handler
 * @param {number} totalCompleted - Completed tasks across ALL weeks
 * @param {number} totalRequired - Total required tasks across ALL weeks
 */
export default function OrientationTaskList({
  tasks = [],
  weekTabs = [],
  activeTab,
  activeWeekMeta,
  onTabClick,
  onTaskClick,
  totalCompleted = 0,
  totalRequired = 0,
}) {
  // Is this week locked?
  const isLocked = activeWeekMeta?.status === 'locked';
  // Is this a term week (post Day 1)?
  const isTermWeek = activeWeekMeta?.phase === 'term';

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

        {/* Progress counter — shows total across all 4 weeks */}
        <p className="text-sm text-text-tertiary ml-[30px] mb-5">
          {totalCompleted} of {totalRequired} tasks complete
        </p>

        {/* Tab bar — 4 week tabs */}
        <WeekTabBar tabs={weekTabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>

      {/* Thin separator line */}
      <div className="border-t border-border-default" />

      {/* Week title subheader — shows the theme of this week */}
      {activeWeekMeta && (
        <div className="px-6 pt-4 pb-2">
          <h3 className="text-base font-semibold text-text-primary" style={{ fontFamily: '"Wix Madefor Display", system-ui, sans-serif' }}>
            {activeWeekMeta.title}
          </h3>
        </div>
      )}

      {/* Content: either locked message or task rows */}
      {isLocked ? (
        // Locked week — show message with lock icon
        <div className="px-6 pb-8 pt-4">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center mb-4">
              <Lock size={20} className="text-text-disabled" />
            </div>
            {isTermWeek ? (
              <>
                <p className="text-sm text-text-tertiary font-medium mb-1">
                  Term starts on {activeWeekMeta.startDate}
                </p>
                <p className="text-xs text-text-disabled">
                  Complete your orientation to be ready for Day 1
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-text-tertiary font-medium mb-1">
                  Unlocks on {activeWeekMeta.startDate}
                </p>
                <p className="text-xs text-text-disabled">
                  Complete earlier weeks to get ready
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        // Active week — show task rows
        <div className="px-6 pb-2">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tasks.map((task, index) => (
              <motion.div key={task.id} variants={cardVariants}>
                <OrientationTaskCard task={task} onClick={onTaskClick} />
                {/* Divider between rows (not after last one) */}
                {index < tasks.length - 1 && (
                  <div className="border-t border-border-subtle ml-15" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
