// WeekTabBar — Horizontal scrollable pill tabs for weeks/orientation
// Matches Maestro production:
// - Each tab is a rounded-full pill with padding
// - Completed tabs: text + filled blue circle dot
// - Current/active tab: text + empty circle outline, tab has white/light border
// - Locked tabs: text + lock icon, text dimmed
// - Right arrow button for scrolling
// - ~8px gaps between pills

import { useRef } from 'react';
import { Lock, ChevronRight } from 'lucide-react';

/**
 * Status icon inside each tab pill.
 * - completed: small filled indigo dot
 * - in_progress: small empty circle outline
 * - locked: small lock icon
 */
function StatusIcon({ status }) {
  if (status === 'completed') {
    return <span className="w-2 h-2 rounded-full bg-primary inline-block ml-1" />;
  }
  if (status === 'in_progress') {
    return <span className="w-2 h-2 rounded-full border border-text-secondary inline-block ml-1" />;
  }
  if (status === 'locked') {
    return <Lock size={11} className="text-text-disabled ml-1" />;
  }
  return null;
}

/**
 * Horizontal scrollable tab bar with pill-shaped tabs.
 * @param {Array} tabs - Array of { id, label, status }
 * @param {string} activeTab - Currently selected tab id
 * @param {function} onTabClick - Called with tab id when clicked
 */
export default function WeekTabBar({ tabs = [], activeTab, onTabClick }) {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Scrollable pill row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const isLocked = tab.status === 'locked';

          return (
            <button
              key={tab.id}
              onClick={() => !isLocked && onTabClick?.(tab.id)}
              disabled={isLocked}
              className={`
                shrink-0 flex items-center px-4 py-2 rounded-full text-sm font-medium
                border transition-all whitespace-nowrap
                ${
                  isActive
                    ? 'border-text-secondary/50 text-text-primary bg-bg-elevated/50'
                    : isLocked
                      ? 'border-transparent text-text-disabled bg-transparent cursor-not-allowed'
                      : 'border-transparent text-text-tertiary bg-transparent hover:text-text-secondary cursor-pointer'
                }
              `}
            >
              <span>{tab.label}</span>
              <StatusIcon status={tab.status} />
            </button>
          );
        })}
      </div>

      {/* Right scroll arrow */}
      <button
        onClick={scrollRight}
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-dark/40 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Scroll tabs right"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
