import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LessonNode from '../LessonNode';

const ConnectionLine = ({ status }) => {
  const getLineStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'current':
        return 'bg-gradient-to-b from-success to-primary';
      case 'locked':
        return 'bg-[repeating-linear-gradient(to_bottom,#374151_0px,#374151_5px,transparent_5px,transparent_10px)]';
      default:
        return 'bg-neutral-dark';
    }
  };

  return (
    <div className={`w-[3px] h-20 mx-auto transition-all duration-300 ${getLineStyles()}`} />
  );
};

const LearningPath = ({ lessons, onLessonClick }) => {
  const currentLessonRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to current lesson on mount
    if (currentLessonRef.current) {
      setTimeout(() => {
        currentLessonRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 600); // Delay to allow animations to start
    }
  }, []);

  return (
    <motion.div
      className="max-w-2xl mx-auto py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Your Learning Path
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      {/* Lessons with Connection Lines */}
      <div className="space-y-0" role="list" aria-label="Course lessons">
        {lessons.map((lesson, index) => {
          const isLast = index === lessons.length - 1;
          const nextLesson = lessons[index + 1];

          // Determine connection line status
          let lineStatus = 'locked';
          if (lesson.status === 'completed') {
            lineStatus = 'completed';
          } else if (lesson.status === 'current') {
            lineStatus = 'current';
          } else if (lesson.status === 'available' && nextLesson?.status !== 'locked') {
            lineStatus = 'available';
          }

          return (
            <div key={lesson.id} role="listitem">
              {/* Lesson Node */}
              <div
                ref={lesson.status === 'current' ? currentLessonRef : null}
                id={`lesson-${lesson.number}`}
              >
                <LessonNode lesson={lesson} onClick={onLessonClick} />
              </div>

              {/* Connection Line (not after last lesson) */}
              {!isLast && <ConnectionLine status={lineStatus} />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LearningPath;
