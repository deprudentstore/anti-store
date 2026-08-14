/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F3EEE3',
        sand: '#DCC9A6',
        olive: {
          DEFAULT: '#4B5D3C',
          dark: '#374429',
        },
        terracotta: '#B5602E',
        charcoal: '#2A2620',
        gold: '#B98A3E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
