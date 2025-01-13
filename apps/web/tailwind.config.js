/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#6e6e6e',
        'custom-green': '#66c85d',
        'custom-green-muted': '#cadbc9',
        'custom-green-muted-33': '#cadbc933',
      },
      width: {
        board: '310px',
      },
      height: {
        board: '310px',
      },
      fontSize: {
        base: '16px',
        xl: '32px',
        '2xl': '50px',
      },
      padding: {
        13: '52px',
      },
      margin: {
        12.5: '50px',
        13: '52px',
      },
      borderRadius: {
        2: '8px',
      },
    },
  },
};
