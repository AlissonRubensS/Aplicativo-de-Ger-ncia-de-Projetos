/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "#F0F0F0",
        "light-blue": "DBEBFF",
      },
    },
  },
  plugins: [],
};
