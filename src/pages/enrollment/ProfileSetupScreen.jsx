// ProfileSetupScreen — Step 2 of 5 in the enrollment wizard
// Visual-only profile form: photo upload area, bio, program, timezone
// No real form submission — just toggles states for the prototype

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';
import { mockStudent } from '../../data/orientationData';

export default function ProfileSetupScreen() {
  const navigate = useNavigate();

  // Toggle state for the photo upload area (fake — just swaps visual)
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Bio text (local state for the textarea)
  const [bio, setBio] = useState('');

  // Extract initials from student name for the "uploaded" state
  const initials = mockStudent.fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <EnrollmentLayout step={2} totalSteps={5}>
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white mb-1">Complete your profile</h1>
        <p className="text-text-secondary text-sm">
          Your classmates will see this in the cohort roster.
        </p>
      </div>

      {/* Profile photo area — click to toggle between placeholder and "uploaded" */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex justify-center mb-6"
      >
        <button
          onClick={() => setPhotoUploaded(!photoUploaded)}
          className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group transition-all duration-200"
        >
          {photoUploaded ? (
            // "Uploaded" state — colored circle with initials
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-active flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{initials}</span>
            </div>
          ) : (
            // Placeholder state — gray circle with Camera icon
            <div className="w-full h-full bg-bg-elevated border-2 border-dashed border-neutral-dark flex flex-col items-center justify-center gap-1 group-hover:border-primary/50 transition-colors">
              <Camera size={24} className="text-text-disabled group-hover:text-text-secondary transition-colors" />
              <span className="text-[10px] text-text-disabled group-hover:text-text-secondary transition-colors">
                Add photo
              </span>
            </div>
          )}
        </button>
      </motion.div>

      {/* Form fields */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-4 mb-8"
      >
        {/* Bio textarea */}
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1.5">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 160))}
            placeholder="Tell your classmates about yourself (max 160 characters)"
            rows={3}
            className="w-full bg-bg-elevated border border-neutral-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 resize-none transition-colors"
          />
          <span className="text-[11px] text-text-disabled mt-1 block text-right">
            {bio.length}/160
          </span>
        </div>

        {/* Program field — pre-filled, read-only look */}
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1.5">Program</label>
          <input
            type="text"
            defaultValue={mockStudent.program}
            readOnly
            className="w-full bg-bg-elevated border border-neutral-dark rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none cursor-default"
          />
        </div>

        {/* Timezone field — pre-filled */}
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1.5">Timezone</label>
          <input
            type="text"
            defaultValue="America/New_York (EST)"
            readOnly
            className="w-full bg-bg-elevated border border-neutral-dark rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none cursor-default"
          />
        </div>
      </motion.div>

      {/* CTA Button — now navigates to questionnaire (step 3) */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={ArrowRight}
        onClick={() => navigate('/enrollment/questionnaire')}
      >
        Save & continue
      </Button>
    </EnrollmentLayout>
  );
}
