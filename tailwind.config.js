/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0b0b0f',
        'panel-bg': '#171821',
        'sidebar-bg': '#050509',
        'card-bg': '#1f2933',
        'card-muted': '#252836',
        'search-bg': '#2b2b31',
        'accent-red': '#f82d2d',
        'accent-blue': '#1d4ed8',
        'accent-purple': '#7c3aed',
      },
    },
  },
  plugins: [],
};
