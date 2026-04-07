// AppLayout — main app layout with sidebar + content area
// Matches Maestro production:
// - Dark background (#0F1117 = bg-primary)
// - Fixed sidebar on left (~56px)
// - Content area offset by sidebar width
// - Points badge top-right
// - Generous padding in content area

import Sidebar from '../components/Sidebar/Sidebar';
import PointsBadge from '../components/shared/PointsBadge';

/**
 * Main application layout.
 * @param {React.ReactNode} children - Page content
 * @param {{ name: string, avatarUrl?: string }} student - Student info for sidebar
 * @param {number} points - Points for top-right badge
 * @param {string} activeNav - Active sidebar nav item
 * @param {Function} onNavigate - Sidebar nav callback
 */
export default function AppLayout({
  children,
  student = { name: 'Student' },
  points = 0,
  activeNav = 'home',
  onNavigate,
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Fixed sidebar */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={onNavigate}
        student={student}
      />

      {/* Main content area — offset by sidebar on md+, full width on mobile */}
      <main className="md:pl-14 min-h-screen">
        {/* Top bar — points badge right-aligned with generous padding */}
        <div className="flex justify-end items-center px-8 pt-5 pb-2">
          <PointsBadge points={points} />
        </div>

        {/* Page content with generous horizontal padding */}
        <div className="px-10 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
