/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'A1': "url('/src/assets/bg/bg1.jpg')",
        'A2': "url('/src/assets/bg/bg2.jpg')",
        'A3': "url('/src/assets/bg/bg3.jpg')",
        'A4': "url('/src/assets/bg/bg4.jpg')",
        'A5': "url('/src/assets/bg/bg5.jpg')",
      },
    },
  },
  plugins: [],
}

