/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // DOMOVINA.ai brand boje
        domovina: {
          red: '#E61D2F',      // hrvatska zastava — naglasak, opasnost
          'red-soft': '#fde9eb',
          navy: '#002F6C',     // primarna brand boja
          'navy-700': '#001f4a',
          'navy-600': '#00276a',
          'navy-50': '#e6ebf3',
          'navy-100': '#cdd7e7',
          ink: '#0e1a33',      // primarni tekst
          muted: '#5a627a',    // sekundarni tekst
          paper: '#FFFFFF',    // pozadina
          surface: '#f6f8fc',  // alt površina
          border: '#dbe2f0',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 6px 24px rgba(0, 47, 108, 0.08)',
      },
    },
  },
  plugins: [],
};
