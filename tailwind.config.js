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
          dark: '#064e3b',        // Deep Emerald 900
          navy: '#047857',        // Emerald 700
          deepGreen: '#022c22',   // Deep Obsidian Emerald 950
          forest: '#033527',      // Forest Green
          green: '#10b981',       // Emerald 500
          emerald: '#059669',     // Emerald 600
          lightGreen: '#059669',  // Vibrant Green
          mint: '#d1fae5',        // Mint 100
          sage: '#ecfdf5',        // Sage 50
          blue: '#0d9488',        // Teal 600
          gold: '#D4AF37',        // Royal Gold
          goldLight: '#FDF3C7',   // Gold Cream
          goldHover: '#B8860B',   // Dark Gold
          accent: '#10b981',      // Emerald Accent
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
