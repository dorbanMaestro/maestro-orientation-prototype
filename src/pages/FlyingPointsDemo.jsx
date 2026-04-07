// FlyingPointsDemo — Full animation flow with two screens
//
// FLOW:
// Screen 0: "Complete Goal" trigger button
// Screen 1: "Lesson complete" — confetti animation (Figma: 8029-11809)
// Screen 2: "Goal complete"  — progress bar fill + diamond flying animation (Figma: 7940-6411)
//
// Navigate to: http://localhost:5173/demo-flying

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JSConfetti from 'js-confetti';
import PointsBadge from '../components/shared/PointsBadge';
import FlyingPoints, { CONFIG, DEFAULT_CONFIG } from '../components/shared/FlyingPoints';

// Figma asset URLs
const imgLevel = "https://www.figma.com/api/mcp/asset/208b979e-5e7e-4ec4-a5bc-fb82d03fcac0";
const imgSubtract1 = "https://www.figma.com/api/mcp/asset/ebc7d877-ab12-465e-9b56-c44712b0e712";
const imgSubtract2 = "https://www.figma.com/api/mcp/asset/6f57689b-33aa-4d7a-8744-17bdae0036cc";
const imgUnion = "https://www.figma.com/api/mcp/asset/7f58298a-e645-4b29-8514-8ac336eca04b";
const imgIcon = "https://www.figma.com/api/mcp/asset/0f01db69-d067-4c12-aed4-e20170b7d932";
const imgSurface = "https://www.figma.com/api/mcp/asset/3d0c013b-0f2b-47ed-8feb-a6abf6c30c9e";
const imgProgress = "https://www.figma.com/api/mcp/asset/f38dabd8-6b2c-4cfa-b7f6-f456ca6ac4e6";
const imgLessonUnion = "https://www.figma.com/api/mcp/asset/3d17e535-bdb0-4ec1-a876-350f9dbf024d";

const TOTAL_SEGMENTS = 8;
const FILLED_SEGMENTS = 6;

export default function FlyingPointsDemo() {
  // Which screen: 'trigger' | 'lesson' | 'goal'
  const [screen, setScreen] = useState('trigger');

  // Progress bar speed option: 'A' | 'B' | 'C'
  // A = 0.8s total fill, B = 1.2s total fill, C = 1.8s total fill
  const [speedOption, setSpeedOption] = useState('B');

  const [points, setPoints] = useState(250);
  const [flyingActive, setFlyingActive] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const [animPhase, setAnimPhase] = useState(null);
  const [filledCount, setFilledCount] = useState(FILLED_SEGMENTS);
  const [barComplete, setBarComplete] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [configTick, setConfigTick] = useState(0); // forces re-render on slider change
  // Once "8 ◆" hides, it never comes back (even when animPhase resets)
  const [pointsHidden, setPointsHidden] = useState(false);
  // Whether all animations are done (show checkmark + CTA progress bar)
  const [allAnimDone, setAllAnimDone] = useState(false);
  // CTA progress bar fill (0 to 100)
  const [ctaProgress, setCtaProgress] = useState(0);

  const numberRef = useRef(null);
  const diamondRef = useRef(null);
  const pointsBadgeRef = useRef(null);
  const confettiRef = useRef(null);

  // Initialize JSConfetti once
  useEffect(() => {
    confettiRef.current = new JSConfetti();
    return () => { confettiRef.current = null; };
  }, []);

  // ── Screen 0 → Screen 1: Trigger "Lesson complete" ──
  const handleTrigger = useCallback(() => {
    setScreen('lesson');
    // Fire rainbow confetti with gravity (js-confetti handles the physics)
    // 400ms delay so the screen is fully visible first
    setTimeout(() => {
      confettiRef.current?.addConfetti({
        emojis: ['🌈'],
        emojiSize: 70,
        confettiNumber: 40,
      });
    }, 400);
  }, []);

  // ── Screen 1 → Screen 2: "Continue" goes to Goal complete ──
  const handleContinue = useCallback(() => {
    setScreen('goal');
  }, []);

  // Speed configs: total CSS transition time per segment
  // The bar fills left-to-right with staggered transitions
  const speedConfigs = { A: 0.1, B: 0.15, C: 0.22 };
  const segmentDelay = speedConfigs[speedOption] || 0.15;

  // ── Progress bar fill + diamond launch ──
  useEffect(() => {
    if (screen !== 'goal' || barComplete) return;

    // Calculate fill time inside the effect to avoid deps issues
    const fillTime = (TOTAL_SEGMENTS - 1) * (speedConfigs[speedOption] || 0.15) * 1000 + 300;

    // Start fill after 100ms
    const startDelay = setTimeout(() => {
      setFilledCount(TOTAL_SEGMENTS);

      // Wait for bar to fill, then CONFIG.barToFlyDelay before launching diamonds
      const launchDelay = setTimeout(() => {
        setBarComplete(true);
        setFlyingActive(true);
        // Fade "8 ◆" at the exact same moment diamonds start — in parallel
        setPointsHidden(true);
      }, fillTime + CONFIG.barToFlyDelay * 1000);

      return () => clearTimeout(launchDelay);
    }, 100);

    return () => clearTimeout(startDelay);
  }, [screen, barComplete, speedOption]);

  const handleFlyingComplete = useCallback(() => {
    // Points already updated on first hit — just clean up
    setFlyingActive(false);
    setAllAnimDone(true);
  }, []);

  // CTA progress bar fill animation (like Apple TV auto-play)
  useEffect(() => {
    if (!allAnimDone) return;
    const duration = 7000; // 7 seconds
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setCtaProgress(progress);
      if (progress < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [allAnimDone]);

  const handleFirstHit = useCallback(() => {
    // Counter glow AND number update happen together on first hit
    setBadgeBump(true);
    setPoints((prev) => prev + 8);
    setTimeout(() => setBadgeBump(false), 500);
  }, []);

  const handlePhaseChange = useCallback((phase) => {
    setAnimPhase(phase);
  }, []);

  const handleReset = useCallback(() => {
    setScreen('trigger');
    setFlyingActive(false);
    setBadgeBump(false);
    setAnimPhase(null);
    setFilledCount(FILLED_SEGMENTS);
    setBarComplete(false);
    setPoints(250);
    setPointsHidden(false);
    setAllAnimDone(false);
    setCtaProgress(0);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#232323' }}>
      {/* Top bar with points badge */}
      <div className="flex justify-end items-center p-4">
        <PointsBadge ref={pointsBadgeRef} points={points} animate={badgeBump} />
      </div>

      {/* Main content */}
      <div className="flex items-start justify-center py-8" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <>

          {/* ══════ SCREEN 0: Trigger ══════ */}
          {screen === 'trigger' && (
            <div className="text-center pt-32">
              <h1
                className="text-2xl font-semibold mb-4"
                style={{ color: '#ecebe4', fontFamily: "'Wix Madefor Display', sans-serif" }}
              >
                Flying Points Demo
              </h1>
              <p className="mb-6" style={{ color: '#aaaaa5' }}>
                Click to see the full animation flow!
              </p>

              <button
                onClick={handleTrigger}
                className="px-6 py-2.5 rounded-full font-medium cursor-pointer transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#ecebe4', color: '#0a0a0a', fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                Complete Lesson
              </button>
            </div>
          )}

          {/* ══════ SCREEN 1: Lesson Complete (with confetti) ══════ */}
          {screen === 'lesson' && (
            <div className="w-[720px] px-20 py-16 flex flex-col gap-6 items-center">
              {/* Lesson icon — purple gradient circle with checkmark flip */}
              <div className="relative" style={{ width: 72, height: 72 }}>
                <img src={imgSurface} alt="" className="absolute inset-0 w-full h-full" />
                <img src={imgProgress} alt="" className="absolute inset-0 w-full h-full" />
                {/* Inner circle with checkmark — flips 360° (full rotation so checkmark
                    is always visible, never shows the back of the circle) */}
                <motion.div
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    top: 7, left: 7, width: 58, height: 58,
                    background: 'linear-gradient(223deg, #808ff0 15%, #a6b2f7 85%)',
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
                >
                  {/* Checkmark icon — correct orientation */}
                  <img src={imgLessonUnion} alt="" style={{ width: 25, height: 17, transform: 'rotate(135deg)' }} />
                </motion.div>
              </div>

              {/* Text — no animation, appears instantly */}
              <div className="flex flex-col gap-2 items-center text-center">
                <h1
                  className="font-semibold"
                  style={{ color: '#ecebe4', fontSize: 32, lineHeight: '44px', fontFamily: "'Wix Madefor Display', sans-serif" }}
                >
                  Lesson complete
                </h1>
                <p style={{ color: '#aaaaa5', fontSize: 16, lineHeight: '25px', fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  You're off to a great start!
                </p>
              </div>

              {/* Continue button — no animation */}
              <div>
                <button
                  onClick={handleContinue}
                  className="px-6 py-2.5 rounded-full font-medium cursor-pointer transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: '#ecebe4', color: '#0a0a0a', fontFamily: "'Wix Madefor Text', sans-serif", fontSize: 16, minWidth: 100 }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ══════ SCREEN 2: Goal Complete (with diamond animation) ══════ */}
          {screen === 'goal' && (
            <div className="w-[560px] flex flex-col gap-6 items-center">
              {/* Diamond icon with sparkle background — no entrance animation */}
              <div className="flex flex-col gap-4 items-center">
                <div
                  className="relative overflow-hidden"
                  style={{ width: 80, height: 80 }}
                >
                  <img src={imgLevel} alt="" className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={imgSubtract1} alt="" style={{ width: 35, height: 40 }} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center text-center">
                  <h1
                    className="font-semibold"
                    style={{ color: '#ecebe4', fontSize: 32, lineHeight: '44px', fontFamily: "'Wix Madefor Display', sans-serif" }}
                  >
                    Goal complete!
                  </h1>
                </div>
              </div>

              {/* Goal card — no entrance animation */}
              <div
                className="w-[560px] p-5"
                style={{ backgroundColor: '#232323', border: '1px solid #393937', borderRadius: 24 }}
              >
                <div className="flex gap-6 items-center p-4 h-[88px]">
                  <div className="flex items-center p-3 rounded-xl" style={{ backgroundColor: '#2e2e2e' }}>
                    <img src={imgUnion} alt="" style={{ width: 24, height: 19 }} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-semibold whitespace-nowrap" style={{ color: '#ecebe4', fontSize: 16, lineHeight: '25px', fontFamily: "'Wix Madefor Text', sans-serif" }}>
                      [Goal 01 - learn task]
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 flex gap-0.5 items-center overflow-hidden" style={{ height: 6, borderRadius: 8 }}>
                        {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => (
                          <div
                            key={i}
                            className="flex-1"
                            style={{
                              height: 6,
                              backgroundColor: i < filledCount ? '#808ff0' : '#2e2e2e',
                              // Smooth wave fill: each segment staggers by segmentDelay
                              transition: `background-color 0.3s ease ${i * segmentDelay}s`,
                            }}
                          />
                        ))}
                      </div>
                      {/* After animation: checkmark. Before/during: "8 ◆" (fades permanently) */}
                      {allAnimDone ? (
                        <div className="flex items-center justify-center" style={{ width: 44 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#ecebe4' }}>
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        /* "8 ◆" — uses pointsHidden (never comes back once hidden) */
                        <div
                          className="flex gap-0.5 items-center justify-end"
                          style={{
                            width: 44,
                            opacity: pointsHidden ? 0 : 1,
                            transition: `opacity ${CONFIG.fadeOutDuration}s ease-out`,
                          }}
                        >
                          <span
                            ref={numberRef}
                            className="font-semibold whitespace-nowrap"
                            style={{ fontSize: 16, lineHeight: '25px', color: '#ecebe4', fontFamily: "'Wix Madefor Text', sans-serif" }}
                          >
                            8
                          </span>
                          <span ref={diamondRef} className="flex items-start">
                            <img src={imgSubtract2} alt="" style={{ width: 17, height: 20 }} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons — no animation */}
              <div className="flex flex-col gap-2 items-center">
                {/* CTA with progress bar timer (like Apple TV auto-play) */}
                <button
                  className="relative overflow-hidden px-6 py-2.5 rounded-full font-medium cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: '#ecebe4',
                    color: '#0a0a0a',
                    fontFamily: "'Wix Madefor Text', sans-serif",
                    fontSize: 16,
                    minWidth: 220,
                  }}
                >
                  {/* Progress bar fill — slides left to right INSIDE the button */}
                  {allAnimDone && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: 'rgba(128, 143, 240, 0.35)',
                        width: `${ctaProgress}%`,
                        transition: 'width 0.1s linear',
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    Start next lesson ({allAnimDone ? Math.max(0, Math.ceil(7 - (ctaProgress / 100) * 7)) : 7})
                  </span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex gap-1 items-center px-6 py-2.5 rounded-full font-medium cursor-pointer transition-opacity hover:opacity-80"
                  style={{ color: '#ecebe4', fontFamily: "'Wix Madefor Text', sans-serif", fontSize: 16, background: 'none', border: 'none' }}
                >
                  Take a break
                  <img src={imgIcon} alt="" style={{ width: 12, height: 12 }} />
                </button>
              </div>
            </div>
          )}
        </>
      </div>

      {/* Flying points animation (only active on Goal screen) */}
      <FlyingPoints
        numberRef={numberRef}
        diamondRef={diamondRef}
        targetRef={pointsBadgeRef}
        points={8}
        isActive={flyingActive}
        onComplete={handleFlyingComplete}
        onPhaseChange={handlePhaseChange}
        onFirstHit={handleFirstHit}
      />

      {/* ── CONFIG PANEL (floating, bottom-left) ── */}
      <div className="fixed bottom-4 left-4" style={{ zIndex: 10000 }}>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-3 py-1.5 rounded-lg text-xs cursor-pointer"
          style={{ backgroundColor: '#393937', color: '#aaaaa5', border: '1px solid #4a4a47' }}
        >
          {showConfig ? '✕ Close' : '⚙ Config'}
        </button>

        {showConfig && (
          <div
            className="mt-2 p-4 rounded-xl overflow-y-auto"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #393937',
              width: 320,
              maxHeight: '70vh',
              fontFamily: "'Wix Madefor Text', sans-serif",
            }}
          >
            <p className="text-xs font-semibold mb-3" style={{ color: '#ecebe4' }}>
              Diamond Animation Config
            </p>
            <p className="text-xs mb-3" style={{ color: '#aaaaa5' }}>
              Change values → click "Take a break" → replay
            </p>

            {[
              { key: 'spreadSize', label: 'Spread size (px)', min: 40, max: 300, step: 10 },
              { key: 'appearDelayMin', label: 'Appear delay min (s)', min: 0, max: 1, step: 0.05 },
              { key: 'appearDelayMax', label: 'Appear delay max (s)', min: 0, max: 2, step: 0.05 },
              { key: 'appearDuration', label: 'Appear fade-in (s)', min: 0.05, max: 1, step: 0.05 },
              { key: 'hoverDuration', label: 'Hover before fly (s)', min: 0, max: 2, step: 0.05 },
              { key: 'flyDelayMin', label: 'Fly delay min (s)', min: 0, max: 2, step: 0.05 },
              { key: 'flyDelayMax', label: 'Fly delay max (s)', min: 0, max: 3, step: 0.05 },
              { key: 'flyDurationMin', label: 'Flight time min (s)', min: 0.2, max: 2, step: 0.05 },
              { key: 'flyDurationMax', label: 'Flight time max (s)', min: 0.3, max: 3, step: 0.05 },
              { key: 'slowStart', label: 'Slow start (0=linear, 0.9=extreme)', min: 0, max: 0.9, step: 0.05 },
              { key: 'arcHeight', label: 'Arc height (px above line)', min: 0, max: 150, step: 10 },
              { key: 'windupDistance', label: 'Windup dip distance (px)', min: 0, max: 50, step: 5 },
              { key: 'windupDuration', label: 'Windup dip time (s)', min: 0, max: 0.5, step: 0.05 },
              { key: 'barToFlyDelay', label: 'Bar finish → fly start (s)', min: 0, max: 1, step: 0.05 },
              { key: 'fadeOutDuration', label: '"8 ◆" fade out time (s)', min: 0.1, max: 2, step: 0.1 },
            ].map(({ key, label, min, max, step }) => (
              <div key={key} className="mb-2">
                <div className="flex justify-between text-xs mb-0.5">
                  <span style={{ color: '#aaaaa5' }}>{label}</span>
                  <span style={{ color: '#ecebe4' }}>{CONFIG[key] ?? DEFAULT_CONFIG[key]}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={CONFIG[key] ?? DEFAULT_CONFIG[key]}
                  onChange={(e) => {
                    CONFIG[key] = parseFloat(e.target.value);
                    setConfigTick((t) => t + 1);
                  }}
                  className="w-full"
                  style={{ accentColor: '#808ff0' }}
                />
              </div>
            ))}

            {/* Easing preset buttons */}
            {/* Arc toggle */}
            <div className="flex items-center gap-2 mt-3 mb-2">
              <button
                onClick={() => { CONFIG.arcEnabled = !CONFIG.arcEnabled; setConfigTick((t) => t + 1); }}
                className="px-3 py-1 rounded text-xs cursor-pointer"
                style={{
                  backgroundColor: CONFIG.arcEnabled ? '#808ff0' : 'transparent',
                  color: CONFIG.arcEnabled ? '#0a0a0a' : '#aaaaa5',
                  border: '1px solid #393937',
                }}
              >
                {CONFIG.arcEnabled ? 'Arc: ON' : 'Arc: OFF'}
              </button>
              <span className="text-xs" style={{ color: '#aaaaa5' }}>
                {CONFIG.arcEnabled ? 'Curved flight path' : 'Straight line'}
              </span>
            </div>

            {/* Save / Reset buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  const toSave = { ...CONFIG };
                  localStorage.setItem('flyingPointsConfig', JSON.stringify(toSave));
                  setConfigTick((t) => t + 1);
                  alert('Config saved! Will persist across reloads.');
                }}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs cursor-pointer font-medium"
                style={{ backgroundColor: '#808ff0', color: '#0a0a0a' }}
              >
                💾 Save
              </button>
              <button
                onClick={() => {
                  Object.assign(CONFIG, DEFAULT_CONFIG);
                  localStorage.removeItem('flyingPointsConfig');
                  setConfigTick((t) => t + 1);
                }}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs cursor-pointer font-medium"
                style={{ backgroundColor: 'transparent', color: '#aaaaa5', border: '1px solid #393937' }}
              >
                ↺ Reset defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
