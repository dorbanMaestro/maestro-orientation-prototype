import { motion } from 'framer-motion';
import ProgressRing from '../ProgressRing';
import { formatDateRange } from '../../data/mockData';

const CurrentCourseCard = ({ course, onContinue }) => {
  const { code, name, credits, startDate, endDate, progress } = course;

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-5 sm:p-6 md:p-8 bg-gradient-to-br from-bg-surface to-bg-elevated border border-primary/20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          {code}: {name}
        </h1>
        <p className="text-xs sm:text-sm text-text-tertiary">
          {credits} credits • {formatDateRange(startDate, endDate)}
        </p>
      </div>

      {/* Body with Progress Ring and Continue Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 mb-4 sm:mb-6">
        {/* Progress Ring */}
        <div className="flex-shrink-0">
          <ProgressRing percentage={progress.percentage} size={100} />
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onContinue(progress.currentLessonId)}
          className="w-full sm:flex-1 sm:max-w-xs flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-semibold rounded-md shadow-primary hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-ring"
          aria-label="Continue to current lesson"
        >
          Continue
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-text-secondary">
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {progress.completedLessons}/{progress.totalLessons} lessons
        </span>
        <span className="text-text-tertiary">•</span>
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Next: Lesson {progress.completedLessons + 1}
        </span>
      </div>
    </motion.div>
  );
};

export default CurrentCourseCard;
