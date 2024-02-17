/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        NavbarColor: '#131921',
        NavbarTextColor: '#F2F2F2',
        BackgroundColor: '#121212',
        SecondaryColor: '#FB9900',
      }
    },
  },
  plugins: [],
}

