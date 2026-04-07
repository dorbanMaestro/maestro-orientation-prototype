// OrientationHomePage — main home screen
// Now has two task sets: Enrollment tasks + Orientation tasks
// Switching tabs shows different task lists
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
  mockEnrollmentTasks,
  mockWeekTabs,
  getNextTask,
} from '../data/orientationData';

export default function OrientationHomePage() {
  // Two separate task arrays — enrollment and orientation
  const [enrollmentTasks, setEnrollmentTasks] = useState(mockEnrollmentTasks);
  const [orientationTasks, setOrientationTasks] = useState(mockOrientationTasks);

  // Which tab is active — "enrollment" by default (first thing new students see)
  const [activeTab, setActiveTab] = useState('enrollment');

  // Modal state — which task is open, if any
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get tasks for the currently active tab
  const currentTasks = activeTab === 'enrollment' ? enrollmentTasks : orientationTasks;

  // Next task for the UpNextCard — check enrollment first, then orientation
  const nextEnrollmentTask = getNextTask(enrollmentTasks);
  const nextOrientationTask = getNextTask(orientationTasks);
  const nextTask = nextEnrollmentTask || nextOrientationTask;

  // Open modal when a task card is clicked
  const handleTaskClick = (task) => {
    console.log(`Task clicked: ${task.name} (${task.status})`);
    setModalTask(task);
    setIsModalOpen(true);
  };

  // Mark a task as completed from the modal
  const handleCompleteTask = (task) => {
    console.log(`Task completed: ${task.name}`);

    if (activeTab === 'enrollment') {
      setEnrollmentTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'completed' } : t))
      );
    } else {
      setOrientationTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'completed' } : t))
      );
    }

    // Update the modal task to reflect completion
    setModalTask({ ...task, status: 'completed' });
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTask(null);
  };

  // Handle "Continue"/"Start" from UpNextCard — also opens modal
  const handleUpNextClick = (task) => {
    // If the up-next task is from enrollment, switch to enrollment tab
    if (enrollmentTasks.some((t) => t.id === task.id)) {
      setActiveTab('enrollment');
    } else {
      setActiveTab('orientation');
    }
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

        {/* 3. Weekly Goals section — shows enrollment or orientation tasks based on tab */}
        <OrientationTaskList
          tasks={currentTasks}
          weekTabs={mockWeekTabs}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          onTaskClick={handleTaskClick}
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
