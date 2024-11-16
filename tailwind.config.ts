import type {Config} from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        bg: '#FFF0F0',
        typography: '#333333',
        info: '#FBFBFF',
        question: '#201F1F',
        button: {
          regular: '#EAEEF7',
          border: '#E0E0E0',
          active: '#FAFAFA',
          text: '#000000',
        },
      },
      backgroundImage: {
        'active-gradient':
          'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
      },
      boxShadow: {
        button: '2px 2px 6px 0px #543C9740',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  safelist: ['bg-bg', 'text-question', 'bg-active-gradient', 'text-info'],
  plugins: [],
} satisfies Config;
