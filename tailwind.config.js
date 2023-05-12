/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

const config = {
  darkMode: 'media',
  content: ['./src/app/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dracula', 'lemonade']
  }
};

export default config;
