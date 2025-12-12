/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0fe18b',
          200: '#10b777',
          300: '#108c64',
          400: '#116250',
          500: '#11373d',
          600: '#122233',
        },
        secondary: {
          100: '#40b8f5',
          200: '#3796cc',
          300: '#2e74a3',
          400: '#24517b',
          500: '#1b2f52',
          600: '#171e3d',
        },
        tertiary: {
          100: '#8d09f2',
          200: '#740aca',
          300: '#5c0ba2',
          400: '#430b79',
          500: '#2b0c51',
          600: '#1e0d3d',
        },
        dark: {
          background: '#080419',
          text: '#0a0a0f',
        },
      },
    },
  },
  plugins: [],
};
