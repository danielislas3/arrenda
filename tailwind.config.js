/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c084fc',
        'dark': '#7e22ce',
      }

    },
  },
  plugins: [],
}

