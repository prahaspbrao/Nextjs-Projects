/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",      // 👈 include `app/` if you're using Next.js App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["synthwave"], // 👈 use synthwave as the only theme
  },
};
