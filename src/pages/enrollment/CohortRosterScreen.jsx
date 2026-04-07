// CohortRosterScreen — Step 3 of 5 in the enrollment wizard
// Shows a grid of 6 classmate cards so the student feels part of a community
// Uses mockRosterStudents from orientationData.js

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import { mockCohort, mockRosterStudents } from '../../data/orientationData';

export default function CohortRosterScreen() {
  const navigate = useNavigate();

  return (
    <EnrollmentLayout step={3} totalSteps={5}>
      {/* Heading */}
      <div className="text-center mb-1">
        <h1 className="text-xl font-bold text-white mb-1">Meet your cohort</h1>
        <p className="text-text-secondary text-sm">
          {mockCohort.studentCount} students enrolled
        </p>
      </div>

      {/* Student cards grid — 2 columns on wider screens, 1 on narrow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 mt-5">
        {mockRosterStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.06, duration: 0.3 }}
            className="bg-bg-elevated rounded-lg p-4 border border-neutral-dark/50"
          >
            {/* Avatar + name row */}
            <div className="flex items-center gap-3 mb-2">
              <Avatar src={student.avatar} name={student.name} size="md" />
              <span className="text-sm font-semibold text-white truncate">{student.name}</span>
            </div>

            {/* Bio */}
            <p className="text-xs text-text-secondary leading-relaxed mb-2.5 line-clamp-2">
              {student.bio}
            </p>

            {/* Program tag */}
            <span className="inline-block text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {student.program}
            </span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={ArrowRight}
        onClick={() => navigate('/enrollment/preview')}
      >
        See your orientation tasks
      </Button>
    </EnrollmentLayout>
  );
}
