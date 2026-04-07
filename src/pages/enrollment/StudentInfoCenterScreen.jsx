// StudentInfoCenterScreen -- Step 5 of 5 in the enrollment wizard
// Shows 4 info cards covering: Degree details, Maestro platform, FAQs, Support resources
// This is the final enrollment step before the student lands on their home page

import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, LayoutGrid, HelpCircle, LifeBuoy } from 'lucide-react';
import EnrollmentLayout from '../../layouts/EnrollmentLayout';
import Button from '../../components/shared/Button';

// The 4 info topics from the PRD
const infoCards = [
  {
    id: 'degree',
    icon: GraduationCap,
    title: 'Degree Details',
    description: 'Curriculum structure, learning outcomes, and the credential you\'ll earn.',
  },
  {
    id: 'maestro',
    icon: LayoutGrid,
    title: 'About Maestro',
    description: 'How the platform works, what makes it different, and what to expect.',
  },
  {
    id: 'faqs',
    icon: HelpCircle,
    title: 'FAQs',
    description: 'Common questions about your term, schedule, grading, and more.',
  },
  {
    id: 'support',
    icon: LifeBuoy,
    title: 'Support Resources',
    description: 'Where to get help -- academic support, tech issues, and student services.',
  },
];

export default function StudentInfoCenterScreen() {
  const navigate = useNavigate();

  return (
    <EnrollmentLayout step={5} totalSteps={5}>
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white mb-1">
          Student Information Center
        </h1>
        <p className="text-text-secondary text-sm">
          Want to know more about your degree and Maestro before Day 1? Explore here.
        </p>
      </div>

      {/* 4 info cards in a 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-bg-elevated border border-primary/40 rounded-xl p-4 cursor-pointer hover:bg-bg-hover transition-colors"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary" />
              </div>

              {/* Title + description */}
              <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Button -- final step, goes to student home */}
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
