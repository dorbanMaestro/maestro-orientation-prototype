// Mock data for Pre-Cohort Orientation Week prototype

// The student who is using the app
export const mockStudent = {
  id: 'student-001',
  name: 'Ricky',
  fullName: 'Ricky Martinez',
  email: 'ricky.martinez@email.com',
  program: 'AI Engineering',
  timezone: 'America/New_York',
  avatar: null, // no photo yet — will show initials
  points: 250,
  enrollmentDate: '2026-03-15',
};

// The cohort this student belongs to
export const mockCohort = {
  id: 'cohort-apr-2026',
  name: 'April 2026',
  program: 'AI Engineering',
  startDate: '2026-04-07',
  orientationStartDate: '2026-03-31', // 7 days before cohort start
  studentCount: 847,
};

// 8 orientation tasks from the PRD
export const mockOrientationTasks = [
  {
    id: 'explore_campus',
    number: 1,
    name: 'Explore Your Campus',
    goal: 'Know where everything lives before Day 1',
    duration: 10,
    icon: 'compass',
    status: 'completed',
    optional: false,
  },
  {
    id: 'meet_curriculum',
    number: 2,
    name: 'Meet Your Curriculum',
    goal: 'See what you\'ll learn and get a first taste',
    duration: 10,
    icon: 'book-open',
    status: 'completed',
    optional: false,
  },
  {
    id: 'introduce_yourself',
    number: 3,
    name: 'Introduce Yourself',
    goal: 'Post your intro and connect with 3 classmates',
    duration: 15,
    icon: 'hand-metal',
    status: 'in_progress',
    optional: false,
  },
  {
    id: 'meet_pod',
    number: 4,
    name: 'Meet Your Accountability Pod',
    goal: 'Meet your study partners and set your first shared goal',
    duration: 10,
    icon: 'users',
    status: 'not_started',
    optional: false,
  },
  {
    id: 'reflection',
    number: 5,
    name: 'Write Your Pre-Course Reflection',
    goal: 'Set your intentions and build your study schedule',
    duration: 10,
    icon: 'pen-line',
    status: 'not_started',
    optional: false,
  },
  {
    id: 'preview_lesson',
    number: 6,
    name: 'Complete a Real Lesson',
    goal: 'Prove to yourself you\'re ready for Day 1',
    duration: 18,
    icon: 'graduation-cap',
    status: 'not_started',
    optional: false,
  },
  {
    id: 'commitment',
    number: 7,
    name: 'Make Your Commitment',
    goal: 'Declare your term goal to your cohort',
    duration: 5,
    icon: 'target',
    status: 'not_started',
    optional: false,
  },
  {
    id: 'invite_friend',
    number: 8,
    name: 'Invite a Friend',
    goal: 'Bring a peer into your cohort',
    duration: 5,
    icon: 'user-plus',
    status: 'not_started',
    optional: true,
  },
];

// Enrollment tasks — shown under the "Enrollment" tab
// (questionnaire removed per PRD update — renumbered 1-4)
export const mockEnrollmentTasks = [
  {
    id: 'enroll_welcome',
    number: 1,
    name: 'Welcome & Get Started',
    goal: 'See your cohort info and get excited',
    duration: 2,
    icon: 'party',
    status: 'completed',
    optional: false,
    modalType: 'welcome',
  },
  {
    id: 'enroll_profile',
    number: 2,
    name: 'Complete Your Profile',
    goal: 'Add your photo and bio so classmates can find you',
    duration: 5,
    icon: 'user-circle',
    status: 'in_progress',
    optional: false,
    modalType: 'profile',
  },
  {
    id: 'enroll_roster',
    number: 3,
    name: 'Meet Your Cohort',
    goal: 'Browse classmates joining your program',
    duration: 5,
    icon: 'users-round',
    status: 'not_started',
    optional: false,
    modalType: 'roster',
  },
  {
    id: 'enroll_preview',
    number: 4,
    name: 'Preview Orientation Tasks',
    goal: 'See what you\'ll do during orientation week',
    duration: 3,
    icon: 'list-checks',
    status: 'not_started',
    optional: false,
    modalType: 'preview',
  },
];

// Week tabs — Enrollment first, then Orientation, then locked weeks
export const mockWeekTabs = [
  { id: 'enrollment', label: 'Enrollment', status: 'in_progress' },
  { id: 'orientation', label: 'Orientation', status: 'not_started' },
  { id: 'week-1', label: 'Week 1', status: 'locked' },
  { id: 'week-2', label: 'Week 2', status: 'locked' },
  { id: 'week-3', label: 'Week 3', status: 'locked' },
  { id: 'week-4', label: 'Week 4', status: 'locked' },
  { id: 'week-5', label: 'Week 5', status: 'locked' },
];

// Mock students for the cohort roster
export const mockRosterStudents = [
  {
    id: 'student-002',
    name: 'Sarah Johnson',
    bio: 'Career switcher from marketing. Excited to learn AI!',
    program: 'AI Engineering',
    timezone: 'America/New_York',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'student-003',
    name: 'Mike Chen',
    bio: 'Software developer looking to specialize in ML.',
    program: 'AI Engineering',
    timezone: 'America/Los_Angeles',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'student-004',
    name: 'Emma Davis',
    bio: 'Fresh grad, passionate about data science.',
    program: 'AI Engineering',
    timezone: 'America/Chicago',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'student-005',
    name: 'James Wilson',
    bio: 'Product manager transitioning into AI development.',
    program: 'AI Engineering',
    timezone: 'America/New_York',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'student-006',
    name: 'Priya Patel',
    bio: 'Biotech researcher exploring AI applications.',
    program: 'AI Engineering',
    timezone: 'America/Denver',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'student-007',
    name: 'Alex Thompson',
    bio: 'Self-taught coder ready for the next level.',
    program: 'AI Engineering',
    timezone: 'America/New_York',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
];

// Accountability pod for Task 4
export const mockPod = {
  podId: 'pod-apr26-001',
  program: 'AI Engineering',
  timezone: 'America/New_York',
  week1Goal: {
    targetLessons: 8,
    label: 'Complete 8 lessons together in Week 1',
  },
  members: [
    { id: 'student-002', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'student-004', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 'student-005', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 'student-007', name: 'Alex Thompson', avatar: 'https://i.pravatar.cc/150?img=11' },
  ],
};

// Helper: get the next uncompleted task
export const getNextTask = (tasks) => {
  return tasks.find(t => t.status === 'not_started' || t.status === 'in_progress');
};

// Helper: count completed tasks (excluding optional)
export const getCompletedCount = (tasks) => {
  return tasks.filter(t => t.status === 'completed' && !t.optional).length;
};

// Helper: total required tasks
export const getTotalRequired = (tasks) => {
  return tasks.filter(t => !t.optional).length;
};

// Helper: format date nicely
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper: days until a date
export const daysUntil = (dateStr) => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};
