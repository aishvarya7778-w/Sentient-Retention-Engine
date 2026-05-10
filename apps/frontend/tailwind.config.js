/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#C5F82A', // Acid Green
          secondary: '#00F0FF', // Cyber Cyan
          alert: '#FF3E3E', // Risk Red
          warning: '#FFB800', // Signal Orange
          black: '#050505', // Deep Black
          surface: '#0D0D0D', // Rich Black
          border: '#1A1A1A', // Sharp Border
          'border-light': '#2A2A2A',
        }
      },
      borderRadius: {
        'none': '0px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
