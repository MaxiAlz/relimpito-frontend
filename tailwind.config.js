/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["lemonade", "dark", "cupcake"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

