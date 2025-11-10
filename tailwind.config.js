/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E2B3C',
        teal: '#3FA7A3',
        coral: '#F7765C',
        ink: '#0E1620',
        cloud: '#F7F9FB'
      },
      borderRadius: { xl: '1.25rem', '2xl': '1.5rem' },
      boxShadow: { soft: '0 10px 30px rgba(30,43,60,0.08)' }
    },
  },
  plugins: [],
};
