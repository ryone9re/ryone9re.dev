/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          250: '#EDEDE8',
        },
        gray: {
          350: '#8697a6',
          370: '#6FA3A6',
        },
      },
      width: {
        short: '36rem',
        medium: '48rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
