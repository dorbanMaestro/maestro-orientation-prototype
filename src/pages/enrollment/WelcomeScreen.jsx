// WelcomeScreen — Step 1 of 5 in the enrollment wizard
// Big celebration heading, cohort preview card, and CTA to continue
// This is the first thing a new student sees after being accepted

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';
import { mockCohort, formatDate } from '../../data/orientationData';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <EnrollmentLayout step={1} totalSteps={5}>
      {/* Celebration heading — PRD copy: "You're in." + cohort date subtitle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          You're in.
        </h1>
        <p className="text-text-secondary text-sm">
          Your cohort starts on {formatDate(mockCohort.startDate)} — here's how to get ready.
        </p>
      </motion.div>

      {/* Cohort preview card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-bg-elevated rounded-xl p-5 mb-8 border border-neutral-dark/30"
      >
        {/* Student count - big and prominent */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
            <Users size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">{mockCohort.studentCount}</span>
            <span className="text-text-secondary text-sm ml-1.5">students</span>
          </div>
        </div>

        {/* Description text */}
        <p className="text-text-secondary text-sm leading-relaxed">
          You're joining <span className="text-white font-medium">{mockCohort.studentCount} students</span> starting{' '}
          <span className="text-white font-medium">{mockCohort.program}</span> on{' '}
          <span className="text-white font-medium">{formatDate(mockCohort.startDate)}</span>.
        </p>
      </motion.div>

      {/* CTA Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={ArrowRight}
        onClick={() => navigate('/enrollment/profile')}
      >
        Complete your profile
      </Button>
    </EnrollmentLayout>
  );
}
