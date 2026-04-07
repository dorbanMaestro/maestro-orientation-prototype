# Maestro Design System

> Extracted from maestro.org on 2026-04-07. Dark-first, warm, approachable education platform.

## Brand Identity

**Brand:** Maestro - The AI University
**Personality:** Warm, approachable, confident, modern
**Audience:** Adult learners building careers with AI

## Visual Theme

**Mode:** Dark-first (single mode, no light variant)
**Feel:** Premium education meets modern SaaS. Clean, spacious, warm dark tones with off-white text. Pill-shaped interactive elements. Minimal borders, generous whitespace.

## Color Palette

### Backgrounds
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--bg-primary` | `#1A1A1A` | `rgb(26, 26, 26)` | Page background |
| `--bg-surface` | `#232323` | `rgb(35, 35, 35)` | Cards, panels, nav |
| `--bg-elevated` | `#2E2E2E` | `rgb(46, 46, 46)` | Elevated cards, modals |
| `--bg-hover` | `#393937` | `rgb(57, 57, 55)` | Hover states |
| `--bg-input` | `#2E2E2E` | `rgb(46, 46, 46)` | Input fields |

### Text
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--text-primary` | `#ECEBE4` | `rgb(236, 235, 228)` | Primary text, headings |
| `--text-secondary` | `#A8A79F` | `rgb(168, 167, 159)` | Secondary text, labels |
| `--text-muted` | `#6B6B65` | `rgb(107, 107, 101)` | Placeholder, disabled |
| `--text-inverse` | `#0A0A0A` | `rgb(10, 10, 10)` | Text on light buttons |

### Borders
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--border-default` | `#393937` | `rgb(57, 57, 55)` | Card borders, dividers |
| `--border-subtle` | `#2E2E2E` | `rgb(46, 46, 46)` | Subtle separators |
| `--border-strong` | `#4A4A47` | `rgb(74, 74, 71)` | Focus rings, emphasis |

### Accent (for prototype accent color)
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-primary` | `#5558E6` | Links, active states, focus rings |
| `--accent-primary-hover` | `#4547C9` | Hover on accent elements |
| `--accent-subtle` | `rgba(85, 88, 230, 0.15)` | Accent backgrounds |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#34D399` | Completed, positive |
| `--warning` | `#FBBF24` | Warnings, in-progress |
| `--error` | `#F87171` | Errors, destructive |
| `--info` | `#60A5FA` | Informational |

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | `"Wix Madefor Display", system-ui, sans-serif` | Headings, hero text |
| `--font-body` | `"Wix Madefor Text", system-ui, sans-serif` | Body text, UI labels |
| `--font-mono` | `"JetBrains Mono", "Fira Code", monospace` | Code, data |

### Type Scale
| Element | Size | Weight | Line Height | Font |
|---------|------|--------|-------------|------|
| Hero / H1 | 48-64px | 600 | 1.1 | Display |
| H2 | 32-40px | 600 | 1.2 | Display |
| H3 | 24px | 600 | 1.3 | Display |
| H4 | 20px | 600 | 1.4 | Display |
| Body Large | 18px | 400 | 1.6 | Body |
| Body | 16px | 400 | 1.6 | Body |
| Body Small | 14px | 400 | 1.5 | Body |
| Caption | 12px | 400 | 1.4 | Body |
| Label | 14px | 500 | 1.4 | Body |

## Component Stylings

### Buttons
```css
/* Primary Button (Maestro signature: inverted light-on-dark) */
.btn-primary {
  background: #ECEBE4;
  color: #0A0A0A;
  border: none;
  border-radius: 100px; /* Full pill */
  padding: 12px 24px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.9; }

/* Secondary Button (outline) */
.btn-secondary {
  background: transparent;
  color: #ECEBE4;
  border: 1px solid #393937;
  border-radius: 100px;
  padding: 12px 24px;
  font-weight: 500;
  transition: border-color 0.2s, background 0.2s;
}
.btn-secondary:hover {
  border-color: #4A4A47;
  background: rgba(255, 255, 255, 0.05);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: #ECEBE4;
  border: none;
  border-radius: 100px;
  padding: 12px 24px;
  font-weight: 500;
}
.btn-ghost:hover { background: rgba(255, 255, 255, 0.05); }
```

### Cards
```css
.card {
  background: #232323;
  border: 1px solid #393937;
  border-radius: 16px;
  padding: 24px;
}
.card-elevated {
  background: #2E2E2E;
  border: 1px solid #393937;
  border-radius: 16px;
  padding: 24px;
}
```

### Inputs
```css
.input {
  background: #2E2E2E;
  color: #ECEBE4;
  border: 1px solid #393937;
  border-radius: 100px; /* Pill inputs */
  padding: 14px 20px;
  font-family: var(--font-body);
  font-size: 16px;
}
.input::placeholder { color: #6B6B65; }
.input:focus {
  border-color: #5558E6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(85, 88, 230, 0.25);
}
```

### Tags / Badges (career pills from homepage)
```css
.tag {
  background: transparent;
  color: #ECEBE4;
  border: 1px solid #393937;
  border-radius: 100px 100px 100px 0px; /* Signature asymmetric pill */
  padding: 10px 16px;
  font-size: 14px;
}
```

### Navigation
```css
.nav {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #2E2E2E;
  padding: 12px 24px;
}
.nav-link {
  color: #ECEBE4;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  border-radius: 100px;
  padding: 8px 16px;
}
.nav-link:hover { background: rgba(255, 255, 255, 0.05); }
```

## Layout

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps, inline spacing |
| `--space-3` | 12px | Small padding |
| `--space-4` | 16px | Component padding |
| `--space-5` | 20px | Card padding |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section separation |
| `--space-12` | 48px | Major sections |
| `--space-16` | 64px | Page-level spacing |

### Max Widths
| Context | Width |
|---------|-------|
| Content | 720px |
| Wide content | 1080px |
| Full bleed | 1280px |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Small elements |
| `--radius-md` | 12px | Medium components |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Large containers |
| `--radius-full` | 100px | Buttons, pills, inputs |

## Depth and Elevation

Maestro uses subtle borders rather than heavy shadows. Dark mode depth comes from background color layers, not box shadows.

| Level | Background | Border | Usage |
|-------|-----------|--------|-------|
| Base | `#1A1A1A` | none | Page background |
| Surface | `#232323` | `#393937` | Cards, sidebar |
| Elevated | `#2E2E2E` | `#393937` | Modals, dropdowns, floating |
| Overlay | `rgba(0,0,0,0.5)` | none | Modal backdrop |

Shadows are minimal and only for floating elements:
```css
.shadow-float { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
.shadow-dropdown { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); }
```

## Responsive Behavior

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, hidden sidebar, full-width cards |
| Tablet | 640-1024px | Two column where appropriate, collapsible sidebar |
| Desktop | > 1024px | Full layout with sidebar, multi-column grids |

## Animation and Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Color/opacity | 200ms | ease |
| Transform | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Layout | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page transitions | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |

Prefer subtle opacity and transform animations. Avoid flashy effects. Movement should feel smooth and intentional.

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-04-07 | Created from maestro.org homepage inspection | Match prototype to real product design |
| 2026-04-07 | Kept `--accent-primary: #5558E6` from existing prototype | Already WCAG AA compliant, consistent with prototype work |
| 2026-04-07 | Used `#1A1A1A` instead of `#0F1117` for bg-primary | Closer to maestro.org actual `#232323`, warmer tone |
