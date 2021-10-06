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
      maxWidth: {
        400: '400px',
        675: '675px',
        80: '80vw',
        90: '90vw',
      },
      minHeight: {
        364: '364px',
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
      grey: 'var(--color-grey)',
      forestGreen: 'var(--color-forest-green)',
    },
    boxShadow: {
      xs: 'var(--shadow-xs)',
      light: 'var(--shadow-light)',
      base: 'var(--shadow-base)',
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
