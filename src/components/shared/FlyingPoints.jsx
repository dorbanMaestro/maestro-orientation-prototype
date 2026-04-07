// FlyingPoints — 3-phase "points fly to counter" animation (game-style)
//
// Based on Gardenscapes-style level complete animation:
//
// Phase 1 — "8 merges into diamond"
//   The "8" number text flies into the diamond icon.
//
// Phase 2 — "Diamond multiplies and spreads"
//   Diamond explodes into 8 copies that spread in a ~120px area.
//   They hover/float for ~0.8s.
//
// Phase 3 — "Diamonds fly one-by-one to counter with sparkle trail"
//   Each diamond flies in a smooth arc toward the counter.
//   SPARKLE PARTICLES are left behind along the path, creating a
//   persistent golden trail (the signature game effect).
//   On arrival, golden burst at the counter.

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── CONFIGURATION — TWEAK THESE NUMBERS ───────────────────────────
//
// All times are in seconds. Change these to adjust the feel.
//
export const DEFAULT_CONFIG = {
  // ── APPEAR (Phase 2) ──
  spreadSize: 120,              // Area (px) the diamonds spread across
  appearDelayMin: 0.0,          // First diamond appears after (s)
  appearDelayMax: 0.35,         // Last diamond appears by (s)
  appearDuration: 0.25,         // Fade-in time per diamond (s)
  hoverDuration: 0.56,          // Pause before flying starts (s)

  // ── FLIGHT TIMING (Phase 3) ──
  flyDelayMin: 0.0,             // First diamond launches after (s)
  flyDelayMax: 1.2,             // Last diamond launches by (s)
  flyDurationMin: 0.6,          // Shortest flight (s)
  flyDurationMax: 0.9,          // Longest flight (s)

  // ── ACCELERATION ──
  // "slowStart" controls how much the diamond hesitates before zooming.
  // 0 = no hesitation (linear speed)
  // 0.5 = moderate (half the flight is slow, half is fast)
  // 0.9 = extreme (90% slow crawl, then sudden burst to counter)
  slowStart: 0.7,               // 0-0.9: how much of the flight is slow

  // ── ARC (curved path) ──
  arcEnabled: false,            // true = curved path, false = straight line
  arcHeight: 60,                // How high the curve goes (px above straight line)

  // ── WINDUP (momentum dip) ──
  windupDistance: 15,            // How far down they dip before flying (px, 0 = off)
  windupDuration: 0.2,          // Fraction of flight time spent on dip (s)

  // ── SPARKLE TRAIL ──
  sparkleInterval: 50,          // ms between sparkle drops
  sparkleLifetime: 800,         // ms before sparkle fades

  // ── TRANSITIONS ──
  barToFlyDelay: 0.1,           // Delay from bar finish to fly start (s)
  fadeOutDuration: 0.8,         // "8 ◆" fade out time (s)
};

// Live config — starts from localStorage if saved, otherwise defaults
export const CONFIG = { ...DEFAULT_CONFIG };

// Load saved config on startup
try {
  const saved = localStorage.getItem('flyingPointsConfig');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(CONFIG, parsed);
    console.log('FlyingPoints: Loaded saved config from localStorage');
  }
} catch (e) {
  // ignore
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────

export default function FlyingPoints({
  numberRef,
  diamondRef,
  targetRef,
  points = 8,
  isActive = false,
  onComplete,
  onPhaseChange,  // called with phase number (1, 2, 3, null) so parent can react
  onFirstHit,     // called when the FIRST diamond hits the counter
}) {
  const [phase, setPhase] = useState(null);
  const [positions, setPositions] = useState(null);
  const [diamonds, setDiamonds] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [showBurst, setShowBurst] = useState(false);

  const hasStarted = useRef(false);
  const arrivedCount = useRef(0);
  const hasFiredComplete = useRef(false);
  const sparkleIdCounter = useRef(0);

  // ─── PHASE 1 ───
  useEffect(() => {
    if (!isActive) return;
    if (!numberRef?.current || !diamondRef?.current || !targetRef?.current) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    const numRect = numberRef.current.getBoundingClientRect();
    const diaRect = diamondRef.current.getBoundingClientRect();
    const badgeRect = targetRef.current.getBoundingClientRect();

    setPositions({
      numberX: numRect.left + numRect.width / 2,
      numberY: numRect.top + numRect.height / 2,
      diamondX: diaRect.left + diaRect.width / 2,
      diamondY: diaRect.top + diaRect.height / 2,
      targetX: badgeRect.left + badgeRect.width / 2,
      targetY: badgeRect.top + badgeRect.height / 2,
    });

    // Skip Phase 1 (merge animation removed) — go straight to Phase 2
    handleMergeComplete();
    return () => { hasStarted.current = false; };
  }, [isActive, numberRef, diamondRef, targetRef]);

  // ─── PHASE 1 → 2 ───
  const handleMergeComplete = useCallback(() => {
    const newDiamonds = Array.from({ length: points }, (_, i) => {
      // Random appear delay — each diamond pops in at a different time
      const appearT = i / Math.max(points - 1, 1); // 0 to 1
      const appearDelay = CONFIG.appearDelayMin + appearT * (CONFIG.appearDelayMax - CONFIG.appearDelayMin)
        + (Math.random() - 0.5) * 0.04; // tiny randomness

      // Random fly delay — each diamond launches at a different time
      const flyT = i / Math.max(points - 1, 1);
      const flyDelay = CONFIG.flyDelayMin + flyT * (CONFIG.flyDelayMax - CONFIG.flyDelayMin)
        + (Math.random() - 0.5) * 0.08; // more randomness for organic feel

      return {
        id: `diamond-${Date.now()}-${i}`,
        offsetX: (Math.random() - 0.5) * CONFIG.spreadSize,
        offsetY: (Math.random() - 0.5) * CONFIG.spreadSize,
        appearDelay: Math.max(0, appearDelay),
        flyDelay: Math.max(0, flyDelay),
      };
    });

    setDiamonds(newDiamonds);
    setPhase(2);
    onPhaseChange?.(2);

    setTimeout(() => {
      setPhase(3);
      onPhaseChange?.(3);
    }, CONFIG.hoverDuration * 1000);
  }, [points]);

  // ─── Add sparkle to the trail ───
  // Called by each flying diamond at intervals to drop sparkle particles
  const addSparkle = useCallback((x, y) => {
    sparkleIdCounter.current += 1;
    const id = `sparkle-${sparkleIdCounter.current}`;
    setSparkles((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, CONFIG.sparkleLifetime);
  }, []);

  // ─── PHASE 3: Track arrivals ───
  const handleDiamondArrived = useCallback(() => {
    arrivedCount.current += 1;

    // Notify parent on FIRST hit (for counter animation)
    if (arrivedCount.current === 1) {
      onFirstHit?.();
    }

    // Burst flash on each arrival
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 250);

    if (arrivedCount.current >= points && !hasFiredComplete.current) {
      hasFiredComplete.current = true;

      setTimeout(() => {
        onComplete?.();
        setPhase(null);
        onPhaseChange?.(null);
        setDiamonds([]);
        setSparkles([]);
        setPositions(null);
        arrivedCount.current = 0;
        hasFiredComplete.current = false;
      }, 300);
    }
  }, [points, onComplete]);

  if (!positions) return null;

  return (
    <>
      {/* Phase 2 + 3: Flying diamonds */}
      <AnimatePresence>
        {(phase === 2 || phase === 3) &&
          diamonds.map((d) => (
            <DiamondParticle
              key={d.id}
              originX={positions.diamondX}
              originY={positions.diamondY}
              hoverOffsetX={d.offsetX}
              hoverOffsetY={d.offsetY}
              targetX={positions.targetX}
              targetY={positions.targetY}
              phase={phase}
              appearDelay={d.appearDelay}
              flyDelay={d.flyDelay}
              onArrived={handleDiamondArrived}
              addSparkle={addSparkle}
            />
          ))}
      </AnimatePresence>

      {/* Sparkle trail particles (the golden dots left behind) */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <SparkleParticle key={s.id} x={s.x} y={s.y} />
        ))}
      </AnimatePresence>

      {/* Golden burst at counter on impact */}
      <AnimatePresence>
        {showBurst && positions && (
          <GoldenBurst x={positions.targetX} y={positions.targetY} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── PHASE 1: "8" merges into diamond ──────────────────────────────

function MergingNumber({ startX, startY, endX, endY, onComplete }) {
  const hasFired = useRef(false);
  const handleComplete = () => {
    if (!hasFired.current) {
      hasFired.current = true;
      onComplete?.();
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed', left: startX, top: startY,
        zIndex: 9999, pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: endX - startX, y: endY - startY,
        scale: 0.3,
        opacity: [1, 0.9, 0],
      }}
      transition={{
        duration: 0.4, ease: 'easeIn',
        opacity: { duration: 0.4, times: [0, 0.6, 1] },
      }}
      onAnimationComplete={handleComplete}
    >
      <span className="font-medium text-text-secondary" style={{ fontSize: '14px' }}>8</span>
    </motion.div>
  );
}

// ─── PHASE 2+3: Diamond particle ───────────────────────────────────

function DiamondParticle({
  originX, originY,
  hoverOffsetX, hoverOffsetY,
  targetX, targetY,
  phase, appearDelay = 0, flyDelay,
  onArrived, addSparkle,
}) {
  const hasFired = useRef(false);
  const handleComplete = () => {
    if (phase === 3 && !hasFired.current) {
      hasFired.current = true;
      onArrived?.();
    }
  };

  // UNIFIED: Same component handles both Phase 2 (fade in) and Phase 3 (fly).
  // This prevents the visual "pop" of unmounting/remounting between phases.
  // The diamond fades in at its spread position, then when phase changes to 3,
  // it starts flying from that same position — no re-render, same element.
  if (phase === 2 || phase === 3) {
    return (
      <ContinuousDiamond
        fromX={originX + hoverOffsetX}
        fromY={originY + hoverOffsetY}
        toX={targetX}
        toY={targetY}
        phase={phase}
        appearDelay={appearDelay}
        flyDelay={flyDelay}
        onComplete={handleComplete}
        addSparkle={addSparkle}
      />
    );
  }

  return null;
}

// ─── CONTINUOUS DIAMOND (Phase 2 → Phase 3 in one element) ──────────
//
// This component handles BOTH phases without unmounting:
// Phase 2: Fades in at spread position (staggered by appearDelay)
// Phase 3: Flies from that same position to the counter (with sparkle trail)
//
// The key insight: by keeping the same DOM element across phases,
// there's no "pop" or visual discontinuity when the diamond starts flying.

function ContinuousDiamond({
  fromX, fromY, toX, toY,
  phase, appearDelay, flyDelay,
  onComplete, addSparkle,
}) {
  const hasFired = useRef(false);
  const elementRef = useRef(null);
  const sparkleInterval = useRef(null);

  const handleAnimComplete = () => {
    if (phase === 3 && !hasFired.current) {
      hasFired.current = true;
      if (sparkleInterval.current) clearInterval(sparkleInterval.current);
      onComplete?.();
    }
  };

  // Start emitting sparkles when Phase 3 begins
  useEffect(() => {
    if (phase !== 3) return;

    const startTime = Date.now() + flyDelay * 1000;

    sparkleInterval.current = setInterval(() => {
      if (Date.now() < startTime) return;

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        addSparkle(
          cx + (Math.random() - 0.5) * 8,
          cy + (Math.random() - 0.5) * 8
        );
      }
    }, CONFIG.sparkleInterval);

    return () => {
      if (sparkleInterval.current) clearInterval(sparkleInterval.current);
    };
  }, [phase, flyDelay, addSparkle]);

  // Random flight duration per diamond (from config)
  const flyDuration = CONFIG.flyDurationMin + Math.random() * (CONFIG.flyDurationMax - CONFIG.flyDurationMin);
  const totalDx = toX - fromX;
  const totalDy = toY - fromY;

  // Windup config
  const wd = CONFIG.windupDistance;
  const wdFrac = Math.min(CONFIG.windupDuration / Math.max(flyDuration, 0.01), 0.4);

  // Acceleration: convert simple 0-0.9 "slowStart" to cubic-bezier
  const ss = Math.min(CONFIG.slowStart, 0.9);
  const flyEasing = [ss, 0, 1, 1];

  // Arc: simple height-based curve
  const arc = CONFIG.arcEnabled;
  const arcMidXpx = totalDx * 0.4; // peak at 40% of horizontal distance
  const arcMidYpx = totalDy * 0.5 - CONFIG.arcHeight; // above the straight line

  // Build keyframes based on windup + arc combination
  let xKF, yKF, xT, yT;

  if (wd > 0 && arc) {
    xKF = [0, 0, arcMidXpx, totalDx];
    yKF = [0, wd, arcMidYpx, totalDy];
    xT = [0, wdFrac, wdFrac + (1 - wdFrac) * 0.4, 1];
    yT = [0, wdFrac, wdFrac + (1 - wdFrac) * 0.4, 1];
  } else if (wd > 0) {
    xKF = [0, 0, totalDx];
    yKF = [0, wd, totalDy];
    xT = [0, wdFrac, 1];
    yT = [0, wdFrac, 1];
  } else if (arc) {
    xKF = [0, arcMidXpx, totalDx];
    yKF = [0, arcMidYpx, totalDy];
    xT = [0, 0.4, 1];
    yT = [0, 0.4, 1];
  } else {
    xKF = totalDx;
    yKF = totalDy;
    xT = null;
    yT = null;
  }

  const hasKeyframes = wd > 0 || arc;

  const animateProps =
    phase === 2
      ? { x: 0, y: 0, scale: 1, opacity: 1 }
      : {
          x: xKF,
          y: yKF,
          scale: hasKeyframes ? [1, 1, 1, 0.5] : [1, 1, 0.5],
          opacity: [1, 1, 0],
        };

  const transitionProps =
    phase === 2
      ? { delay: appearDelay, duration: CONFIG.appearDuration, ease: 'easeOut' }
      : {
          delay: flyDelay,
          duration: flyDuration,
          x: xT
            ? { duration: flyDuration, ease: flyEasing, times: xT }
            : { duration: flyDuration, ease: flyEasing },
          y: yT
            ? { duration: flyDuration, ease: flyEasing, times: yT }
            : { duration: flyDuration, ease: flyEasing },
          scale: hasKeyframes
            ? { duration: flyDuration, times: [0, 0.3, 0.9, 1] }
            : { duration: flyDuration, times: [0, 0.9, 1] },
          opacity: { duration: flyDuration, times: [0, 0.95, 1] },
        };

  return (
    <motion.div
      ref={elementRef}
      style={{
        position: 'fixed', left: fromX, top: fromY,
        zIndex: 9999, pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={animateProps}
      transition={transitionProps}
      onAnimationComplete={handleAnimComplete}
    >
      <Diamond />
    </motion.div>
  );
}

// ─── SPARKLE PARTICLE (dropped along the flight path) ──────────────
//
// These are the tiny golden dots/stars that persist for ~0.8s after
// a diamond passes through. They create the visible golden trail
// (the signature Gardenscapes effect).

function SparkleParticle({ x, y }) {
  // Random size variation (2-5px) — mix of tiny and small sparkles
  const size = 2 + Math.random() * 3;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9998,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        borderRadius: '50%',
        // White sparkles instead of yellow
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.4)',
      }}
      initial={{ scale: 1, opacity: 0.9 }}
      animate={{ scale: 0, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
}

// ─── GOLDEN BURST at counter on impact ──────────────────────────────

function GoldenBurst({ x, y }) {
  return (
    <motion.div
      style={{
        position: 'fixed', left: x, top: y,
        zIndex: 9998, pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0.3, opacity: 0.9 }}
      animate={{ scale: 2, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234, 179, 8, 0.7) 0%, rgba(234, 179, 8, 0.2) 50%, transparent 70%)',
        boxShadow: '0 0 15px 8px rgba(234, 179, 8, 0.3)',
      }} />
    </motion.div>
  );
}

// ─── Diamond icon (Figma mastery-points SVG) ────────────────────────

function Diamond() {
  return (
    <img
      src="https://www.figma.com/api/mcp/asset/52ff2889-5777-49ac-8082-a4f56d0c57a8"
      alt=""
      style={{
        width: 17,
        height: 20,
        filter: 'drop-shadow(0 0 6px rgba(234, 179, 8, 0.6))',
      }}
    />
  );
}
