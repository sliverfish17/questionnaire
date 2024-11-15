import type {Config} from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFF0F0',
        text: '#333333',
        button: {
          regular: '#EAEEF7',
          border: '#E0E0E0',
          active: '#6939A2',
          text: '#000000',
        },
        backgroundImage: {
          'active-gradient':
            'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
        },
      },
      boxShadow: {
        button: '2px 2px 6px 0px #543C9740',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
