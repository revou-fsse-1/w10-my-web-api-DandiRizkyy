/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "register-background":
          "url('https://raw.githubusercontent.com/DandiRizkyy/assets/main/cat-background.jpg')",
        "homepage-background":
          "url('https://raw.githubusercontent.com/DandiRizkyy/assets/main/cat-homepage.jpg')",
      },
    },
  },
  plugins: [],
};
