# Maestro Learning Path - MVP Implementation

A modern, gamified learning path interface built with React, Tailwind CSS, and Framer Motion. This MVP implements Phase 1 of the Maestro Learning Path redesign, transforming a linear course list into an engaging, visual learning experience inspired by Duolingo and Brilliant.

## 🎯 Features Implemented (Phase 1 MVP)

### Core Components
- ✅ **Current Course Card** - Prominent card showing course progress with animated progress ring
- ✅ **Progress Ring** - SVG-based circular progress indicator with smooth animations
- ✅ **Learning Path** - Vertical scrolling path with interactive lesson nodes
- ✅ **Lesson Nodes** - Four distinct states (completed, current, upcoming, locked)
- ✅ **Connection Lines** - Visual connectors showing progress between lessons
- ✅ **Continue Button** - Large, accessible CTA for resuming current lesson
- ✅ **Auto-scroll** - Automatically scrolls to current lesson on page load

### Design & UX
- ✅ **Dark Theme** - Maestro's sophisticated dark color palette (#0D0D0D background)
- ✅ **Smooth Animations** - Framer Motion animations for all interactions
- ✅ **Mobile-First** - Fully responsive design (375px - 1440px+)
- ✅ **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- ✅ **8pt Grid System** - Consistent spacing throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation

\`\`\`bash
# Navigate to the app directory
cd app

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
\`\`\`

The application will be available at http://localhost:5173/

### Build for Production

\`\`\`bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
app/
├── src/
│   ├── components/
│   │   ├── CurrentCourseCard/    # Main course card with progress
│   │   ├── LearningPath/         # Container for lesson nodes
│   │   ├── LessonNode/           # Individual lesson node
│   │   └── ProgressRing/         # Animated progress circle
│   ├── data/
│   │   └── mockData.js           # Mock course and lesson data
│   ├── pages/
│   │   └── HomePage.jsx          # Main page component
│   ├── App.jsx                    # Root app component
│   ├── index.css                  # Global styles with Tailwind
│   └── main.jsx                   # App entry point
├── tailwind.config.js             # Tailwind configuration with design tokens
└── vite.config.js                 # Vite configuration
\`\`\`

## 🎨 Design System

### Color Palette
- **Background**: #0D0D0D, #1A1A1A, #242424
- **Primary**: #6366F1 (indigo)
- **Success**: #10B981 (green)
- **Warning**: #F59E0B (amber)
- **Text**: #F9FAFB, #D1D5DB, #9CA3AF

### Breakpoints
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

## 🔧 Tech Stack

- **React 18** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 11** - Animation library

## 📱 Responsive Design

The application is fully responsive with breakpoint-specific adaptations for mobile, tablet, and desktop.

## ♿ Accessibility Features

- Keyboard Navigation with visible focus indicators
- Screen Reader support with semantic HTML and ARIA labels
- WCAG 2.1 AA compliant color contrast
- Touch targets exceed 44×44px minimum
- Respects prefers-reduced-motion user preference

## 🎬 Animations

- Progress Ring animates from 0% to current percentage
- Current Node has subtle pulse effect
- Locked Node shakes on hover
- Auto-scroll to current lesson on page load
- All animations respect prefers-reduced-motion

## 📝 Development

Built from the design specifications in the parent directory. Implements Phase 1 MVP requirements with mock data.

**Status**: ✅ MVP Phase 1 Complete  
**Next Steps**: Backend integration, Phase 2 gamification features

---

Built with React + Vite + Tailwind CSS + Framer Motion
