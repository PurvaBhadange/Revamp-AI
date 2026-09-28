/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fdf4f0',
          100: '#fae4db',
          200: '#f6cbba',
          300: '#f1a98f',
          400: '#f4a460', // Palette: Sandy orange
          500: '#ec7852',
          600: '#e35336', // Palette: Burnt sienna
          700: '#c54025',
          800: '#a0522d', // Palette: Rich brown
          900: '#834125',
          950: '#461f0f',
        },
        stone: {
          50: '#f5f5dc',  // Palette: Cream background
          100: '#ebeada',
          200: '#e0dfcd', // Borders
          300: '#d1ceb8',
          400: '#b8b49c',
          500: '#9d987e',
          600: '#847d63',
          700: '#69644f', // Secondary text
          800: '#54503e', 
          900: '#433f32', // Primary text
          950: '#2b291f',
        },
        cyber: {
          orange: '#f97316',
          emerald: '#059669',
          amber: '#d97706',
          red: '#dc2626',
          purple: '#7c3aed'
        }
      },
      fontFamily: {
        // Distinct, curated premium font pairings
        sans: ['Sora', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Unbounded', 'Sora', 'sans-serif'],
        tech: ['"Chakra Petch"', 'sans-serif'],
        mono: ['"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'modal': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
