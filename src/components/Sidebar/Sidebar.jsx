// Sidebar — narrow ~56px icon-only sidebar
// Matches Maestro production:
// - Fixed left, very dark bg
// - Top: Maestro logo (purple square with grid/cog icon)
// - Middle: vertical stack of nav icons, ~20px, gray inactive / white active
// - Active item has subtle bg highlight
// - Bottom: circular user avatar
// - No visible right border in the dark theme

import {
  LayoutGrid,
  Home,
  BookOpen,
  Users,
  Bell,
  MessageCircle,
  FolderClosed,
  UserCircle,
  Globe,
  Calendar,
} from 'lucide-react';
import Avatar from '../shared/Avatar';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: BookOpen, label: 'Curriculum', id: 'curriculum' },
  { icon: Users, label: 'Community', id: 'community' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: MessageCircle, label: 'Chat', id: 'chat' },
  { icon: FolderClosed, label: 'Files', id: 'files' },
  { icon: UserCircle, label: 'People', id: 'people' },
  { icon: Globe, label: 'Settings', id: 'settings' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
];

/**
 * Narrow icon-only sidebar.
 * @param {string} activeItem - Active nav item ID
 * @param {Function} onNavigate - Nav click callback
 * @param {{ name: string, avatarUrl?: string }} student - Student info for avatar
 */
export default function Sidebar({
  activeItem = 'home',
  onNavigate,
  student = { name: 'Student' },
}) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 bg-bg-surface border-r border-neutral-dark/20 flex-col items-center py-4 z-50">
      {/* Top: Maestro logo — purple rounded square with grid icon */}
      <div className="mb-8 w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
        <LayoutGrid size={18} className="text-primary" />
      </div>

      {/* Navigation icons — vertically stacked with spacing */}
      <nav className="flex flex-col items-center gap-0.5 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => {
          const isActive = activeItem === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate?.(id)}
              title={label}
              className={`
                w-11 h-11 flex items-center justify-center rounded-lg
                transition-all duration-150 cursor-pointer
                ${
                  isActive
                    ? 'bg-bg-hover text-white'
                    : 'text-text-disabled hover:text-text-tertiary hover:bg-bg-hover/40'
                }
              `}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            </button>
          );
        })}
      </nav>

      {/* Bottom: Student avatar */}
      <div className="mt-auto pt-4">
        <Avatar
          src={student.avatarUrl}
          name={student.name}
          size="sm"
        />
      </div>
    </aside>
  );
}
