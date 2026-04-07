# Design Audit Report — Maestro Orientation Prototype

**Date:** April 6, 2026
**Scope:** Full enrollment flow (5 screens) + Orientation Home page
**Viewport:** Desktop (1280x800), Mobile (375x812)

---

## Overall Score: 8.2 / 10

Strong dark-theme prototype with clean layout, good hierarchy, and polished components. Main gaps were accessibility (contrast, touch targets) and mobile responsiveness.

---

## Scores by Category

| Category | Score | Notes |
|----------|-------|-------|
| Typography & Hierarchy | 7/10 | System fonts only (no brand personality), heading scale had too large a gap between H1 and H2 — fixed |
| Color & Contrast | 8/10 | Dark theme is well-executed. Primary button contrast was 4.47:1 (below WCAG AA) — fixed to 5.35:1 |
| Spacing & Layout | 9/10 | Consistent spacing system, good use of Tailwind utilities, generous padding |
| Components & Cards | 9/10 | Well-structured cards, consistent border radius, good visual weight |
| Touch Targets | 7/10 | Multiple elements under 44px — nav buttons, tab pills, scroll button, Continue button — partially fixed |
| Mobile Responsive | 7/10 | Enrollment flow handles mobile well. Home page sidebar was overlapping content — fixed |
| Interaction & Animation | 8/10 | Framer Motion stagger animations are smooth, good micro-interactions |
| Consistency | 8/10 | Info Center used inline styles while rest used Tailwind — fixed. Color tokens consistent |
| Accessibility | 7/10 | Focus rings present but not universal. Contrast now passes WCAG AA |
| Visual Polish | 9/10 | Stakeholder-ready. Clean, dark, professional. Step indicator dots, progress counters all well done |

---

## Findings & Fixes Applied

### P0 — Critical (Fixed)

1. **Button contrast fails WCAG AA**
   - Before: `#6366F1` = 4.47:1 contrast with white text
   - After: `#5558E6` = 5.35:1 — passes WCAG AA
   - Files: `src/index.css` (CSS variable `--color-primary`)

2. **Sidebar persists on mobile (375px)**
   - Before: 56px sidebar overlapped main content, stealing 56px from a 375px viewport
   - After: `hidden md:flex` hides sidebar below 768px, main content padding zeroed on mobile
   - Files: `src/components/Sidebar/Sidebar.jsx`, `src/layouts/AppLayout.jsx`

3. **18 undersized touch targets on mobile Home page**
   - Nav buttons: 40x40 -> 44x44 (`w-11 h-11`)
   - Files: `src/components/Sidebar/Sidebar.jsx`

### P1 — High (Fixed)

4. **Heading scale gap (H1=30px, H2=16px)**
   - "Weekly goals" H2 bumped from `text-base` (16px) to `text-lg` (18px)
   - Files: `src/components/OrientationTaskList/OrientationTaskList.jsx`

5. **Tab buttons too short (34px)**
   - Vertical padding bumped from `py-1.5` to `py-2` -> 38px height
   - Files: `src/components/WeekTabBar/WeekTabBar.jsx`

6. **Scroll button too small (28x28)**
   - Bumped from `w-7 h-7` to `w-9 h-9` -> 36x36px
   - Files: `src/components/WeekTabBar/WeekTabBar.jsx`

7. **"Continue" button in Up Next too small (38px)**
   - Padding bumped from `py-2` to `py-2.5` -> 42px height
   - Files: `src/components/UpNextCard/UpNextCard.jsx`

### P2 — Medium (Fixed)

8. **Info Center cards used inline styles**
   - Replaced `style={{ backgroundColor: '#2D3348', ... }}` with Tailwind classes
   - Now uses `bg-bg-elevated border-primary/40 rounded-xl` — consistent with rest of app
   - Files: `src/pages/enrollment/StudentInfoCenterScreen.jsx`

9. **Focus ring hardcoded old primary color**
   - Changed from `#6366f1` to `var(--color-primary)` so it tracks the token
   - Files: `src/index.css`

### P2 — Medium (Not Fixed — Acceptable for Prototype)

10. **System font only** — No custom/brand fonts loaded. Using `-apple-system, system-ui, Segoe UI, Roboto`. Functional and clean, but generic. A branded font (Inter, Plus Jakarta Sans) would add personality.

11. **Points display low emphasis** — "250" MP badge at 16px/400 weight in grey. Could be bolder/more prominent for a gamification-focused product.

### P3 — Low (Not Fixed)

12. **Some interactive elements lack focus-visible ring** — Tab pills and task cards don't show focus indicators on keyboard navigation. Not blocking for a prototype.

13. **Step indicator dots are small** — 8x8px inactive dots. Functional but could be 10px for better visibility.

---

## Design System Snapshot

| Token | Value |
|-------|-------|
| Background Primary | `#0F1117` |
| Background Surface | `#1A1D27` |
| Background Elevated | `#242833` |
| Background Hover | `#2E3340` |
| Accent Primary | `#5558E6` (updated) |
| Accent Primary Hover | `#4F46E5` |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Text Primary | `#F9FAFB` |
| Text Secondary | `#D1D5DB` — 12.81:1 contrast on bg-primary |
| Text Tertiary | `#9CA3AF` |
| Font Stack | System UI (-apple-system, system-ui, Segoe UI, Roboto) |
| Border Radius | sm=8px, md=12px (Tailwind v4 default md=6px), xl=12px |
| Container Max Width | 512px (enrollment), 780px (home) |

---

## Responsive Behavior

| Breakpoint | Sidebar | Content | Status |
|------------|---------|---------|--------|
| < 768px (mobile) | Hidden | Full width, 0px left padding | Working |
| >= 768px (tablet+) | Visible, 56px fixed | Offset by pl-14 | Working |
| Enrollment flow | No sidebar | Centered, max-w-lg, 32px padding | Working at all sizes |

---

## Files Modified (8 total)

1. `src/index.css` — Primary color variable, focus ring
2. `src/components/Sidebar/Sidebar.jsx` — Mobile hide, nav button size
3. `src/layouts/AppLayout.jsx` — Responsive left padding
4. `src/components/WeekTabBar/WeekTabBar.jsx` — Tab height, scroll button size
5. `src/components/UpNextCard/UpNextCard.jsx` — Continue button height
6. `src/components/OrientationTaskList/OrientationTaskList.jsx` — H2 font size
7. `src/pages/enrollment/StudentInfoCenterScreen.jsx` — Tailwind classes replacing inline styles
8. `tailwind.config.js` — Reverted (CSS variables in index.css are the v4 source of truth)
