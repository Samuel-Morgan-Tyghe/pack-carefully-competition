/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cursed Expedition (Wood/Paper)
        cursed: {
          bg: '#1e293b',
          wood: '#4a3627',
          parchment: '#fef3c7',
          accent: '#f59e0b',
          danger: '#ef4444',
        },
        // Cyber Scavenger (Neon)
        cyber: {
          bg: '#0f172a',
          grid: '#1e293b',
          neon: '#10b981',
          glitch: '#ec4899',
        },
        // Arctic Minimalist (Swiss)
        arctic: {
          bg: '#f8fafc',
          text: '#0f172a',
          accent: '#3b82f6',
        }
      },
      fontFamily: {
        cursed: ['MedievalSharp', 'cursive'],
        cyber: ['Orbitron', 'monospace'],
        arctic: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
      }
    },
  },
  plugins: [],
}
