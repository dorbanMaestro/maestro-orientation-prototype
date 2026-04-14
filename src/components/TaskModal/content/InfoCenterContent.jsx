// InfoCenterContent — "Student Information Center" enrollment task
// Shows expandable accordion sections for degree details, FAQs, support, etc.
// Dark theme, uses native <details>/<summary> for simplicity

import { useState } from 'react';
import { ChevronDown, GraduationCap, Building2, HelpCircle, Headphones } from 'lucide-react';

// ---- Accordion sections ----
const SECTIONS = [
  {
    id: 'degree',
    icon: GraduationCap,
    title: 'Degree Details',
    content: [
      { label: 'Program', value: 'Associate of Applied Science (AAS) in AI Engineering' },
      { label: 'Duration', value: '18 months (6 terms, 12 weeks each)' },
      { label: 'Credits', value: '60 credit hours' },
      { label: 'Format', value: '100% online, asynchronous with live office hours' },
      { label: 'Accreditation', value: 'DEAC-accredited institution' },
    ],
  },
  {
    id: 'about',
    icon: Building2,
    title: 'About Maestro',
    content: [
      { label: 'Mission', value: 'Making high-quality education accessible through AI-powered personalized learning.' },
      { label: 'Learning Model', value: 'AI tutor-led lessons, peer accountability pods, and real-world projects.' },
      { label: 'Community', value: 'Join 10,000+ students across multiple programs and cohorts.' },
      { label: 'Support', value: '24/7 AI tutor support plus human advisors during business hours.' },
    ],
  },
  {
    id: 'faq',
    icon: HelpCircle,
    title: 'FAQs',
    items: [
      { q: 'When does my cohort start?', a: 'Your cohort starts on the date shown on your dashboard. Orientation week begins 7 days before.' },
      { q: 'How many hours per week should I study?', a: 'Most successful students study 10-15 hours across 4-5 days per week.' },
      { q: 'What if I fall behind?', a: 'Your AI tutor and accountability pod will help you get back on track. You can also reach out to your advisor.' },
      { q: 'Can I switch programs?', a: 'Contact your advisor to discuss program changes. Switches are possible within the first 2 weeks of your first term.' },
      { q: 'How are exams taken?', a: 'All exams are online and proctored through our platform. You can take them from anywhere.' },
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Support Resources',
    links: [
      { label: 'Help Center', description: 'Browse articles and guides', url: '#' },
      { label: 'Contact Support', description: 'Email: support@maestro.edu', url: '#' },
      { label: 'Technical Issues', description: 'Report bugs or platform problems', url: '#' },
      { label: 'Academic Advising', description: 'Schedule a session with your advisor', url: '#' },
    ],
  },
];

// ---- Accordion section component ----
function AccordionSection({ section }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="border border-neutral-dark/30 rounded-xl overflow-hidden">
      {/* Header — clickable */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-bg-elevated hover:bg-bg-hover transition-colors cursor-pointer text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-primary" />
        </div>
        <span className="text-sm font-medium text-text-primary flex-1">{section.title}</span>
        <ChevronDown
          size={16}
          className={`text-text-tertiary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable content */}
      {isOpen && (
        <div className="px-4 py-3 border-t border-neutral-dark/20 space-y-3">
          {/* Key-value pairs (Degree Details, About) */}
          {section.content && section.content.map((item, i) => (
            <div key={i}>
              <p className="text-xs text-text-tertiary mb-0.5">{item.label}</p>
              <p className="text-sm text-text-secondary">{item.value}</p>
            </div>
          ))}

          {/* FAQ items */}
          {section.items && section.items.map((item, i) => (
            <div key={i} className="pb-2 last:pb-0">
              <p className="text-sm font-medium text-text-primary mb-1">{item.q}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{item.a}</p>
            </div>
          ))}

          {/* Links (Support) */}
          {section.links && section.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="block px-3 py-2.5 rounded-lg bg-bg-surface hover:bg-bg-hover border border-neutral-dark/20 transition-colors"
            >
              <p className="text-sm font-medium text-text-primary">{link.label}</p>
              <p className="text-xs text-text-tertiary">{link.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Main component ----
export default function InfoCenterContent() {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="text-center mb-2">
        <h3 className="text-base font-semibold text-text-primary">
          Want to know more about your degree and Maestro?
        </h3>
        <p className="text-xs text-text-tertiary mt-1">
          Explore the sections below for details, FAQs, and support.
        </p>
      </div>

      {/* Accordion sections */}
      {SECTIONS.map((section) => (
        <AccordionSection key={section.id} section={section} />
      ))}
    </div>
  );
}
