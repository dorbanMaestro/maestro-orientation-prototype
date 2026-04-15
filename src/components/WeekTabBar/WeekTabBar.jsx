// WeekTabBar — Horizontal scrollable pill tabs for weeks/orientation
// Matches Maestro production layout:
// - Orientation weeks: "Week -4", "Week -3", "Week -2", "Week -1"
// - Separator: "Apr 28" marker for Day 1 (term start)
// - Term weeks: "Week 1", "Week 2", "Week 3", etc.
// - Status icons: filled dot (completed), empty circle (in_progress), lock (locked)
// - Dashed connectors between pills
// - Right arrow button for scrolling

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
 * Supports a special "separator" type tab that renders as a date marker
 * between orientation and term weeks (matching Maestro production).
 *
 * @param {Array} tabs - Array of { id, label, status, type? }
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
        {tabs.map((tab, index) => {
          // Separator element — renders as a small date badge between orientation and term
          if (tab.type === 'separator') {
            return (
              <div key={tab.id} className="flex items-center shrink-0">
                {/* Dashed connector leading into separator */}
                {index > 0 && (
                  <div className="w-4 border-t border-dashed border-border-default -mx-0.5" />
                )}
                {/* The separator badge — shows "Apr 28" with "Day 1" label */}
                <div className="shrink-0 flex flex-col items-center px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-[10px] font-medium text-primary leading-tight">Day 1</span>
                  <span className="text-[11px] font-semibold text-primary leading-tight">{tab.label}</span>
                </div>
              </div>
            );
          }

          // Regular week tab pill
          const isActive = tab.id === activeTab;
          const isLocked = tab.status === 'locked';

          return (
            <div key={tab.id} className="flex items-center shrink-0">
              {/* Dashed connector line between tabs */}
              {index > 0 && (
                <div className="w-4 border-t border-dashed border-border-default -mx-0.5" />
              )}
              <button
                onClick={() => !isLocked && onTabClick?.(tab.id)}
                disabled={isLocked}
                className={`
                  shrink-0 flex items-center px-4 py-2 rounded-full text-sm font-medium
                  border transition-all whitespace-nowrap
                  ${
                    isActive
                      ? 'border-border-default text-text-primary bg-bg-elevated/50'
                      : isLocked
                        ? 'border-transparent text-text-disabled bg-transparent cursor-not-allowed'
                        : 'border-transparent text-text-tertiary bg-transparent hover:text-text-secondary cursor-pointer'
                  }
                `}
              >
                <span>{tab.label}</span>
                <StatusIcon status={tab.status} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Right scroll arrow */}
      <button
        onClick={scrollRight}
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-border-default text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Scroll tabs right"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
