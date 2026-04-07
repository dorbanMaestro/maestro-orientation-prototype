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
  // Calculate progress counter from the tasks array
  const completed = tasks.filter(t => t.status === 'completed').length;
  const total = tasks.length;

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

      {/* Task rows — inside the bordered container, with dividers between them */}
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
    </section>
  );
}
