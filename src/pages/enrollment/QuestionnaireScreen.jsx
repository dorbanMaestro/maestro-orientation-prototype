// QuestionnaireScreen — Step 3 of 5 in the enrollment wizard
// Embeds the QuestionnaireContent and provides navigation to next enrollment step

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';
import QuestionnaireContent from '../../components/TaskModal/content/QuestionnaireContent';

export default function QuestionnaireScreen() {
  const navigate = useNavigate();

  return (
    <EnrollmentLayout step={3} totalSteps={5}>
      {/* Embedded questionnaire content — handles its own multi-step flow internally */}
      <QuestionnaireContent />

      {/* Skip / Continue — always visible at the bottom */}
      <div className="mt-6">
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          icon={ArrowRight}
          onClick={() => navigate('/enrollment/roster')}
        >
          Continue to next step
        </Button>
      </div>
    </EnrollmentLayout>
  );
}
