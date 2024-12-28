/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/public/templates/**/*.{html,js}",
    "./views/**/*.ejs",
    "./public/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  mode: 'jit',
}

