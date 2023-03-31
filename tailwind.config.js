/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "register-background": "url('/assets/cat-background.jpg')",
        "homepage-background": "url('/assets/cat-homepage.jpg')",
      },
    },
  },
  plugins: [],
};
