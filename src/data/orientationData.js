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

// 8 orientation tasks from the PRD (updated — no "Invite a Friend")
// steps = number of phases/actions the student does inside this task (drives the progress bar segments)
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
    steps: 3, // navigate different campus areas
  },
  {
    id: 'meet_curriculum',
    number: 2,
    name: 'Meet Your Curriculum',
    goal: 'Understand what you\'ll learn and which skills you\'ll gain',
    duration: 10,
    icon: 'book-open',
    status: 'completed',
    optional: false,
    steps: 3, // program overview, skills, schedule
  },
  {
    id: 'personalize_tutor',
    number: 3,
    name: 'Personalize Your Tutor',
    goal: 'Set up your AI tutor to teach the way you learn best',
    duration: 5,
    icon: 'graduation-cap',
    status: 'in_progress',
    optional: false,
    steps: 8, // 8 tutor preference questions
  },
  {
    id: 'introduce_yourself',
    number: 4,
    name: 'Introduce Yourself',
    goal: 'Post your intro in the cohort discussion',
    duration: 10,
    icon: 'hand-metal',
    status: 'not_started',
    optional: false,
    steps: 1, // post your intro
  },
  {
    id: 'meet_pod',
    number: 5,
    name: 'Meet Your Accountability Pod',
    goal: 'Meet your study partners and send your first message',
    duration: 10,
    icon: 'users',
    status: 'not_started',
    optional: false,
    steps: 2, // meet pod + send first message
  },
  {
    id: 'reflection',
    number: 6,
    name: 'Write Your Pre-Course Reflection',
    goal: 'Set your personal intentions for the term',
    duration: 5,
    icon: 'pen-line',
    status: 'not_started',
    optional: false,
    steps: 1, // write reflection
  },
  {
    id: 'preview_lesson',
    number: 7,
    name: 'Complete a Real Lesson',
    goal: 'Prove to yourself you\'re ready for Day 1',
    duration: 18,
    icon: 'target',
    status: 'not_started',
    optional: false,
    steps: 5, // lesson phases
  },
  {
    id: 'commitment',
    number: 8,
    name: 'Make Your Commitment',
    goal: 'Share your term goal with your pod',
    duration: 5,
    icon: 'user-plus',
    status: 'not_started',
    optional: false,
    steps: 1, // share your goal
  },
];

// Enrollment tasks — shown under the "Enrollment" tab
// steps = number of phases/actions the student does inside this task (drives the progress bar segments)
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
    steps: 1,
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
    steps: 3, // photo, bio, details
  },
  {
    id: 'enroll_questions',
    number: 3,
    name: "Let's Get to Know You",
    goal: 'Answer 5 quick questions so we can personalize your experience',
    duration: 2,
    icon: 'clipboard-list',
    status: 'not_started',
    optional: false,
    modalType: 'questionnaire',
    steps: 5, // 5 questions
  },
  {
    id: 'enroll_roster',
    number: 4,
    name: 'Meet Your Cohort',
    goal: 'Browse classmates joining your program',
    duration: 5,
    icon: 'users-round',
    status: 'not_started',
    optional: false,
    modalType: 'roster',
    steps: 1,
  },
  {
    id: 'enroll_preview',
    number: 5,
    name: 'Preview Orientation Tasks',
    goal: 'See what you\'ll do during orientation week',
    duration: 3,
    icon: 'list-checks',
    status: 'not_started',
    optional: false,
    modalType: 'preview',
    steps: 1,
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

// Accountability pod — 7 members (updated from PRD)
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
    { id: 'student-003', name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 'student-004', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 'student-005', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 'student-006', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 'student-007', name: 'Alex Thompson', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 'student-008', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=16' },
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
