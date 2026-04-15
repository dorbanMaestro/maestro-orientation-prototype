// OrientationPreviewScreen — Step 5 of 5 in the enrollment wizard
// Shows all 8 orientation tasks in preview mode (non-interactive, all not_started)
// This gives the student a sneak peek of what they'll do during orientation week

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';
import OrientationTaskCard from '../../components/OrientationTaskCard/OrientationTaskCard';
import { mockOrientationTasks, formatDate, mockCohort } from '../../data/orientationData';

export default function OrientationPreviewScreen() {
  const navigate = useNavigate();

  // Override all task statuses to 'not_started' for the preview
  // (In the real data some are completed/in_progress — but this is a preview before orientation starts)
  const previewTasks = mockOrientationTasks.map((task) => ({
    ...task,
    status: 'not_started',
  }));

  return (
    <EnrollmentLayout step={5} totalSteps={5}>
      {/* Heading */}
      <div className="text-center mb-1">
        <h1 className="text-xl font-bold text-white mb-1">
          7 days of tasks to get you ready for Day 1
        </h1>
        <p className="text-text-secondary text-sm">
          Your tasks unlock on {formatDate(mockCohort.orientationStartDate)}. We'll see you then.
        </p>
      </div>

      {/* Task list — all in preview/non-interactive mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-4 mb-8 space-y-1"
      >
        {previewTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
          >
            <OrientationTaskCard
              task={task}
              interactive={false}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button — final step, go to student home */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={ArrowRight}
        onClick={() => navigate('/home')}
      >
        Go to Student Home
      </Button>
    </EnrollmentLayout>
  );
}
