// AppLayout — main app layout with sidebar + content area
// Matches Maestro production:
// - Dark background (#0F1117 = bg-primary)
// - Fixed sidebar on left (~56px)
// - Content area offset by sidebar width
// - Points badge top-right
// - Generous padding in content area

import Sidebar from '../components/Sidebar/Sidebar';
/**
 * Main application layout.
 * @param {React.ReactNode} children - Page content
 * @param {{ name: string, avatarUrl?: string }} student - Student info for sidebar
 * @param {string} activeNav - Active sidebar nav item
 * @param {Function} onNavigate - Sidebar nav callback
 */
export default function AppLayout({
  children,
  student = { name: 'Student' },
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
        {/* Page content with generous horizontal padding */}
        <div className="px-10 pb-10 pt-7">
          {children}
        </div>
      </main>
    </div>
  );
}
