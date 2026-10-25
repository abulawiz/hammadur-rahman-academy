/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          dark: '#0A2540',
          navy: '#0F3460',
          blue: '#1A5F7A',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldHover: '#B8860B',
          emerald: '#134E4A',
          accent: '#0284C7',
          light: '#F8FAFC',
          cream: '#FFFDF9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'royal': '0 10px 30px -5px rgba(15, 52, 96, 0.15)',
        'gold-glow': '0 4px 20px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
