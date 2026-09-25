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
        dark: {
          950: '#070a11',
          900: '#0f172a',
          850: '#151d30',
          800: '#1e293b',
          750: '#273549',
          700: '#334155',
          600: '#475569',
        },
        cyber: {
          blue: '#38bdf8',
          emerald: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
          purple: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
