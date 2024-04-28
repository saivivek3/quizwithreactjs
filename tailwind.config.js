/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        mobile: "500px",
        tablet: "700px",
        desktop: "1000px",
      },
    },
  },
  plugins: [],
};
