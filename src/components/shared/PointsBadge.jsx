// PointsBadge — bordered pill badge shown top-right
// Supports animated counting (slot-machine scroll) and golden highlight burst

import { forwardRef, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PointsBadge = forwardRef(function PointsBadge({ points = 0, animate = false }, ref) {
  // Animated display value — scrolls from previous to current in 0.5s
  const [displayPoints, setDisplayPoints] = useState(points);
  const prevPoints = useRef(points);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (points === prevPoints.current) return;
    if (isAnimating.current) return;

    const from = prevPoints.current;
    const to = points;
    prevPoints.current = to;
    isAnimating.current = true;

    // Count up over 500ms with ~60fps updates
    const duration = 500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out: fast start, slow end
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPoints(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimating.current = false;
      }
    };
    requestAnimationFrame(step);
  }, [points]);

  return (
    <motion.div
      ref={ref}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-border-default rounded-full bg-transparent"
      // Golden star-burst highlight when diamonds hit (like the game screenshots)
      animate={
        animate
          ? {
              scale: [1, 1.3, 1.1, 1],
              boxShadow: [
                '0 0 0px 0px rgba(234, 179, 8, 0)',
                '0 0 20px 8px rgba(234, 179, 8, 0.6)',
                '0 0 10px 4px rgba(234, 179, 8, 0.3)',
                '0 0 0px 0px rgba(234, 179, 8, 0)',
              ],
              transition: { duration: 0.5, ease: 'easeOut' },
            }
          : {
              scale: 1,
              boxShadow: '0 0 0px 0px rgba(234, 179, 8, 0)',
            }
      }
    >
      {/* Point count — slot-machine scroll effect */}
      <span
        className="text-sm font-semibold text-text-primary"
        style={{ overflow: 'hidden', display: 'inline-block', minWidth: '24px', textAlign: 'right' }}
      >
        {displayPoints.toLocaleString()}
      </span>

      {/* Mastery points diamond icon */}
      <img
        src="https://www.figma.com/api/mcp/asset/52ff2889-5777-49ac-8082-a4f56d0c57a8"
        alt=""
        style={{ width: 17, height: 20 }}
      />
    </motion.div>
  );
});

export default PointsBadge;
