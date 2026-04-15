// OrientationHomePage — main home screen
// RESTRUCTURED: 4-week orientation tabs (was Enrollment/Orientation split)
// Week 1 is active by default, Weeks 2-4 are locked
// Clicking any task opens a modal with the task action

import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import GreetingSection from '../components/GreetingSection/GreetingSection';
import UpNextCard from '../components/UpNextCard/UpNextCard';
import OrientationTaskList from '../components/OrientationTaskList/OrientationTaskList';
import TaskModal from '../components/TaskModal/TaskModal';

import {
  mockStudent,
  mockOrientationTasks,
  mockWeekTabs,
  getNextTask,
  getCompletedCount,
  getTotalRequired,
  getWeekNumberFromTabId,
} from '../data/orientationData';

export default function OrientationHomePage() {
  // All orientation tasks (across 4 weeks) in a single state array
  const [tasks, setTasks] = useState(mockOrientationTasks);

  // Which week tab is active — "week-1" by default (first week students see)
  const [activeTab, setActiveTab] = useState('week-1');

  // Modal state — which task is open, if any
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tasks for the currently active week tab
  const activeWeekNumber = getWeekNumberFromTabId(activeTab);
  const currentWeekTasks = tasks.filter(t => t.week === activeWeekNumber);

  // Get the week metadata (title, startDate) for the active tab
  const activeWeekMeta = mockWeekTabs.find(w => w.id === activeTab);

  // Total progress across ALL weeks (shown in header)
  const totalCompleted = getCompletedCount(tasks);
  const totalRequired = getTotalRequired(tasks);

  // Next task — find the first incomplete task across all weeks
  const nextTask = getNextTask(tasks);

  // Open modal when a task card is clicked
  const handleTaskClick = (task) => {
    console.log(`Task clicked: ${task.name} (${task.status})`);
    setModalTask(task);
    setIsModalOpen(true);
  };

  // Mark a task as completed from the modal
  const handleCompleteTask = (task) => {
    console.log(`Task completed: ${task.name}`);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: 'completed' } : t))
    );
    // Update the modal task to reflect completion
    setModalTask({ ...task, status: 'completed' });
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTask(null);
  };

  // Handle "Continue"/"Start" from UpNextCard — switch to the right week tab and open modal
  const handleUpNextClick = (task) => {
    // Switch to the week tab that contains this task
    const weekTab = `week-${task.week}`;
    setActiveTab(weekTab);
    handleTaskClick(task);
  };

  return (
    <AppLayout
      student={mockStudent}
      points={mockStudent.points}
      activeNav="home"
    >
      {/* Content column */}
      <div className="max-w-[780px] mx-auto">
        {/* 1. Large greeting */}
        <GreetingSection
          studentName={mockStudent.name}
          subtitle="Your orientation starts now — complete these tasks before Day 1."
        />

        {/* 2. Up Next card */}
        <div className="mb-8">
          <UpNextCard task={nextTask} onStart={handleUpNextClick} />
        </div>

        {/* 3. Weekly Goals section — shows tasks for the active week */}
        <OrientationTaskList
          tasks={currentWeekTasks}
          weekTabs={mockWeekTabs}
          activeTab={activeTab}
          activeWeekMeta={activeWeekMeta}
          onTabClick={setActiveTab}
          onTaskClick={handleTaskClick}
          totalCompleted={totalCompleted}
          totalRequired={totalRequired}
        />
      </div>

      {/* Task Modal — opens when any task is clicked */}
      <TaskModal
        isOpen={isModalOpen}
        task={modalTask}
        onClose={handleCloseModal}
        onComplete={handleCompleteTask}
      />
    </AppLayout>
  );
}
