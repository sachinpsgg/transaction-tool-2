/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
  theme: {
    extend: {
      colors: {
        purple_primary: '#6E39CB',
      },
      keyframes: {
        'rotate-one': {
          '0%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)' },
        },
        'rotate-two': {
          '0%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)' },
        },
        'rotate-three': {
          '0%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)' },
        },
      },
      animation: {
        'rotate-one': 'rotate-one 1s linear infinite',
        'rotate-two': 'rotate-two 1s linear infinite',
        'rotate-three': 'rotate-three 1s linear infinite',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains', 'monospace'],
      },
      textColor: {
        primary: '#3A3541',
        secondary: '#263D50',
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
      boxShadow: {
        custom: '0px 0px 4px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
