import { motion } from 'framer-motion';
import { formatDuration } from '../../data/mockData';

const LessonNode = ({ lesson, onClick }) => {
  const { number, title, topic, duration, status } = lesson;

  // Define styles based on status
  const getNodeStyles = () => {
    const baseStyles = 'relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 focus-ring';

    switch (status) {
      case 'completed':
        return {
          className: `${baseStyles} w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-success to-success-dark border-3 border-success/30 shadow-success hover:border-success hover:shadow-lg hover:scale-105`,
          icon: (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ),
        };

      case 'current':
        return {
          className: `${baseStyles} w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-primary-hover border-4 border-primary shadow-xl hover:scale-105 animate-pulse-glow`,
          icon: (
            <>
              <span className="text-xl sm:text-2xl font-bold text-white">{number}</span>
              <div className="absolute -top-2 sm:-top-3 -right-4 sm:-right-6 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white bg-primary rounded-md shadow-md whitespace-nowrap">
                YOU ARE HERE
                <div className="absolute bottom-[-5px] sm:bottom-[-6px] left-3 sm:left-5 w-0 h-0 border-l-[5px] sm:border-l-[6px] border-l-transparent border-r-[5px] sm:border-r-[6px] border-r-transparent border-t-[5px] sm:border-t-[6px] border-t-primary"></div>
              </div>
            </>
          ),
        };

      case 'available':
        return {
          className: `${baseStyles} w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-bg-elevated border-2 border-neutral-dark opacity-80 hover:border-primary hover:bg-bg-hover hover:opacity-100 hover:shadow-lg hover:scale-105`,
          icon: <span className="text-lg sm:text-xl md:text-2xl font-semibold text-text-tertiary">{number}</span>,
        };

      case 'locked':
        return {
          className: `${baseStyles} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-bg-surface border-2 border-dashed border-neutral-dark opacity-40 cursor-not-allowed hover:animate-[shake_300ms_ease-out]`,
          icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        };

      default:
        return {
          className: baseStyles,
          icon: null,
        };
    }
  };

  const { className, icon } = getNodeStyles();

  const handleClick = () => {
    if (status !== 'locked') {
      onClick(lesson.id);
    }
  };

  return (
    <div className="flex items-center gap-4 group">
      {/* Node Button */}
      <motion.button
        className={className}
        onClick={handleClick}
        disabled={status === 'locked'}
        aria-label={`Lesson ${number}: ${title} - ${status}`}
        aria-current={status === 'current' ? 'step' : undefined}
        whileHover={status !== 'locked' ? { scale: 1.05 } : {}}
        whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
      >
        {icon}
      </motion.button>

      {/* Lesson Info - Shows on hover for desktop, always visible for current */}
      <div className={`flex-1 ${status === 'current' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span>{topic}</span>
          <span>•</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonNode;
