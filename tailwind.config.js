/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0F1117',
        'bg-surface': '#1A1D27',
        'bg-elevated': '#242833',
        'bg-hover': '#2E3340',

        // Accent colors
        'primary': {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          active: '#4338CA',
        },
        'success': {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        'warning': {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        'neutral': {
          DEFAULT: '#6B7280',
          dark: '#374151',
        },

        // Text colors
        'text-primary': '#F9FAFB',
        'text-secondary': '#D1D5DB',
        'text-tertiary': '#9CA3AF',
        'text-disabled': '#6B7280',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '25px',
        '3xl': '31px',
        '4xl': '39px',
        '5xl': '49px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'xl': '0 12px 32px rgba(0, 0, 0, 0.6)',
        'primary': '0 4px 12px rgba(99, 102, 241, 0.3)',
        'success': '0 4px 12px rgba(16, 185, 129, 0.3)',
        'warning': '0 8px 20px rgba(245, 158, 11, 0.4)',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.75',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1100',
        'fixed': '1200',
        'modal-backdrop': '1300',
        'modal': '1400',
        'popover': '1500',
        'tooltip': '1600',
      },
    },
  },
  plugins: [],
}
