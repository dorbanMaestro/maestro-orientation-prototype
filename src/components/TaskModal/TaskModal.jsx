// TaskModal — Full-screen dark overlay modal for task actions
// Opens when a student clicks any task card
// Shows task-specific content (enrollment forms, orientation actions, etc.)
// Matches Maestro dark theme with centered card

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import modal content panels for each enrollment task type
import WelcomeContent from './content/WelcomeContent';
import ProfileContent from './content/ProfileContent';
import RosterContent from './content/RosterContent';
import PreviewContent from './content/PreviewContent';
import QuestionnaireContent from './content/QuestionnaireContent';
import InfoCenterContent from './content/InfoCenterContent';

// Import rich content panels for each orientation task (by task ID)
import ExploreCampusContent from './content/ExploreCampusContent';
import MeetCurriculumContent from './content/MeetCurriculumContent';
import PersonalizeTutorContent from './content/PersonalizeTutorContent';
import IntroduceYourselfContent from './content/IntroduceYourselfContent';
import MeetPodContent from './content/MeetPodContent';
import ReflectionContent from './content/ReflectionContent';
import PreviewLessonContent from './content/PreviewLessonContent';
import CommitmentContent from './content/CommitmentContent';

// Map enrollment modalType to content component
const enrollmentContentMap = {
  welcome: WelcomeContent,
  profile: ProfileContent,
  roster: RosterContent,
  preview: PreviewContent,
  questionnaire: QuestionnaireContent,
  info_center: InfoCenterContent,
};

// Map orientation task ID to its rich content component
const orientationContentMap = {
  explore_campus: ExploreCampusContent,
  meet_curriculum: MeetCurriculumContent,
  personalize_tutor: PersonalizeTutorContent,
  introduce_yourself: IntroduceYourselfContent,
  meet_pod: MeetPodContent,
  reflection: ReflectionContent,
  preview_lesson: PreviewLessonContent,
  commitment: CommitmentContent,
};

/**
 * Modal overlay for task actions.
 * @param {boolean} isOpen - Whether modal is visible
 * @param {object} task - The task object that was clicked
 * @param {function} onClose - Close the modal
 * @param {function} onComplete - Mark task as completed
 */
export default function TaskModal({ isOpen, task, onClose, onComplete }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!task) return null;

  // Pick the right content component:
  // 1. Enrollment tasks use modalType (welcome, profile, roster, preview, questionnaire, info_center)
  // 2. Orientation tasks use task ID (explore_campus, meet_curriculum, etc.)
  const ContentComponent = task.modalType
    ? enrollmentContentMap[task.modalType]
    : orientationContentMap[task.id];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-[100]"
            onClick={onClose}
          />

          {/* Modal card — centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
          >
            <div
              className="bg-bg-surface border border-border-default rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header — task name + close button */}
              <div className="sticky top-0 bg-bg-surface border-b border-border-subtle px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold text-text-primary" style={{ fontFamily: '"Wix Madefor Display", system-ui, sans-serif' }}>{task.name}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-hover text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content area — rendered by the specific content component */}
              <div className="px-6 py-5">
                {ContentComponent && (
                  <ContentComponent task={task} />
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
