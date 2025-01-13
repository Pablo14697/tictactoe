/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#6e6e6e',
        'custom-green': '#66c85d',
        'custom-green-muted': '#cadbc9',
      },
      width: {
        board: '310px',
      },
      height: {
        board: '310px',
      },
    },
  },
};
