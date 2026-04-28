/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        upsc: {
          navy: '#2B3990',
          gold: '#D4AF37',
          maroon: '#8B0000',
          dark: '#080c16',
          card: '#0D1221',
          main: '#050810',
        },
        text: {
          main: '#F8FAFC',
          muted: '#94A3B8',
        }
      }
    },
  },
  plugins: [],
}

