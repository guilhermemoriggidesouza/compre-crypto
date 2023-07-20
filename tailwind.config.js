/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**.{html,js}"],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}

