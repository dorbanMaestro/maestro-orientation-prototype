// OrientationTaskContent — Generic modal content for orientation tasks
// Shows task goal, duration, and a description of what to do

import {
  Compass, BookOpen, HandMetal, Users, PenLine, GraduationCap, Target, UserPlus,
} from 'lucide-react';
import { Clock } from 'lucide-react';

const iconMap = {
  compass: Compass,
  'book-open': BookOpen,
  'hand-metal': HandMetal,
  users: Users,
  'pen-line': PenLine,
  'graduation-cap': GraduationCap,
  target: Target,
  'user-plus': UserPlus,
};

// Placeholder descriptions for each orientation task
const taskDescriptions = {
  explore_campus: 'Navigate through the main sections of Maestro — your classroom, community forums, resources library, and support channels. Get familiar with where everything lives so you can hit the ground running on Day 1.',
  meet_curriculum: 'Browse your course syllabus and preview the topics you\'ll be covering. Watch the intro video from your instructor and explore the first few lesson summaries.',
  introduce_yourself: 'Post a short introduction in the community forum. Share your name, background, and what you\'re most excited to learn. Then read and react to at least 3 classmates\' introductions.',
  meet_pod: 'You\'ve been matched with a small accountability group. Meet your pod members, introduce yourselves, and set your first shared weekly goal together.',
  reflection: 'Write a short reflection about why you enrolled, what you hope to achieve, and how many hours per week you plan to study. This helps you set intentions and build a study schedule.',
  preview_lesson: 'Complete your first real lesson to prove to yourself that you\'re ready. This gives you a taste of the learning experience and builds confidence before the cohort officially starts.',
  commitment: 'Declare your term goal to your cohort. Choose what you want to achieve by the end of the program and share it publicly to build accountability.',
  invite_friend: 'Know someone who\'d benefit from this program? Send them an invite link. Learning together increases your chances of success.',
};

export default function OrientationTaskContent({ task }) {
  const Icon = iconMap[task.icon] || Compass;
  const description = taskDescriptions[task.id] || task.goal;

  return (
    <div className="space-y-5">
      {/* Task icon + goal */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
          <Icon size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">{task.goal}</p>
          <div className="flex items-center gap-1.5 text-xs text-text-disabled">
            <Clock size={12} />
            <span>{task.duration} minutes</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-bg-elevated rounded-lg p-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Points reward */}
      <div className="flex items-center justify-center gap-2 py-3 bg-bg-elevated rounded-lg">
        <span className="text-sm text-text-tertiary">Earn</span>
        <span className="text-lg font-bold text-warning">8 ◆</span>
        <span className="text-sm text-text-tertiary">points</span>
      </div>
    </div>
  );
}
