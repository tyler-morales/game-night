module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        dashboard: '1fr 7fr;',
      },
      maxHeight: {
        95: '95vh',
        500: '500px',
      },
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      tertiary: 'var(--color-tertiary)',
      quad: 'var(--color-quad)',
      darkGreen: 'var(--color-dark-green)',
      white: 'var(--color-white)',
      error: 'var(--color-error)',
    },
    fontFamily: {
      body: ['Poppins', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
