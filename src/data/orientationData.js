// Mock data for Pre-Cohort Orientation prototype
// RESTRUCTURED: 4-week orientation (was flat 8-task list)

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
  startDate: '2026-04-28', // Day 1 of classes (after 4-week orientation)
  orientationStartDate: '2026-03-31', // Week 1 begins on enrollment
  studentCount: 847,
};

// ──────────────────────────────────────────────────
// 4-Week Orientation Tasks
// Each task has a `week` property (1-4) and a `number` within its week
// ──────────────────────────────────────────────────

export const mockOrientationTasks = [
  // ── Week 1 — Set Up & Settle In ──
  {
    id: 'first_login',
    week: 1,
    number: 1,
    name: 'First Login',
    goal: 'Welcome to your cohort',
    duration: 0,
    icon: 'log-in',
    status: 'completed', // auto-complete
    optional: false,
    steps: 1,
  },
  {
    id: 'complete_profile',
    week: 1,
    number: 2,
    name: 'Complete Your Profile',
    goal: 'Let your classmates know who you are',
    duration: 3,
    icon: 'user-circle',
    status: 'completed',
    optional: false,
    steps: 3,
  },
  {
    id: 'explore_campus',
    week: 1,
    number: 3,
    name: 'Explore Your Campus',
    goal: 'Know where everything lives before Day 1',
    duration: 10,
    icon: 'compass',
    status: 'in_progress',
    optional: false,
    steps: 3,
  },
  {
    id: 'intro_discussion',
    week: 1,
    number: 4,
    name: 'Discussion: Introduce Yourself',
    goal: 'Post your intro in the cohort discussion',
    duration: 10,
    icon: 'message-circle',
    status: 'not_started',
    optional: false,
    steps: 1,
  },

  // ── Week 2 — Know Your Degree ──
  {
    id: 'onboarding_questions',
    week: 2,
    number: 1,
    name: 'Onboarding Questions',
    goal: 'Help us personalize your experience',
    duration: 2,
    icon: 'clipboard-list',
    status: 'not_started',
    optional: false,
    steps: 5,
  },
  {
    id: 'meet_curriculum',
    week: 2,
    number: 2,
    name: 'Meet Your Curriculum',
    goal: 'Understand what you\'ll learn and which skills you\'ll gain',
    duration: 10,
    icon: 'book-open',
    status: 'not_started',
    optional: false,
    steps: 3,
  },
  {
    id: 'personalize_tutor',
    week: 2,
    number: 3,
    name: 'Personalize Your Tutor',
    goal: 'Set up your AI tutor to teach the way you learn best',
    duration: 5,
    icon: 'bot',
    status: 'not_started',
    optional: false,
    steps: 8,
  },
  {
    id: 'pod_preferences',
    week: 2,
    number: 4,
    name: 'Pod Preference Questions',
    goal: 'Help us match you with the right study group',
    duration: 3,
    icon: 'users',
    status: 'not_started',
    optional: false,
    steps: 3,
  },
  {
    id: 'expectations_discussion',
    week: 2,
    number: 5,
    name: 'Discussion: What Are Your Expectations?',
    goal: 'Share what you hope to get from the program',
    duration: 5,
    icon: 'message-circle',
    status: 'not_started',
    optional: false,
    steps: 1,
  },

  // ── Week 3 — Meet Your People ──
  {
    id: 'meet_pod',
    week: 3,
    number: 1,
    name: 'Meet Your Accountability Pod',
    goal: 'Meet your study partners',
    duration: 10,
    icon: 'users',
    status: 'not_started',
    optional: false,
    steps: 2,
  },
  {
    id: 'reflection',
    week: 3,
    number: 2,
    name: 'Write Your Pre-Course Reflection',
    goal: 'Set your personal intentions for the term',
    duration: 5,
    icon: 'pen-line',
    status: 'not_started',
    optional: false,
    steps: 1,
  },
  {
    id: 'fears_discussion',
    week: 3,
    number: 3,
    name: 'Discussion: What Are Your Fears?',
    goal: 'Share your concerns and see you\'re not alone',
    duration: 10,
    icon: 'message-circle',
    status: 'not_started',
    optional: false,
    steps: 1,
  },

  // ── Week 4 — Ready for Day 1 ──
  {
    id: 'preview_lesson',
    week: 4,
    number: 1,
    name: 'Complete a Real Lesson',
    goal: 'Prove to yourself you\'re ready for Day 1',
    duration: 18,
    icon: 'target',
    status: 'not_started',
    optional: false,
    steps: 5,
  },
  {
    id: 'commitment',
    week: 4,
    number: 2,
    name: 'Make Your Commitment',
    goal: 'Share your term goal with your pod',
    duration: 5,
    icon: 'flag',
    status: 'not_started',
    optional: false,
    steps: 1,
  },
  {
    id: 'friends_discussion',
    week: 4,
    number: 3,
    name: 'Discussion: Making Friends',
    goal: 'Connect with peers you\'d like to stay close with',
    duration: 8,
    icon: 'message-circle',
    status: 'not_started',
    optional: false,
    steps: 1,
  },
];

// ──────────────────────────────────────────────────
// Week Tabs — 4-week orientation structure
// Week 1 = in_progress (unlocks on enrollment)
// Weeks 2-4 = locked (unlock weekly)
// ──────────────────────────────────────────────────

export const mockWeekTabs = [
  // Pre-cohort orientation weeks (negative countdown to Day 1)
  { id: 'week-1', label: 'Week -4', title: 'Set Up & Settle In', status: 'in_progress', startDate: 'Mar 31', phase: 'orientation' },
  { id: 'week-2', label: 'Week -3', title: 'Know Your Degree', status: 'locked', startDate: 'Apr 7', phase: 'orientation' },
  { id: 'week-3', label: 'Week -2', title: 'Meet Your People', status: 'locked', startDate: 'Apr 14', phase: 'orientation' },
  { id: 'week-4', label: 'Week -1', title: 'Ready for Day 1', status: 'locked', startDate: 'Apr 21', phase: 'orientation' },
  // Separator: marks the start of term (Day 1)
  { id: 'day1-separator', label: 'Apr 28', title: 'Term Starts', type: 'separator', phase: 'separator' },
  // Term weeks (after Day 1 — Apr 28 is cohort start)
  { id: 'term-1', label: 'Week 1', title: 'Term Week 1', status: 'locked', startDate: 'Apr 28', phase: 'term' },
  { id: 'term-2', label: 'Week 2', title: 'Term Week 2', status: 'locked', startDate: 'May 5', phase: 'term' },
  { id: 'term-3', label: 'Week 3', title: 'Term Week 3', status: 'locked', startDate: 'May 12', phase: 'term' },
  { id: 'term-4', label: 'Week 4', title: 'Term Week 4', status: 'locked', startDate: 'May 19', phase: 'term' },
  { id: 'term-5', label: 'Week 5', title: 'Term Week 5', status: 'locked', startDate: 'May 26', phase: 'term' },
];

// ──────────────────────────────────────────────────
// Enrollment tasks — UNCHANGED (separate enrollment wizard flow)
// ──────────────────────────────────────────────────

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
    steps: 3,
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
    steps: 5,
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

// ──────────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────────

// Get tasks for a specific week (1-4)
export const getTasksForWeek = (tasks, weekNumber) => {
  return tasks.filter(t => t.week === weekNumber);
};

// Get the week number from a tab id like "week-1" => 1
export const getWeekNumberFromTabId = (tabId) => {
  return parseInt(tabId.replace('week-', ''), 10);
};

// Get the next uncompleted task (across all weeks, respecting week order)
export const getNextTask = (tasks) => {
  return tasks.find(t => t.status === 'not_started' || t.status === 'in_progress');
};

// Count completed tasks across ALL weeks
export const getCompletedCount = (tasks) => {
  return tasks.filter(t => t.status === 'completed' && !t.optional).length;
};

// Total required tasks across ALL weeks
export const getTotalRequired = (tasks) => {
  return tasks.filter(t => !t.optional).length;
};

// Format date nicely
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Days until a date
export const daysUntil = (dateStr) => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};
