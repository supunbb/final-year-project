/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1C3D59',
        secondaryBlue: '#697C8C',
        primaryRed: '#D93D3D',
        secondaryRed: '#D94E4E',
        neutral: '#F2F2F2',
      },
      fontFamily: {
        heading: ['PoppinsSemiBold', 'sans-serif'],
        body: ['PoppinsRegular', 'sans-serif'],
      },
      fontSize: {
        h1: ['4.5rem', 'auto'],
        h2: ['3rem', 'auto'],
        h3: ['2rem', 'auto'],
        h4: ['1.5rem', 'auto'],
        h5: ['1rem', 'auto'],
        h6: ['0.875rem', 'auto'],
        body1: ['1rem', 'auto'],
        body2: ['0.875rem', 'auto'],
        body3: ['0.75rem', 'auto'],
      },
    },
  },
  plugins: [],
};
