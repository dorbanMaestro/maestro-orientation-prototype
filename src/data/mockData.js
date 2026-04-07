// Mock data for Maestro Learning Path MVP

export const mockCourse = {
  id: 'py101',
  code: 'PY101',
  name: 'Introduction to Python Programming',
  credits: 4,
  startDate: '2026-01-05',
  endDate: '2026-02-02',
  progress: {
    percentage: 25,
    completedLessons: 3,
    totalLessons: 12,
    currentLessonId: 'lesson-4',
  },
};

export const mockLessons = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'Variables & Data Types',
    topic: 'Python Basics',
    duration: 30,
    status: 'completed',
    completedAt: '2026-01-06T10:30:00Z',
    unlockedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Operators & Expressions',
    topic: 'Python Basics',
    duration: 35,
    status: 'completed',
    completedAt: '2026-01-06T14:20:00Z',
    unlockedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Control Flow',
    topic: 'Python Basics',
    duration: 40,
    status: 'completed',
    completedAt: '2026-01-07T09:15:00Z',
    unlockedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Functions',
    topic: 'Functions & Modules',
    duration: 45,
    status: 'current',
    unlockedAt: '2026-01-07T09:15:00Z',
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Loops & Iteration',
    topic: 'Functions & Modules',
    duration: 50,
    status: 'available',
    unlockedAt: '2026-01-07T09:15:00Z',
  },
  {
    id: 'lesson-6',
    number: 6,
    title: 'Lists & Tuples',
    topic: 'Data Structures',
    duration: 40,
    status: 'available',
    unlockedAt: '2026-01-07T09:15:00Z',
  },
  {
    id: 'lesson-7',
    number: 7,
    title: 'Dictionaries & Sets',
    topic: 'Data Structures',
    duration: 45,
    status: 'locked',
  },
  {
    id: 'lesson-8',
    number: 8,
    title: 'File Handling',
    topic: 'Advanced Topics',
    duration: 50,
    status: 'locked',
  },
  {
    id: 'lesson-9',
    number: 9,
    title: 'Error Handling',
    topic: 'Advanced Topics',
    duration: 40,
    status: 'locked',
  },
  {
    id: 'lesson-10',
    number: 10,
    title: 'Object-Oriented Programming',
    topic: 'OOP Fundamentals',
    duration: 60,
    status: 'locked',
  },
  {
    id: 'lesson-11',
    number: 11,
    title: 'Modules & Packages',
    topic: 'OOP Fundamentals',
    duration: 45,
    status: 'locked',
  },
  {
    id: 'lesson-12',
    number: 12,
    title: 'Final Project',
    topic: 'Capstone',
    duration: 90,
    status: 'locked',
  },
];

export const mockMilestones = [
  {
    id: 'milestone-1',
    title: 'Course Complete!',
    position: 12,
    type: 'course_completion',
    icon: '🎉',
  },
];

export const mockProgressStats = {
  dailyGoal: {
    target: 1,
    completed: 1,
    lastUpdated: '2026-01-07',
  },
  streak: {
    current: 3,
    longest: 5,
    lastActivity: '2026-01-07',
  },
  totalXP: 120,
};

// Helper function to get current lesson
export const getCurrentLesson = () => {
  return mockLessons.find(lesson => lesson.status === 'current');
};

// Helper function to get upcoming lessons
export const getUpcomingLessons = (count = 2) => {
  return mockLessons
    .filter(lesson => lesson.status === 'available')
    .slice(0, count);
};

// Helper function to format date range
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  const end = new Date(endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return `${start} - ${end}`;
};

// Helper function to format duration
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};
