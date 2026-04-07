import { useState } from 'react';
import CurrentCourseCard from '../components/CurrentCourseCard';
import LearningPath from '../components/LearningPath';
import { mockCourse, mockLessons } from '../data/mockData';

const HomePage = () => {
  const [course] = useState(mockCourse);
  const [lessons] = useState(mockLessons);

  const handleContinue = (lessonId) => {
    console.log('Continue to lesson:', lessonId);
    // In a real app, this would navigate to the lesson page
    alert(`Navigating to lesson ${lessonId}`);
  };

  const handleLessonClick = (lessonId) => {
    console.log('Clicked lesson:', lessonId);
    // In a real app, this would navigate to the lesson page
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && lesson.status !== 'locked') {
      alert(`Opening lesson: ${lesson.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-surface border-b border-neutral-dark/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">M</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-text-primary">Maestro</h1>
                <p className="text-xs text-text-tertiary hidden sm:block">Learning Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1 sm:gap-2 text-text-secondary">
                <span className="text-xl sm:text-2xl">🔥</span>
                <span className="text-sm sm:text-base font-semibold">3</span>
                <span className="hidden sm:inline">day streak</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-text-secondary">
                <span className="text-lg sm:text-xl">⚡</span>
                <span className="text-sm sm:text-base font-semibold">120</span>
                <span className="hidden sm:inline">XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Course Card */}
        <div className="mb-8">
          <CurrentCourseCard course={course} onContinue={handleContinue} />
        </div>

        {/* Quick Stats Bar */}
        <div className="max-w-2xl mx-auto mb-4 flex items-center gap-4 text-sm text-text-secondary">
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
            {course.progress.completedLessons}/{course.progress.totalLessons} lessons
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            Next: Lesson {course.progress.completedLessons + 1}
          </span>
        </div>

        {/* Learning Path */}
        <LearningPath lessons={lessons} onLessonClick={handleLessonClick} />
      </main>

      {/* Footer */}
      <footer className="bg-bg-surface border-t border-neutral-dark/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-text-tertiary">
            Maestro Learning Path MVP • Built with React + Tailwind CSS + Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
